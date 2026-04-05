import session from "express-session";
import { client, initDb } from "./db.js";

function getExpiryTime(sess: session.SessionData) {
  const cookieExpiry = sess.cookie?.expires
    ? new Date(sess.cookie.expires).getTime()
    : null;
  const maxAgeExpiry = typeof sess.cookie?.maxAge === "number"
    ? Date.now() + sess.cookie.maxAge
    : null;

  return cookieExpiry ?? maxAgeExpiry ?? Date.now() + 24 * 60 * 60 * 1000;
}

export class LibsqlSessionStore extends session.Store {
  override async get(
    sid: string,
    callback: (err?: unknown, session?: session.SessionData | null) => void,
  ) {
    try {
      await initDb();
      const result = await client.execute({
        sql: "SELECT sess, expire FROM sessions WHERE sid = ? LIMIT 1",
        args: [sid],
      });
      const row = result.rows[0];

      if (!row) {
        callback(undefined, null);
        return;
      }

      const expire = Number(row.expire);
      if (Number.isFinite(expire) && expire <= Date.now()) {
        await this.destroy(sid, () => undefined);
        callback(undefined, null);
        return;
      }

      callback(undefined, JSON.parse(String(row.sess)));
    } catch (error) {
      callback(error);
    }
  }

  override async set(
    sid: string,
    sess: session.SessionData,
    callback?: (err?: unknown) => void,
  ) {
    try {
      await initDb();
      await client.execute({
        sql: `
          INSERT INTO sessions (sid, sess, expire)
          VALUES (?, ?, ?)
          ON CONFLICT(sid) DO UPDATE SET
            sess = excluded.sess,
            expire = excluded.expire
        `,
        args: [sid, JSON.stringify(sess), getExpiryTime(sess)],
      });
      callback?.();
    } catch (error) {
      callback?.(error);
    }
  }

  override async destroy(sid: string, callback?: (err?: unknown) => void) {
    try {
      await initDb();
      await client.execute({
        sql: "DELETE FROM sessions WHERE sid = ?",
        args: [sid],
      });
      callback?.();
    } catch (error) {
      callback?.(error);
    }
  }

  override async touch(
    sid: string,
    sess: session.SessionData,
    callback?: (err?: unknown) => void,
  ) {
    await this.set(sid, sess, callback);
  }
}
