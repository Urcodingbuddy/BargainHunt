"use client";
import { Input } from "@/components/ui/input";
import {
  useRef,
  useState,
  type FormEvent,
  forwardRef,
  useImperativeHandle,
} from "react";
import { Button } from "./ui/button";

export type SubscribeEmailRef = {
  scrollToNewsletter: () => void;
};

export function SubscribeEmail() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubscribe = async (e: FormEvent) => {
    e.preventDefault();

    if (!email || !email.includes("@")) {
      alert("Please enter a valid email address.");
      return;
    }
    setIsSubmitting(true);

    setTimeout(() => {
      alert(
        "Thank you for subscribing to our price alerts and deal notifications."
      );
      setEmail("");
      setIsSubmitting(false);
    }, 1000);
  };
  return (
    <section id="newsletter" className="bg-gray-900 rounded-lg p-8 mb-20 ">
      <div className="grid md:grid-cols-2 gap-8 items-center">
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">
            Never Miss a <span className="text-purple-500">Deal</span>
          </h2>
          <p className="text-gray-400">
            Subscribe to receive price drop alerts, exclusive discount codes,
            and shopping tips to save more on your favorite products.
          </p>
        </div>
        <form onSubmit={handleSubscribe} className="flex gap-2">
          <Input
            type="email"
            placeholder="Enter your email"
            className="bg-black border-gray-800 focus-visible:ring-purple-500 rounded-md"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Button
            type="submit"
            className="text-white cursor-pointer bg-purple-600 hover:bg-purple-700 whitespace-nowrap rounded-md"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Subscribing..." : "Subscribe"}
          </Button>
        </form>
      </div>
    </section>
  );
}

export function SubscribeButton() {
  const scrollToNewsletter = () => {
    const el = document.getElementById("newsletter");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    } else {
      console.warn("Newsletter section not found");
    }
  };
  return (
    <Button
      variant="outline"
      className="border-gray-700 cursor-pointer pointer-events-auto hover:bg-gray-900 rounded-md"
      onClick={scrollToNewsletter}
    >
      Join Newsletter
    </Button>
  );
}
