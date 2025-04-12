// types/next-auth.d.ts
import NextAuth, { DefaultSession } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface User {
    id: string;
    name: string;
    phone?: string | null;
    email: string;
    auth_type?: "Google" | "Github";
    imageUrl?: string | null;
    createdAt?: Date | null;
  }

  interface Session extends DefaultSession {
    user: User & { id: string };
  }
  
interface Profile {
  avatar_url?: string; // ✅ GitHub avatar URL
  picture?: string; // ✅ Google profile picture
}
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
  }
}
