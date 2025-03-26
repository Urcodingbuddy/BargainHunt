import Link from "next/link"
import { Github, Linkedin, Twitter } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t border-gray-800 py-8">
      <div className="@container mx-15 px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">BargainHunt</h3>
            <p className="text-sm text-gray-400">
              Compare prices across Amazon and Flipkart to find the best deals on your favorite products.
            </p>
          </div>
          <div>
            <h4 className="font-medium mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link href="/" className="hover:text-white">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/compare" className="hover:text-white">
                  Compare Prices
                </Link>
              </li>
              <li>
                <Link href="/guides" className="hover:text-white">
                  Guides
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-white">
                  Blog
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-4">Resources</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link href="/about" className="hover:text-white">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-white">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-white">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-1">
            <h4 className="font-medium">Contact Developer</h4>
            <p>
              <Link href="mailto:anshpethe110@gmail.com" className="hover:text-white">
                anshpethe110@gmail.com
              </Link>
            </p>
            <div className="flex space-x-4 text-gray-400">
              <Link href="https://github.com/Urcodingbuddy" className="hover:text-white">
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </Link>
              <Link href="https://x.com/PetheAnsh" className="hover:text-white">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="https://www.linkedin.com/in/petheansh/" className="hover:text-white">
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-6 pt-6 border-t border-gray-800 text-center text-sm text-gray-500">
        <p>© {new Date().getFullYear()} BargainHunt. All rights reserved.</p>
      </div>
    </footer>
  )
}

