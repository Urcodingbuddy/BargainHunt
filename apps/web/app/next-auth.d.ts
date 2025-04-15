// types/next-auth.d.ts
import NextAuth, { DefaultSession } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface User {
    id: string;
    name: string;
    phone?: string | null;
    email: string;
    auth_type?: "GOOGLE" | "GITHUB";
    imageUrl?: string | null;
    createdAt?: Date | null;
    modrator: boolean;
  }

  interface Session extends DefaultSession {
    user: User & { id: string , modrator: boolean };
  }
  
interface Profile {
  avatar_url?: string; // ✅ GitHub avatar URL
  picture?: string; // ✅ Google profile picture
}
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    modrator: boolean;
  }
}
