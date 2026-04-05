import express from "express";
import { registerRoutes } from "../server/routes.js";
import { storage } from "../server/storage.js";
import { createServer } from "http";
import session from "express-session";
import passport from "passport";
import connectMemoryStore from "memorystore";

const MemoryStore = connectMemoryStore(session);

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

// Session
app.use(
  session({
    secret: process.env.SESSION_SECRET || "new-roots-top-secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      secure: true,
      httpOnly: true,
      sameSite: "none", // required for cross-origin cookies on Vercel
    },
    store: new MemoryStore({
      checkPeriod: 86400000,
    }),
  })
);

// Passport
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user: any, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id: number, done) => {
  try {
    const user = await storage.getUser(id);
    done(null, user || false);
  } catch (err) {
    done(err);
  }
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
