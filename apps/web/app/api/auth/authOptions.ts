import { AuthOptions, User } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import { JWT } from "next-auth/jwt";
import { Session } from "next-auth";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
  ],

  callbacks: {
    async signIn({ user, account, profile }) {
      const existingUser = await prisma.user.findUnique({
        where: { email: user.email! },
        select: {modrator: true, id: true}
      });
      if (existingUser) {
        user.id = existingUser.id;
        return true;
      }
      if (!existingUser) {
        await prisma.user.create({
          data: {
            email: user.email!,
            name: user.name!,
            phone: user.phone!,
            imageUrl:
              profile?.avatar_url ?? profile?.picture ?? user.imageUrl ?? "",
            auth_type: account?.provider === "google" ? "GOOGLE" : "GITHUB",
            modrator: false,
          },
        });
      }
      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token.modrator = user.modrator;
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      if (session.user) {
        session.user.id = token.id;
        session.user.modrator = token.modrator as boolean;
      }
      return session;
    },
    async redirect({ baseUrl }: { baseUrl: string }) {
      return baseUrl + "/";
    },
  },
};

