"use client";
import { useState } from "react";
import { BotMessageSquare } from "lucide-react";
import { motion } from "framer-motion";
import { BorderBeam } from "./ui/border-beam";

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="relative overflow-hidden rounded-lg z-20">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="h-12 md:h-13 w-12 md:w-13 rounded-full md:bg-purple-800 bg-purple-600 text-white fixed bottom-6 md:bottom-13 right-6 md:right-13 flex items-center justify-center shadow-lg hover:bg-purple-600 transition duration-300 cursor-pointer group ease-in-out"
      >
        <BotMessageSquare className="h-7 md:h-8 w-7 md:w-8 transition-transform duration-300 group-hover:scale-110" />
      </button>
      <motion.div
        initial={{ opacity: 0, scale: 0, transformOrigin: "bottom right" }}
        animate={isOpen ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className="fixed bottom-18 md:bottom-24 md:right-24 right-9 w-72 md:w-96  h-[60vh] md:h-[75vh] shadow-lg rounded-lg overflow-hidden origin-bottom-right
        border-2"
      >
        <BorderBeam />
        <iframe
          src="https://www.chatbase.co/chatbot-iframe/aK9uDLKFneU55nyobNwP1"
          width="100%"
          height="100%"
        />
      </motion.div>
    </div>
  );
}
