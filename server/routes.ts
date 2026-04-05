import type { Express } from "express";
import { type Server } from "http";
import { storage } from "./storage";
import { insertUserSchema } from "@shared/schema";

export async function registerRoutes(httpServer: Server, app: Express): Promise<Server> {
  // Auth0 sync — called from frontend after Auth0 login to create/fetch DB user
  app.post("/api/auth/sync", (req, res) => {
    try {
      const { auth0Sub, email, displayName, avatarUrl } = req.body;
      if (!auth0Sub) return res.status(400).json({ error: "auth0Sub is required" });
      const user = storage.upsertAuth0User(auth0Sub, email || null, displayName || null, avatarUrl || null);
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

  // Legacy auth - register (kept for backwards compatibility)
  app.post("/api/auth/register", (req, res) => {
    try {
      const { username, password } = insertUserSchema.parse(req.body);
      const existing = storage.getUserByUsername(username);
      if (existing) return res.status(400).json({ error: "Username already taken" });
      const user = storage.createUser({ username, password });
      res.json({ id: user.id, username: user.username, language: user.language, profileComplete: user.profileComplete });
    } catch (e: any) {
      res.status(400).json({ error: e.message });
    }
  });

  // Legacy auth - login
  app.post("/api/auth/login", (req, res) => {
    try {
      const { username, password } = req.body;
      const user = storage.getUserByUsername(username);
      if (!user || user.password !== password) return res.status(401).json({ error: "Invalid credentials" });
      res.json({ id: user.id, username: user.username, language: user.language, profileComplete: user.profileComplete });
    } catch (e: any) {
      res.status(400).json({ error: e.message });
    }
  });

  // Get user profile
  app.get("/api/user/:id", (req, res) => {
    const user = storage.getUser(Number(req.params.id));
    if (!user) return res.status(404).json({ error: "Not found" });
    res.json(user);
  });

  // Update user profile
  app.patch("/api/user/:id", (req, res) => {
    const user = storage.updateUserProfile(Number(req.params.id), req.body);
    if (!user) return res.status(404).json({ error: "Not found" });
    res.json(user);
  });

  // Get milestones
  app.get("/api/milestones/:userId", (req, res) => {
    const ms = storage.getMilestones(Number(req.params.userId));
    res.json(ms);
  });

  // Upsert milestone
  app.post("/api/milestones", (req, res) => {
    const ms = storage.upsertMilestone(req.body);
    res.json(ms);
  });

  // Toggle milestone
  app.patch("/api/milestones/:id", (req, res) => {
    const ms = storage.updateMilestone(Number(req.params.id), req.body.completed);
    if (!ms) return res.status(404).json({ error: "Not found" });
    res.json(ms);
  });

  // Tax reminders
  app.get("/api/tax-reminders/:userId", (req, res) => {
    res.json(storage.getTaxReminders(Number(req.params.userId)));
  });

  app.post("/api/tax-reminders", (req, res) => {
    const r = storage.createTaxReminder(req.body.userId, req.body.reminderType, req.body.scheduledDate);
    res.json(r);
  });

  app.patch("/api/tax-reminders/:id/dismiss", (req, res) => {
    storage.dismissTaxReminder(Number(req.params.id));
    res.json({ success: true });
  });

  return httpServer;
}
