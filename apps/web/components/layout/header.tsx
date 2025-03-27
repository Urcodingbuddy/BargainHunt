"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, Search, X } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeWidth, setActiveWidth] = useState(0)
  const [activeOffset, setActiveOffset] = useState(0)
  const navRef = useRef<HTMLDivElement>(null)
  const pathname = usePathname()

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  const isActive = (path: string) => {
    return pathname === path
  }

  useEffect(() => {
    // Update line position when route changes
    const activeLink = navRef.current?.querySelector('[data-active="true"]')
    if (activeLink) {
      const linkRect = activeLink.getBoundingClientRect()
      const navRect = navRef.current?.getBoundingClientRect()
      setActiveWidth(linkRect.width)
      setActiveOffset(linkRect.left - (navRect?.left || 0))
    }
  }, [pathname])

  return (
    <header className="border-b border-gray-800 h-16 flex items-center">
      <div className="@container w-full px-4 mx-5 sm:mx-8 md:mx-12 lg:mx-14">
        <div className="flex items-center justify-between h-full">
          <Link href="/" className="text-xl font-bold">
            Bargain<span className="text-purple-500">Hunt</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:block relative" ref={navRef}>
            <nav className="flex items-center space-x-8">
              <Link
                href="/"
                data-active={isActive("/")}
                className={`text-sm ${isActive("/") ? "text-purple-500" : "text-gray-300 hover:text-white"}`}
              >
                Home
              </Link>
              <Link
                href="/compare"
                data-active={isActive("/compare")}
                className={`text-sm ${isActive("/compare") ? "text-purple-500" : "text-gray-300 hover:text-white"}`}
              >
                Compare
              </Link>
              <Link
                href="/guides"
                data-active={isActive("/guides")}
                className={`text-sm ${isActive("/guides") ? "text-purple-500" : "text-gray-300 hover:text-white"}`}
              >
                Guides
              </Link>
              <Link
                href="/blog"
                data-active={isActive("/blog")}
                className={`text-sm ${isActive("/blog") ? "text-purple-500" : "text-gray-300 hover:text-white"}`}
              >
                Blog
              </Link>

              {/* Animated underline */}
              <div 
                className="absolute -bottom-1 h-0.5 bg-purple-600 transition-all duration-300 ease-in-out"
                style={{
                  width: `${activeWidth}px`,
                  left: `${activeOffset}px`,
                }}
              />
            </nav>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <Link href="/search">
              <Button
                variant="ghost"
                size="sm"
                className="bg-purple-600 text-white hover:border-white hover:text-gray-200 border border-transparent flex items-center gap-2"
              >
                <Search className="h-5 w-5" />
                <span>Search</span>
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden text-gray-300 hover:text-white" onClick={toggleMenu} aria-label="Toggle menu">
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4">
            <nav className="flex flex-col space-y-4">
              <Link
                href="/"
                className={`text-sm ${isActive("/") ? "text-purple-500" : "text-gray-300 hover:text-white"}`}
                onClick={closeMenu}
              >
                Home
              </Link>
              <Link
                href="/compare"
                className={`text-sm ${isActive("/compare") ? "text-purple-500" : "text-gray-300 hover:text-white"}`}
                onClick={closeMenu}
              >
                Compare
              </Link>
              <Link
                href="/guides"
                className={`text-sm ${isActive("/guides") ? "text-purple-500" : "text-gray-300 hover:text-white"}`}
                onClick={closeMenu}
              >
                Guides
              </Link>
              <Link
                href="/blog"
                className={`text-sm ${isActive("/blog") ? "text-purple-500" : "text-gray-300 hover:text-white"}`}
                onClick={closeMenu}
              >
                Blog
              </Link>
              <Link
                href="/search"
                className="text-sm text-gray-300 hover:text-white flex items-center gap-2"
                onClick={closeMenu}
              >
                <Search className="h-4 w-4" />
                Search
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header