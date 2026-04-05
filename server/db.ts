import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";
import * as schema from "../shared/schema.js";

// Turso in production, local file in development
const url = process.env.TURSO_DATABASE_URL ?? "file:data.db";
const authToken = process.env.TURSO_AUTH_TOKEN;

const client = createClient(authToken ? { url, authToken } : { url });

export const db = drizzle(client, { schema });

export async function initDb() {
  await client.executeMultiple(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT NOT NULL,
      password TEXT NOT NULL DEFAULT '',
      auth0_sub TEXT UNIQUE,
      email TEXT,
      display_name TEXT,
      avatar_url TEXT,
      language TEXT NOT NULL DEFAULT 'en',
      arrival_date TEXT,
      family_size INTEGER DEFAULT 1,
      has_children INTEGER DEFAULT 0,
      employment_status TEXT DEFAULT 'none',
      has_insurance INTEGER DEFAULT 0,
      documents TEXT NOT NULL DEFAULT '[]',
      state TEXT DEFAULT '',
      profile_complete INTEGER DEFAULT 0
    );
    CREATE TABLE IF NOT EXISTS milestones (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      key TEXT NOT NULL,
      completed INTEGER DEFAULT 0,
      completed_at TEXT,
      notes TEXT DEFAULT ''
    );
    CREATE TABLE IF NOT EXISTS tax_reminders (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      reminder_type TEXT NOT NULL,
      scheduled_date TEXT NOT NULL,
      dismissed INTEGER DEFAULT 0
    );
  `);
}
