import { db } from "./db";
import { users, milestones, taxReminders } from "@shared/schema";
import type { User, InsertUser, Milestone, InsertMilestone, TaxReminder } from "@shared/schema";
import { eq, and } from "drizzle-orm";

export interface IStorage {
  getUser(id: number): User | undefined;
  getUserByUsername(username: string): User | undefined;
  getUserByAuth0Sub(auth0Sub: string): User | undefined;
  createUser(data: InsertUser): User;
  upsertAuth0User(auth0Sub: string, email: string | null, displayName: string | null, avatarUrl: string | null): User;
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

  getUserByAuth0Sub(auth0Sub: string): User | undefined {
    return db.select().from(users).where(eq(users.auth0Sub, auth0Sub)).get();
  }

  createUser(data: InsertUser): User {
    return db.insert(users).values(data).returning().get();
  }

  /**
   * Find or create a user from Auth0 profile data.
   * On first login, creates a new DB user. On subsequent logins, returns existing user.
   */
  upsertAuth0User(auth0Sub: string, email: string | null, displayName: string | null, avatarUrl: string | null): User {
    const existing = this.getUserByAuth0Sub(auth0Sub);
    if (existing) {
      // Update email/display/avatar if changed
      return db.update(users).set({
        email: email ?? existing.email,
        displayName: displayName ?? existing.displayName,
        avatarUrl: avatarUrl ?? existing.avatarUrl,
      }).where(eq(users.id, existing.id)).returning().get()!;
    }
    // Create new user from Auth0 profile
    return db.insert(users).values({
      username: displayName || email || auth0Sub,
      password: "", // no password needed for Auth0 users
      auth0Sub,
      email,
      displayName,
      avatarUrl,
    }).returning().get();
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
