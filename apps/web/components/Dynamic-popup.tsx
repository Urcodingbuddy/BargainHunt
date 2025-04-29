"use client";
import { useState } from "react";
import { Button } from "./ui/button";
import dynamic from "next/dynamic";
import { HiMiniUser } from "react-icons/hi2";
import { useSession } from "next-auth/react";
const Modal = dynamic(() => import("@/components/Pop-up"), { ssr: false });
const SignupForm = dynamic(() => import("@/components/Auth"), { ssr: false });
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

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
        className={`rounded-full border-gray-700 hover:border-purple-600 border-2 flex justify-center items-center h-8.5 w-8.5 cursor-pointer text-white hover:bg-gray-900`}
      >
        <TooltipProvider>
          {session?.user.image ? (
            <Tooltip>
              <TooltipTrigger>
                <img
                  src={session.user.image}
                  alt="User Image"
                  className="rounded-full w-8 h-8"
                />
              </TooltipTrigger>
              <TooltipContent>
                <p>{session.user.name}</p>
              </TooltipContent>
            </Tooltip>
          ) : (
            <Tooltip>
              <TooltipTrigger>
                <HiMiniUser className="w-8 h-8" />
              </TooltipTrigger>
              <TooltipContent>
                <p>Log-In</p>
              </TooltipContent>
            </Tooltip>
          )}
        </TooltipProvider>
      </Button>
      <Modal isOpen={isSignupOpen} onClose={closeSignup}>
        <SignupForm />
      </Modal>
    </>
  );
}
