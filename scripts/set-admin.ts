import { config as loadEnv } from "dotenv";

loadEnv({ path: ".env.local" });
loadEnv();
import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import { AdminUser } from "@/models";

/**
 * Creates or updates the admin login used by /admin/login.
 *
 *   ADMIN_EMAIL=you@example.com ADMIN_PASSWORD=secret npm run set-admin
 *
 * Values are read from the environment (.env.local / .env). The old
 * default seed account is deactivated so it can no longer be used to sign in.
 */

const LEGACY_SEED_EMAIL = "admin@mountiebasketball.com";
const MONGODB_URI =
  process.env.MONGODB_URI ?? "mongodb://127.0.0.1:27017/mountie-basketball";

async function main() {
  const email = process.env.ADMIN_EMAIL?.trim().toLowerCase();
  const password = process.env.ADMIN_PASSWORD;

  if (!email || !password) {
    throw new Error("Set ADMIN_EMAIL and ADMIN_PASSWORD before running this script.");
  }

  await mongoose.connect(MONGODB_URI, { serverSelectionTimeoutMS: 5_000 });

  await AdminUser.findOneAndUpdate(
    { email },
    {
      email,
      passwordHash: await bcrypt.hash(password, 12),
      name: "Site Administrator",
      role: "admin",
      active: true,
    },
    { upsert: true, returnDocument: "after" },
  );

  if (email !== LEGACY_SEED_EMAIL) {
    await AdminUser.updateOne({ email: LEGACY_SEED_EMAIL }, { active: false });
  }

  console.log(`Admin login ready: ${email}`);
}

main()
  .catch((error) => {
    console.error(error instanceof Error ? error.message : error);
    process.exitCode = 1;
  })
  .finally(() => mongoose.disconnect());
