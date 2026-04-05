import express from "express";
import { registerRoutes } from "../server/routes.js";
import { storage } from "../server/storage.js";
import { createServer } from "http";
import { createRemoteJWKSet, jwtVerify } from "jose";

const AUTH0_DOMAIN = "dev-p248ayy0xaycz1lz.us.auth0.com";
const AUTH0_AUDIENCE = "https://new-roots-kappa.vercel.app";
const JWKS_URI = `https://${AUTH0_DOMAIN}/.well-known/jwks.json`;

// Cache the JWKS remotely — reused across warm invocations
const JWKS = createRemoteJWKSet(new URL(JWKS_URI));

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

// JWT auth middleware — attaches req.dbUser when a valid Bearer token is present
async function attachUser(req: any, _res: any, next: any) {
  const authHeader = req.headers.authorization as string | undefined;
  if (!authHeader?.startsWith("Bearer ")) return next();

  const token = authHeader.slice(7);
  try {
    const { payload } = await jwtVerify(token, JWKS, {
      issuer: `https://${AUTH0_DOMAIN}/`,
      audience: AUTH0_AUDIENCE,
    });
    const auth0Sub = payload.sub as string;
    if (auth0Sub) {
      const dbUser = await storage.getUserByAuth0Sub(auth0Sub);
      if (dbUser) req.dbUser = dbUser;
    }
  } catch {
    // Invalid token — leave req.dbUser undefined; route will return 401
  }
  next();
}

app.use(attachUser);

// Shim so existing route handlers that use session/passport methods keep working
app.use((req: any, _res: any, next: any) => {
  req.isAuthenticated = () => !!req.dbUser;
  req.user = req.dbUser;
  // req.login is called by /api/auth/sync — just invoke callback immediately (no-op session)
  req.login = (_user: any, cb: (err?: any) => void) => cb();
  // req.logout is called by /api/auth/logout — no-op (Auth0 logout is client-side)
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
