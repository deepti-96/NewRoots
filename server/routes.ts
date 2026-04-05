import type { Express } from "express";
import { type Server } from "http";
import { storage } from "./storage.js";
import { insertUserSchema } from "../shared/schema.js";
import multer from "multer";

const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 10 * 1024 * 1024 } });

export async function registerRoutes(httpServer: Server, app: Express): Promise<Server> {
  // Auth0 sync — called from frontend after Auth0 login
  app.post("/api/auth/sync", async (req, res) => {
    try {
      const { auth0Sub, email, displayName, avatarUrl } = req.body;
      if (!auth0Sub) return res.status(400).json({ error: "auth0Sub is required" });
      const user = await storage.upsertAuth0User(auth0Sub, email || null, displayName || null, avatarUrl || null);
      res.json({
        id: user.id,
        username: user.displayName || user.username,
        email: user.email,
        displayName: user.displayName,
        avatarUrl: user.avatarUrl,
        language: user.language,
        profileComplete: user.profileComplete,
      });
    } catch (e: any) {
      res.status(400).json({ error: e.message });
    }
  });

  // Legacy auth - register (kept for compatibility)
  app.post("/api/auth/register", async (req, res) => {
    try {
      const { username, password } = insertUserSchema.parse(req.body);
      const existing = await storage.getUserByUsername(username);
      if (existing) return res.status(400).json({ error: "Username already taken" });
      const user = await storage.createUser({ username, password });
      res.json({ id: user.id, username: user.username, language: user.language, profileComplete: user.profileComplete });
    } catch (e: any) {
      res.status(400).json({ error: e.message });
    }
  });

  // Legacy auth - login
  app.post("/api/auth/login", async (req, res) => {
    try {
      const { username, password } = req.body;
      const user = await storage.getUserByUsername(username);
      if (!user || user.password !== password) return res.status(401).json({ error: "Invalid credentials" });
      res.json({ id: user.id, username: user.username, language: user.language, profileComplete: user.profileComplete });
    } catch (e: any) {
      res.status(400).json({ error: e.message });
    }
  });

  // Get user profile
  app.get("/api/user/:id", async (req, res) => {
    const user = await storage.getUser(Number(req.params.id));
    if (!user) return res.status(404).json({ error: "Not found" });
    res.json(user);
  });

  // Update user profile
  app.patch("/api/user/:id", async (req, res) => {
    const user = await storage.updateUserProfile(Number(req.params.id), req.body);
    if (!user) return res.status(404).json({ error: "Not found" });
    res.json(user);
  });

  // Get milestones
  app.get("/api/milestones/:userId", async (req, res) => {
    const ms = await storage.getMilestones(Number(req.params.userId));
    res.json(ms);
  });

  // Upsert milestone
  app.post("/api/milestones", async (req, res) => {
    const ms = await storage.upsertMilestone(req.body);
    res.json(ms);
  });

  // Toggle milestone
  app.patch("/api/milestones/:id", async (req, res) => {
    const ms = await storage.updateMilestone(Number(req.params.id), req.body.completed);
    if (!ms) return res.status(404).json({ error: "Not found" });
    res.json(ms);
  });

  // Tax reminders
  app.get("/api/tax-reminders/:userId", async (req, res) => {
    res.json(await storage.getTaxReminders(Number(req.params.userId)));
  });

  app.post("/api/tax-reminders", async (req, res) => {
    const r = await storage.createTaxReminder(req.body.userId, req.body.reminderType, req.body.scheduledDate);
    res.json(r);
  });

  app.patch("/api/tax-reminders/:id/dismiss", async (req, res) => {
    await storage.dismissTaxReminder(Number(req.params.id));
    res.json({ success: true });
  });

  // ElevenLabs TTS proxy
  app.post("/api/tts", async (req, res) => {
    const apiKey = process.env.ELEVENLABS_API_KEY;
    if (!apiKey) return res.status(503).json({ error: "TTS service not configured" });
    const { text, voiceId } = req.body as { text: string; voiceId: string };
    if (!text || typeof text !== "string" || text.length > 5000)
      return res.status(400).json({ error: "Invalid text" });
    if (!voiceId || typeof voiceId !== "string")
      return res.status(400).json({ error: "Invalid voiceId" });
    try {
      const upstream = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`, {
        method: "POST",
        headers: { "xi-api-key": apiKey, "Content-Type": "application/json", Accept: "audio/mpeg" },
        body: JSON.stringify({ text, model_id: "eleven_multilingual_v2", voice_settings: { stability: 0.5, similarity_boost: 0.75 } }),
      });
      if (!upstream.ok) return res.status(upstream.status).json({ error: await upstream.text() });
      res.setHeader("Content-Type", "audio/mpeg");
      res.setHeader("Cache-Control", "no-store");
      res.send(Buffer.from(await upstream.arrayBuffer()));
    } catch (err: any) {
      res.status(500).json({ error: "TTS proxy failed" });
    }
  });

  // ElevenLabs STT proxy
  app.post("/api/stt", upload.single("audio"), async (req, res) => {
    const apiKey = process.env.ELEVENLABS_API_KEY;
    if (!apiKey) return res.status(503).json({ error: "STT service not configured" });
    if (!req.file) return res.status(400).json({ error: "No audio file received" });
    try {
      const formData = new FormData();
      const audioBlob = new Blob([new Uint8Array(req.file.buffer)], { type: req.file.mimetype });
      formData.append("file", audioBlob, req.file.originalname || "audio.webm");
      formData.append("model_id", "scribe_v1");
      if (req.body.language_code) formData.append("language_code", req.body.language_code);
      const upstream = await fetch("https://api.elevenlabs.io/v1/speech-to-text", {
        method: "POST",
        headers: { "xi-api-key": apiKey },
        body: formData,
      });
      if (!upstream.ok) return res.status(upstream.status).json({ error: await upstream.text() });
      const result = await upstream.json() as { text?: string };
      res.json({ text: result.text ?? "" });
    } catch (err: any) {
      res.status(500).json({ error: "STT proxy failed" });
    }
  });

  // Agentic Chat
  app.post("/api/chat", async (req, res) => {
    const { text, userId, milestoneContext } = req.body as {
      text: string;
      userId: number;
      milestoneContext?: string;
    };
    if (!text || typeof text !== "string" || text.trim().length === 0)
      return res.status(400).json({ error: "No text provided" });
    if (!userId || typeof userId !== "number")
      return res.status(400).json({ error: "No userId provided" });
    try {
      const { getAgentForUser } = await import("./agent");
      const agent = getAgentForUser(userId);
      const userProfile = await storage.getUser(userId);
      if (userProfile) {
        agent.setUserContext({
          username: userProfile.username,
          language: userProfile.language || "en",
          state: userProfile.state || null,
          familySize: userProfile.familySize || null,
          hasChildren: userProfile.hasChildren ?? null,
          employmentStatus: userProfile.employmentStatus || null,
          hasInsurance: userProfile.hasInsurance ?? null,
          arrivalDate: userProfile.arrivalDate || null,
        });
      }
      const reply = await agent.chat(text.trim(), milestoneContext);
      res.json({ reply });
    } catch (err: any) {
      res.status(500).json({ error: err?.message || "Chat failed" });
    }
  });

  // Clear chat history
  app.post("/api/chat/clear", async (req, res) => {
    const { userId } = req.body as { userId: number };
    if (!userId) return res.status(400).json({ error: "No userId" });
    try {
      const { getAgentForUser } = await import("./agent");
      const agent = getAgentForUser(userId);
      agent.clearHistory();
      res.json({ success: true });
    } catch (err: any) {
      res.status(500).json({ error: "Failed to clear history" });
    }
  });

  return httpServer;
}
