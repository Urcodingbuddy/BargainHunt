import { useState } from "react";
import { Button } from "./ui/button";
import dynamic from "next/dynamic";
import { HiMiniUser } from "react-icons/hi2";
const Modal = dynamic(() => import("@/components/Pop-up"), { ssr: false });
const SignupForm = dynamic(() => import("@/components/Auth"), { ssr: false });

export default function ModalWrapper() {
    const [isSignupOpen, setIsSignupOpen] = useState(false);
  
    const openSignup = () => setIsSignupOpen(true);
    const closeSignup = () => setIsSignupOpen(false);
  
    return (
      <>
        <Button
              variant="ghost"
              size="icon"
              onClick={openSignup}
              className="rounded-full border-gray-700 border-2 flex items-end h-8 w-8 cursor-pointer text-white hover:bg-gray-900"
            >
              <HiMiniUser className="w-6 h-6" />
            </Button>
        <Modal isOpen={isSignupOpen} onClose={closeSignup}>
          <SignupForm />
        </Modal>
      </>
    );
  }

//   