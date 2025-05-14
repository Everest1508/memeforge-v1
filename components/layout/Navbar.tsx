"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { useSession, signIn, signOut } from "next-auth/react";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAvatarMenuOpen, setIsAvatarMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const { data: session } = useSession();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
    setIsAvatarMenuOpen(false);
  }, [pathname]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    if (isAvatarMenuOpen) setIsAvatarMenuOpen(false);
  };

  const toggleAvatarMenu = () => {
    setIsAvatarMenuOpen(!isAvatarMenuOpen);
    if (isMenuOpen) setIsMenuOpen(false);
  };

  return (
    <nav
      className={cn(
        "fixed top-0 z-50 w-full transition-all duration-300",
        isScrolled ? "bg-black/80 backdrop-blur-md py-2" : "bg-black/60 py-4"
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold flex items-center">
            <img src="/images/logo1.png" alt="MemeForge Logo" className="w-14 h-14 mr-2 -mt-3" />
            <span className="text-white drop-shadow-[2px_2px_0px_#000]">MemeForge</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8 -ml-20">
            <NavLink href="/meme-creator" active={pathname === "/meme-creator"}>
              Memelab
            </NavLink>
            <NavLink href="/roadmap" active={pathname === "/roadmap"}>
              Roadmap
            </NavLink>
            <NavLink href="/featured" active={pathname === "/featured"}>
              Featured
            </NavLink>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-white hover:text-red-400 transition-colors"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Desktop Avatar */}
          <div
            className="hidden md:flex flex-col items-center space-y-1 relative cursor-pointer"
            onClick={toggleAvatarMenu}
          >
            <div className="w-10 h-10 rounded-full overflow-hidden">
              {session?.user?.image ? (
                <img
                  src={session.user.image}
                  alt="User Avatar"
                  className="w-full h-full object-cover"
                />
              ) : (
                <img src="/iconx/avatar.png" alt="User Avatar" className="w-full h-full object-contain" />
              )}
            </div>
            <span className="text-white text-sm font-[Melon]">Dashboard</span>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden overflow-hidden"
            >
              <div className="flex flex-col space-y-4 py-4">
                <MobileNavLink href="/meme-creator" onClick={toggleMenu}>
                  Memelab
                </MobileNavLink>
                <MobileNavLink href="/roadmap" onClick={toggleMenu}>
                  Roadmap
                </MobileNavLink>
                <MobileNavLink href="/featured" onClick={toggleMenu}>
                  Featured
                </MobileNavLink>
                {session ? (
                  <MobileNavLink href="#" onClick={() => signOut()}>
                    Logout
                  </MobileNavLink>
                ) : (
                  <MobileNavLink href="#" onClick={() => signIn('twitter')}>
                    Login
                  </MobileNavLink>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Avatar Menu */}
        <AnimatePresence>
          {isAvatarMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute right-4 top-16 bg-black/90 backdrop-blur-md rounded-lg p-4 w-48 shadow-lg"
            >
              <div className="flex flex-col space-y-2">
                {session ? (
                  <MobileNavLink href="#" onClick={() => signOut()}>
                    Logout
                  </MobileNavLink>
                ) : (
                  <MobileNavLink href="#" onClick={() => signIn('twitter')}>
                    Login
                  </MobileNavLink>
                )}
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
        "relative font-medium group px-3 py-2 transition-all duration-300",
        active ? "text-red-400" : "text-white hover:text-red-400"
      )}
    >
      {children}
      <span
        className={cn(
          "absolute left-0 -bottom-1 w-full h-0.5 bg-red-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300",
          active && "scale-x-100"
        )}
      />
    </Link>
  );
};

// Mobile NavLink
const MobileNavLink = ({
  href,
  onClick,
  children,
}: {
  href: string;
  onClick: () => void;
  children: React.ReactNode;
}) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="w-full"
    >
      <Link
        href={href}
        onClick={onClick}
        className="block w-full py-2 px-4 rounded-md bg-black/20 hover:bg-red-700/20 text-white transition-colors duration-200"
      >
        {children}
      </Link>
    </motion.div>
  );
};

export default Navbar;
