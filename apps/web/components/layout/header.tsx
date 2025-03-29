"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from 'framer-motion';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeWidth, setActiveWidth] = useState(0);
  const [activeOffset, setActiveOffset] = useState(0);
  const navRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();



  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const isActive = (path: string) => {
    return pathname === path;
  };

  useEffect(() => {
    // Update line position when route changes
    const activeLink = navRef.current?.querySelector('[data-active="true"]');
    if (activeLink) {
      const linkRect = activeLink.getBoundingClientRect();
      const navRect = navRef.current?.getBoundingClientRect();
      setActiveWidth(linkRect.width);
      setActiveOffset(linkRect.left - (navRect?.left || 0));
    }
  }, [pathname]);

  return (
    <header className="border-b border-gray-800 bg-gradient-to-b from-black via-black/100 to-transparent h-16 flex items-center justify-center overflow-x-hidden">
      <div className="@container w-full px-4 mx-2 sm:mx-8 md:mx-12 lg:mx-14 overflow-hidden">
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
                className="cursor-pointer bg-purple-600 text-white hover:border-white hover:text-gray-200 border border-transparent flex items-center gap-2"
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
        <AnimatePresence>
          {isMenuOpen && (
            <motion.nav
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "220px", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="absolute flex justify-end border-x border-b right-0 py-3 mx-2 sm:mx-8 md:mx-12 lg:mx-14 top-16 w-40 bg-transparent backdrop-blur-3xl rounded-b-lg shadow-lg overflow-hidden will-change-[height, opacity]"
            >
              <nav className="flex z-20 flex-col justify-evenly px-6 items-end w-full h-full space-y-4">
                <Link
                  href="/"
                  className={`text-sm font-semibold ${isActive("/") ? "text-purple-500 underline underline-offset-8" : "text-gray-300 hover:text-white"}`}
                  onClick={closeMenu}
                >
                  Home
                </Link>
                <Link
                  href="/compare"
                  className={`text-sm font-semibold ${isActive("/compare") ? "text-purple-500 underline underline-offset-8" : "text-gray-300 hover:text-white"}`}
                  onClick={closeMenu}
                >
                  Compare
                </Link>
                <Link
                  href="/guides"
                  className={`text-sm font-semibold ${isActive("/guides") ? "text-purple-500 underline underline-offset-8" : "text-gray-300 hover:text-white"}`}
                  onClick={closeMenu}
                >
                  Guides
                </Link>
                <Link
                  href="/blog"
                  className={` text-sm font-semibold ${isActive("/blog") ? "text-purple-500 underline underline-offset-8" : "text-gray-300 hover:text-white"}`}
                  onClick={closeMenu}
                >
                  Blog
                </Link>
                <Link href="/search">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="cursor-pointer bg-purple-600 text-white hover:border-white hover:text-gray-200 border border-transparent flex items-center gap-2"
                  >
                    <Search className="h-5 w-5" />
                    <span>Search</span>
                  </Button>
                </Link>
              </nav>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}

export default Header;