import { FaGoogle } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa";

export default function SignupForm() {
  return (
    <div className="">
      <h1 className="text-2xl font-bold text-white text-center mb-6">
        Log-In
      </h1>
      <div className="space-y-4">
        {/* Google OAuth Button */}
        <button className="w-full cursor-pointer flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-lg transition-all duration-300">
          <FaGoogle className="h-5 w-5" />
          Sign up with Google
        </button>

        {/* GitHub OAuth Button */}
        <button className="w-full cursor-pointer flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-lg transition-all duration-300">
          <FaGithub className="h-5 w-5" />
          Sign up with GitHub
        </button>
      </div>
    </div>
  );
}