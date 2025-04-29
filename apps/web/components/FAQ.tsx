"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"
import {faqs} from "@/lib/faqData"


export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className="w-full py-16 px-4 md:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Frequently Asked Questions</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Get answers to the most common questions about BargainHunt and how it can help you save money.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="border border-gray-800 rounded-lg overflow-hidden transition-all duration-300">
              <button
                onClick={() => toggleFAQ(index)}
                className={`w-full flex justify-between items-center p-4 text-left ${
                  openIndex === index ? "bg-gray-900" : "bg-black"
                }`}
                aria-expanded={openIndex === index}
              >
                <h3 className="text-lg font-medium text-white">{faq.question}</h3>
                <div className="flex-shrink-0 ml-4 text-purple-500">
                  {openIndex === index ? <ChevronUp className="h-6 w-6" /> : <ChevronDown className="h-6 w-6" />}
                </div>
              </button>

              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? "max-h-96 opacity-100" : "hidden opacity-0"
                }`}
              >
                <div className="p-4 bg-gray-900 text-gray-300 border-t border-gray-800">{faq.answer}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}