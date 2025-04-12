import { FaGoogle } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa";
import { signIn, signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import { LogOut } from 'lucide-react';

export default function SignupForm() {
  const { data: session } = useSession();

  if (session) {
    return (
      <div className="text-center text-white">
        <h1 className="text-2xl font-bold mb-4">Welcome, {session.user?.name}!</h1>
        <img
          src={session.user?.image || ""}
          alt="User Avatar"
          className="w-16 h-16 rounded-full mx-auto mb-4"
        />
        <p className="mb-4">Email: {session.user?.email}</p>
        <button
          onClick={() => signOut()}
          className="cursor-pointer bg-red-600 border-red-600 border-2 hover:bg-transparent text-white font-medium py-2 px-4 rounded-lg transition-all duration-300 pointer-events-auto"
        >
          Log Out <LogOut className="h-5 w-5 inline-block ml-1" />
        </button>
      </div>
    );
  }

  return (
    <div className="">
      <h1 className="text-2xl font-bold text-white text-center mb-6">
        Log-In
      </h1>
      <div className="space-y-4">
        {/* Google OAuth Button */}
        <button
          onClick={() => signIn("google")}
          className="w-full cursor-pointer flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-lg transition-all duration-300"
        >
          <FaGoogle className="h-5 w-5" />
          Sign up with Google
        </button>

        {/* GitHub OAuth Button */}
        <button
          onClick={() => signIn("github")}
          className="w-full cursor-pointer flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-lg transition-all duration-300"
        >
          <FaGithub className="h-5 w-5" />
          Sign up with GitHub
        </button>
      </div>
    </div>
  );
}