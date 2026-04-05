import express from "express";
import { registerRoutes } from "../server/routes.js";
import { createServer } from "http";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((_req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PATCH,DELETE,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if (_req.method === "OPTIONS") return res.sendStatus(200);
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
