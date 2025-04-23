"use client"
import { useState } from "react";
import { Button } from "./ui/button";
import dynamic from "next/dynamic";
import { HiMiniUser } from "react-icons/hi2";
import { useSession } from "next-auth/react";
const Modal = dynamic(() => import("@/components/Pop-up"), { ssr: false });
const SignupForm = dynamic(() => import("@/components/Auth"), { ssr: false });

export default function ModalWrapper() {
    const [isSignupOpen, setIsSignupOpen] = useState(false);
    const { data: session } = useSession();
    const openSignup = () => setIsSignupOpen(true);
    const closeSignup = () => setIsSignupOpen(false);
  
    return (
      <>
        <Button
          variant="ghost"
          size="icon"
          onClick={openSignup}
          className={`rounded-full border-gray-700 hover:border-purple-600 border-2 flex justify-center items-center ${session ? "h-10 w-10" : "h-8 w-8"} cursor-pointer text-white hover:bg-gray-900`}
        >
          {session?.user.image ? (
            <img
              src={session.user.image}
              alt="User Image"
              className="rounded-full w-8 h-8"
            />
          ) : (
            <HiMiniUser className="w-7 h-7" /> // ⬅️ matches size perfectly
          )}
        </Button>
        <Modal isOpen={isSignupOpen} onClose={closeSignup}>
          <SignupForm />
        </Modal>
      </>
    );    
  }
