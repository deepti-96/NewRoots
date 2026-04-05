import express from "express";
import { registerRoutes } from "../server/routes.js";
import { storage } from "../server/storage.js";
import { createServer } from "http";

const AUTH0_DOMAIN = "dev-p248ayy0xaycz1lz.us.auth0.com";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// CORS
app.use((_req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", _req.headers.origin || "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PATCH,DELETE,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  if (_req.method === "OPTIONS") return res.sendStatus(200);
  next();
});

// Simple in-process cache: token → { sub, exp }
const tokenCache = new Map<string, { sub: string; exp: number }>();

async function resolveAuth0Sub(token: string): Promise<string | null> {
  const now = Date.now();
  const cached = tokenCache.get(token);
  if (cached && cached.exp > now) return cached.sub;

  try {
    const resp = await fetch(`https://${AUTH0_DOMAIN}/userinfo`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!resp.ok) return null;
    const data = await resp.json() as { sub?: string };
    if (!data.sub) return null;
    // Cache for 5 minutes to avoid hammering Auth0 on every request
    tokenCache.set(token, { sub: data.sub, exp: now + 5 * 60 * 1000 });
    return data.sub;
  } catch {
    return null;
  }
}

// Auth middleware — verifies Bearer token via Auth0 /userinfo and attaches req.dbUser
async function attachUser(req: any, _res: any, next: any) {
  const authHeader = req.headers.authorization as string | undefined;
  if (!authHeader?.startsWith("Bearer ")) return next();

  const token = authHeader.slice(7);
  const auth0Sub = await resolveAuth0Sub(token);
  if (auth0Sub) {
    const dbUser = await storage.getUserByAuth0Sub(auth0Sub);
    if (dbUser) req.dbUser = dbUser;
  }
  next();
}

app.use(attachUser);

// Shim so existing route handlers that rely on passport/session keep working
app.use((req: any, _res: any, next: any) => {
  req.isAuthenticated = () => !!req.dbUser;
  req.user = req.dbUser;
  // req.login called by /api/auth/sync — no-op (no session needed)
  req.login = (_user: any, cb: (err?: any) => void) => cb();
  // req.logout called by /api/auth/logout — no-op (Auth0 handles logout client-side)
  req.logout = (cb: (err?: any) => void) => cb();
  next();
});

const server = createServer(app);

let ready = false;
let readyPromise: Promise<void> | null = null;

async function ensureReady() {
  if (ready) return;
  if (!readyPromise) {
    readyPromise = registerRoutes(server, app).then(() => { ready = true; });
  }
  await readyPromise;
}

export default async function handler(req: any, res: any) {
  await ensureReady();
  app(req, res);
}
