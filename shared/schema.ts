import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// User / Family Profile
export const users = sqliteTable("users", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  username: text("username").notNull(),
  password: text("password").notNull().default(""),
  auth0Sub: text("auth0_sub").unique(), // Auth0 unique user ID (e.g. "auth0|abc123")
  email: text("email"),
  displayName: text("display_name"),
  avatarUrl: text("avatar_url"),
  language: text("language").notNull().default("en"),
  arrivalDate: text("arrival_date"),
  familySize: integer("family_size").default(1),
  hasChildren: integer("has_children", { mode: "boolean" }).default(false),
  employmentStatus: text("employment_status").default("none"),
  hasInsurance: integer("has_insurance", { mode: "boolean" }).default(false),
  documents: text("documents").notNull().default("[]"), // JSON array
  state: text("state").default(""),
  profileComplete: integer("profile_complete", { mode: "boolean" }).default(false),
});

// Milestones / checklist items
export const milestones = sqliteTable("milestones", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  userId: integer("user_id").notNull(),
  key: text("key").notNull(), // e.g. "phone", "ssn", "bank_account"
  completed: integer("completed", { mode: "boolean" }).default(false),
  completedAt: text("completed_at"),
  notes: text("notes").default(""),
});

// Tax reminders
export const taxReminders = sqliteTable("tax_reminders", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  userId: integer("user_id").notNull(),
  reminderType: text("reminder_type").notNull(),
  scheduledDate: text("scheduled_date").notNull(),
  dismissed: integer("dismissed", { mode: "boolean" }).default(false),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const updateProfileSchema = createInsertSchema(users).pick({
  language: true,
  arrivalDate: true,
  familySize: true,
  hasChildren: true,
  employmentStatus: true,
  hasInsurance: true,
  documents: true,
  state: true,
  profileComplete: true,
});

export const insertMilestoneSchema = createInsertSchema(milestones).omit({ id: true });

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type Milestone = typeof milestones.$inferSelect;
export type InsertMilestone = z.infer<typeof insertMilestoneSchema>;
export type TaxReminder = typeof taxReminders.$inferSelect;
