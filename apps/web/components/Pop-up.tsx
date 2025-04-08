import { ReactNode } from "react";
import { X } from "lucide-react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

export default function Modal({ isOpen, onClose, children }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-[-10%] left-[-20%] w-[500px] h-[500px] rounded-b-lg bg-purple-500 blur-[100px] animate-pulse delay-300"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-purple-500 blur-[100px] animate-pulse delay-300"></div>
        <div className="absolute top-[40%] right-[0%] w-[400px] h-[400px] rounded-full bg-purple-700 blur-[100px] animate-pulse delay-300"></div>
      </div>
      <div className="relative bg-black/20 border-dotted border-2 border-zinc-600 backdrop-blur-2xl rounded-lg p-8 w-full max-w-md shadow-lg">
        <button
          onClick={onClose}
          className="absolute cursor-pointer rounded-lg hover:bg-white/20 flex justify-center items-center w-7 h-7 top-4 right-4 text-gray-300 hover:text-white"
          aria-label="Close"
        >
          <X className="h-6 w-6" />
        </button>
        {children}
      </div>
    </div>
  );
}
