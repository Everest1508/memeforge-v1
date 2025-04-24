"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-red-600 text-white py-4 sticky top-0 z-50 shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold flex items-center">
            <span className="mr-2">🔥</span>
            <span>MemeForge</span>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            <NavLink href="/meme-creator">Meme Lab</NavLink>
            <NavLink href="/roadmap">Roadmap</NavLink>
            <NavLink href="/team">Team</NavLink>
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
        <div 
          className={cn(
            "md:hidden overflow-hidden transition-all duration-300 ease-in-out",
            isMenuOpen ? "max-h-56 mt-4" : "max-h-0"
          )}
        >
          <div className="flex flex-col space-y-4 py-2">
            <MobileNavLink href="/meme-creator" onClick={toggleMenu}>Meme Lab</MobileNavLink>
            <MobileNavLink href="/roadmap" onClick={toggleMenu}>Roadmap</MobileNavLink>
            <MobileNavLink href="/team" onClick={toggleMenu}>Team</MobileNavLink>
          </div>
        </div>
      </div>
    </nav>
  );
};

const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => {
  return (
    <Link 
      href={href} 
      className="font-medium hover:text-red-200 transition-colors duration-200 px-3 py-2"
    >
      {children}
    </Link>
  );
};

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
    <Link 
      href={href} 
      onClick={onClick}
      className="block py-2 px-4 hover:bg-red-700 rounded transition-colors duration-200"
    >
      {children}
    </Link>
  );
};

export default Navbar;