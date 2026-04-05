import Database from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";
import * as schema from "@shared/schema";
import path from "path";

const sqlite = new Database(path.resolve("data.db"));
sqlite.pragma("journal_mode = WAL");

export const db = drizzle(sqlite, { schema });

// Create tables if not exist
sqlite.exec(`
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

// Migration: add Auth0 columns to existing databases
try {
  sqlite.exec(`ALTER TABLE users ADD COLUMN auth0_sub TEXT UNIQUE;`);
} catch (_) { /* column already exists */ }
try {
  sqlite.exec(`ALTER TABLE users ADD COLUMN email TEXT;`);
} catch (_) { /* column already exists */ }
try {
  sqlite.exec(`ALTER TABLE users ADD COLUMN display_name TEXT;`);
} catch (_) { /* column already exists */ }
try {
  sqlite.exec(`ALTER TABLE users ADD COLUMN avatar_url TEXT;`);
} catch (_) { /* column already exists */ }
