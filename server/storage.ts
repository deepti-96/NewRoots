import { db, initDb } from "./db";
import { users, milestones, taxReminders } from "@shared/schema";
import type { User, InsertUser, Milestone, InsertMilestone, TaxReminder } from "@shared/schema";
import { eq, and } from "drizzle-orm";

let _initialized = false;
async function ensureInit() {
  if (!_initialized) {
    await initDb();
    _initialized = true;
  }
}

export const storage = {
  async getUser(id: number): Promise<User | undefined> {
    await ensureInit();
    return (await db.select().from(users).where(eq(users.id, id)))[0];
  },

  async getUserByUsername(username: string): Promise<User | undefined> {
    await ensureInit();
    return (await db.select().from(users).where(eq(users.username, username)))[0];
  },

  async getUserByAuth0Sub(auth0Sub: string): Promise<User | undefined> {
    await ensureInit();
    return (await db.select().from(users).where(eq(users.auth0Sub, auth0Sub)))[0];
  },

  async createUser(data: InsertUser): Promise<User> {
    await ensureInit();
    return (await db.insert(users).values(data).returning())[0];
  },

  async upsertAuth0User(
    auth0Sub: string,
    email: string | null,
    displayName: string | null,
    avatarUrl: string | null
  ): Promise<User> {
    await ensureInit();
    const existing = await this.getUserByAuth0Sub(auth0Sub);
    if (existing) {
      return (await db.update(users).set({
        email: email ?? existing.email,
        displayName: displayName ?? existing.displayName,
        avatarUrl: avatarUrl ?? existing.avatarUrl,
      }).where(eq(users.id, existing.id)).returning())[0];
    }
    return (await db.insert(users).values({
      username: displayName || email || auth0Sub,
      password: "",
      auth0Sub,
      email,
      displayName,
      avatarUrl,
    }).returning())[0];
  },

  async updateUserProfile(id: number, data: Partial<User>): Promise<User | undefined> {
    await ensureInit();
    return (await db.update(users).set(data).where(eq(users.id, id)).returning())[0];
  },

  async getMilestones(userId: number): Promise<Milestone[]> {
    await ensureInit();
    return db.select().from(milestones).where(eq(milestones.userId, userId));
  },

  async upsertMilestone(data: InsertMilestone): Promise<Milestone> {
    await ensureInit();
    const existing = (await db.select().from(milestones)
      .where(and(eq(milestones.userId, data.userId), eq(milestones.key, data.key))))[0];
    if (existing) {
      return (await db.update(milestones).set(data).where(eq(milestones.id, existing.id)).returning())[0];
    }
    return (await db.insert(milestones).values(data).returning())[0];
  },

  async updateMilestone(id: number, completed: boolean): Promise<Milestone | undefined> {
    await ensureInit();
    return (await db.update(milestones).set({
      completed,
      completedAt: completed ? new Date().toISOString() : null,
    }).where(eq(milestones.id, id)).returning())[0];
  },

  async getTaxReminders(userId: number): Promise<TaxReminder[]> {
    await ensureInit();
    return db.select().from(taxReminders).where(eq(taxReminders.userId, userId));
  },

  async createTaxReminder(userId: number, reminderType: string, scheduledDate: string): Promise<TaxReminder> {
    await ensureInit();
    return (await db.insert(taxReminders).values({ userId, reminderType, scheduledDate }).returning())[0];
  },

  async dismissTaxReminder(id: number): Promise<void> {
    await ensureInit();
    await db.update(taxReminders).set({ dismissed: true }).where(eq(taxReminders.id, id));
  },
};
