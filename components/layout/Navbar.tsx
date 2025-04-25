"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="text-white bg-black/60 py-4 fixed top-0 z-50 shadow-md w-full pt-8 font-[SpaceComic]">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold flex items-center">
            <img src="/images/logo1.png" alt="MemeForge Logo" className="w-10 h-10 mr-2" />
            <span>MemeForge</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            <NavLink href="/meme-creator" active={pathname === "/meme-creator"}>Memelab</NavLink>
            <NavLink href="/roadmap" active={pathname === "/roadmap"}>Roadmap</NavLink>
            <NavLink href="/team" active={pathname === "/team"}>Team</NavLink>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-white focus:outline-none"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden overflow-hidden mt-4"
            >
              <div className="flex flex-col space-y-4 py-2">
                <MobileNavLink href="/meme-creator" onClick={toggleMenu}>Memelab</MobileNavLink>
                <MobileNavLink href="/roadmap" onClick={toggleMenu}>Roadmap</MobileNavLink>
                <MobileNavLink href="/team" onClick={toggleMenu}>Team</MobileNavLink>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

// Desktop NavLink
const NavLink = ({ href, children, active }: { href: string; children: React.ReactNode; active: boolean }) => {
  return (
    <Link 
      href={href} 
      className={cn(
        "relative font-medium group px-3 py-2 transition-transform hover:scale-105",
        active && "text-red-400"
      )}
    >
      {children}
      <span className={cn(
        "absolute left-0 -bottom-1 w-full h-0.5 bg-red-400 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300",
        active && "scale-x-100"
      )} />
    </Link>
  );
};

// Mobile NavLink
const MobileNavLink = ({ 
  href, 
  onClick, 
  children 
}: { 
  href: string; 
  onClick: () => void; 
  children: React.ReactNode 
}) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.97 }}
    >
      <Link 
        href={href} 
        onClick={onClick}
        className="block py-2 px-4 rounded-md bg-black/20 hover:bg-red-700 transition-colors duration-200"
      >
        {children}
      </Link>
    </motion.div>
  );
};

export default Navbar;
