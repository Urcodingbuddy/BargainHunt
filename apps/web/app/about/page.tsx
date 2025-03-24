"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Github, Linkedin, Mail, Rss, Twitter } from "lucide-react"
import { useRouter } from "next/navigation"

export default function AboutPage() {
  const router = useRouter()

  const handleSubscribeClick = () => {
    router.push("/#newsletter")
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="container mx-auto py-6">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-xl font-bold tracking-tighter">
            Bargain<span className="text-purple-500">Hunt</span>
          </Link>
          <nav className="hidden md:flex items-center space-x-6 text-sm">
            <Link href="/" className="text-gray-400 hover:text-white transition-colors">
              Home
            </Link>
            <Link href="/articles/" className="text-gray-400 hover:text-white transition-colors">
              Articles
            </Link>
            <Link href="/topics/" className="text-gray-400 hover:text-white transition-colors">
              Topics
            </Link>
            <Link href="/about/" className="text-white transition-colors border-b-2 border-purple-500 pb-1">
              About
            </Link>
          </nav>
          <Button
            variant="outline"
            className="border-purple-500 text-purple-500 hover:bg-purple-950 hover:text-white"
            onClick={handleSubscribeClick}
          >
            Subscribe
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">About Bargain Hunt</h1>

          <div className="prose prose-invert prose-purple max-w-none">
            <p className="text-xl text-gray-300 mb-8">
              Bargain Hunt is your gateway to the latest updates, innovations, and explorations in technology and beyond, with a special focus on AI, software development, and the tech community.
            </p>

            <h2>Our Mission</h2>
            <p>
              Our mission is to empower developers, tech enthusiasts, and entrepreneurs by delivering insightful and practical content that enhances understanding of rapidly evolving technologies.
            </p>

            <h2>What We Cover</h2>
            <p>At Bargain Hunt, we explore several key areas in tech and development:</p>

            <ul>
              <li>
                <strong>Software Development</strong>: Get deep insights into coding best practices, frameworks, and new tools.
              </li>
              <li>
                <strong>Artificial Intelligence</strong>: Learn about AI breakthroughs, ethical challenges, and real-world applications.
              </li>
              <li>
                <strong>Technology Trends</strong>: Stay ahead by following our analyses of emerging trends and innovations.
              </li>
              <li>
                <strong>Tech Community</strong>: Hear inspiring stories, tips, and career advice from professionals.
              </li>
            </ul>

            <h2>Our Team</h2>
            <p>
              Bargain Hunt is driven by Ansh Pethe, a passionate software developer who aims to bridge the gap between technology and accessibility.
            </p>

            <h2>Contact Us</h2>
            <p>
              Have a question, suggestion, or want to collaborate? We'd love to hear from you! Reach out to us at{" "}
              <a href="mailto:anshpethe110@gmail.com" className="text-purple-400 hover:text-purple-300">
                anshpethe110@gmail.com
              </a>
              .
            </p>
          </div>
        </div>
      </main>

      <footer className="border-t border-gray-800 py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <Link href="/" className="text-xl font-bold tracking-tighter">
                Bargain<span className="text-purple-500">Hunt</span>
              </Link>
              <p className="text-gray-400 text-sm">
                Exploring technology, innovation, and the future of development.
              </p>
              <div className="flex space-x-4">
                <Link href="#" className="text-gray-400 hover:text-white">
                  <Twitter className="h-5 w-5" />
                </Link>
                <Link href="#" className="text-gray-400 hover:text-white">
                  <Github className="h-5 w-5" />
                </Link>
                <Link href="#" className="text-gray-400 hover:text-white">
                  <Linkedin className="h-5 w-5" />
                </Link>
                <Link href="#" className="text-gray-400 hover:text-white">
                  <Rss className="h-5 w-5" />
                </Link>
              </div>
            </div>
            <div>
              <h3 className="font-medium mb-4">Topics</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <Link href="#" className="hover:text-white">
                    Software Development
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Artificial Intelligence
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Emerging Technologies
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Career Tips
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium mb-4">Resources</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <Link href="#" className="hover:text-white">
                    Coding Tutorials
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Tech News
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Tools and Resources
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Open Source Projects
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium mb-4">Contact</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  <span>anshpethe110@gmail.com</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-6 text-sm text-gray-400">
            <p>© {new Date().getFullYear()} Bargain Hunt. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
