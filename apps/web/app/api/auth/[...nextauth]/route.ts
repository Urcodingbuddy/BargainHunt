// app/api/auth/[...nextauth]/route.ts
import NextAuth from "next-auth";
import { authOptions } from "../authOptions"; // ✅ Import from separate file

const handler = NextAuth(authOptions)

export {handler as GET, handler as POST}