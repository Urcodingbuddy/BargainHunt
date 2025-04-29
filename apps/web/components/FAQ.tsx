"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { faqs } from "@/lib/faqData";

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="space-y-4">
      {faqs.map((faq, index) => {
        const isOpen = openIndex === index;

        return (
          <div
            key={index}
            className="border border-gray-800 rounded-lg overflow-hidden transition-colors duration-300"
          >
            <button
              onClick={() => toggleFAQ(index)}
              className={`w-full flex justify-between items-center 
              px-3 py-3 sm:px-4 sm:py-4 
              text-left ${isOpen ? "bg-gray-900" : "bg-black"}`}
              aria-expanded={isOpen}
            >
              <h3 className="text-base sm:text-lg md:text-xl font-medium text-white">
                {faq.question}
              </h3>
              <div className="flex-shrink-0 ml-2 sm:ml-4 text-purple-500">
                {isOpen ? (
                  <ChevronUp className="h-5 w-5 sm:h-6 sm:w-6" />
                ) : (
                  <ChevronDown className="h-5 w-5 sm:h-6 sm:w-6" />
                )}
              </div>
            </button>

            <div
              className={`transition-all duration-500 ease-in-out overflow-hidden ${
                isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              <div className="px-3 py-2 sm:px-4 sm:py-4 bg-gray-900 text-gray-300 border-t border-gray-800 text-sm sm:text-base">
                {faq.answer}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
