import bcrypt from "bcryptjs";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { connectDB } from "@/lib/db/connect";
import AdminUser from "@/models/AdminUser";

const credentialsSchema = {
  email: (value: unknown) =>
    typeof value === "string" ? value.trim().toLowerCase() : "",
  password: (value: unknown) => (typeof value === "string" ? value : ""),
};

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const email = credentialsSchema.email(credentials?.email);
        const password = credentialsSchema.password(credentials?.password);

        if (!email || !password) {
          return null;
        }

        await connectDB();

        const user = await AdminUser.findOne({ email, active: true })
          .select("+passwordHash")
          .lean();

        if (!user?.passwordHash) {
          return null;
        }

        const isValid = await bcrypt.compare(password, user.passwordHash);

        if (!isValid) {
          return null;
        }

        return {
          id: String(user._id),
          email: user.email,
          name: user.name,
          role: user.role as "admin" | "editor",
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/admin/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
      }

      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub ?? "";
        session.user.role =
          token.role === "admin" || token.role === "editor"
            ? token.role
            : "admin";
      }

      return session;
    },
  },
  secret: process.env.AUTH_SECRET,
});

export const { GET, POST } = handlers;

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12);
}

export async function verifyPassword(
  password: string,
  passwordHash: string,
): Promise<boolean> {
  return bcrypt.compare(password, passwordHash);
}
