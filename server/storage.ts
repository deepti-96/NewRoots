import { db } from "./db";
import { users, milestones, taxReminders } from "@shared/schema";
import type { User, InsertUser, Milestone, InsertMilestone, TaxReminder } from "@shared/schema";
import { eq, and } from "drizzle-orm";

export interface IStorage {
  getUser(id: number): User | undefined;
  getUserByUsername(username: string): User | undefined;
  createUser(data: InsertUser): User;
  updateUserProfile(id: number, data: Partial<User>): User | undefined;
  getMilestones(userId: number): Milestone[];
  upsertMilestone(data: InsertMilestone): Milestone;
  updateMilestone(id: number, completed: boolean): Milestone | undefined;
  getTaxReminders(userId: number): TaxReminder[];
  createTaxReminder(userId: number, reminderType: string, scheduledDate: string): TaxReminder;
  dismissTaxReminder(id: number): void;
}

export class DatabaseStorage implements IStorage {
  getUser(id: number): User | undefined {
    return db.select().from(users).where(eq(users.id, id)).get();
  }

  getUserByUsername(username: string): User | undefined {
    return db.select().from(users).where(eq(users.username, username)).get();
  }

  createUser(data: InsertUser): User {
    return db.insert(users).values(data).returning().get();
  }

  updateUserProfile(id: number, data: Partial<User>): User | undefined {
    return db.update(users).set(data).where(eq(users.id, id)).returning().get();
  }

  getMilestones(userId: number): Milestone[] {
    return db.select().from(milestones).where(eq(milestones.userId, userId)).all();
  }

  upsertMilestone(data: InsertMilestone): Milestone {
    const existing = db.select().from(milestones)
      .where(and(eq(milestones.userId, data.userId), eq(milestones.key, data.key)))
      .get();
    if (existing) {
      return db.update(milestones).set(data).where(eq(milestones.id, existing.id)).returning().get()!;
    }
    return db.insert(milestones).values(data).returning().get();
  }

  updateMilestone(id: number, completed: boolean): Milestone | undefined {
    return db.update(milestones).set({
      completed,
      completedAt: completed ? new Date().toISOString() : null,
    }).where(eq(milestones.id, id)).returning().get();
  }

  getTaxReminders(userId: number): TaxReminder[] {
    return db.select().from(taxReminders).where(eq(taxReminders.userId, userId)).all();
  }

  createTaxReminder(userId: number, reminderType: string, scheduledDate: string): TaxReminder {
    return db.insert(taxReminders).values({ userId, reminderType, scheduledDate }).returning().get();
  }

  dismissTaxReminder(id: number): void {
    db.update(taxReminders).set({ dismissed: true }).where(eq(taxReminders.id, id)).run();
  }
}

export const storage = new DatabaseStorage();
