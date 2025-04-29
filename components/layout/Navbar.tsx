"use client";

import { useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { useSession, signIn, signOut } from "next-auth/react"; // Import NextAuth.js session hook

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAvatarMenuOpen, setIsAvatarMenuOpen] = useState(false);
  const pathname = usePathname();

  const { data: session } = useSession(); // Fetch session data

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleAvatarMenu = () => {
    setIsAvatarMenuOpen(!isAvatarMenuOpen);
  };

  return (
    <nav className="text-white bg-black/60 py-4 fixed top-0 z-50 shadow-md w-full pt-8 font-[SpaceComic] z-40">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold flex items-center">
            <img src="/images/logo1.png" alt="MemeForge Logo" className="w-10 h-10 mr-2" />
            <span>MemeForge</span>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex space-x-8">
            <NavLink href="/meme-creator" active={pathname === "/meme-creator"}>
              Memelab
            </NavLink>
            <NavLink href="/roadmap" active={pathname === "/roadmap"}>
              Roadmap
            </NavLink>
            <NavLink href="/team" active={pathname === "/team"}>
              Team
            </NavLink>
            <NavLink href="/marketplace" active={pathname === "/marketplace"}>
              Marketplace
            </NavLink>
            <NavLink href="/mint-pad" active={pathname === "/mint-pad"}>
              Mintpad
            </NavLink>
            <NavLink href="/leaderbaord" active={pathname === "/leaderboard"}>
              Leaderboard
            </NavLink>
          </div>

          {/* Mobile Avatar Button */}
          <div
            className="md:hidden relative w-10 h-10 rounded-full overflow-hidden cursor-pointer"
            onClick={toggleAvatarMenu}
          >
            {session && session.user?.image ? (
              <img
                src={session.user.image}
                alt="User Avatar"
                className="w-full h-full object-contain rounded-full"
              />
            ) : (
              <img src="/iconx/avatar.png" alt="User Avatar" className="w-full h-full object-contain" />
            )}
          </div>

          {/* Desktop Avatar Button with User Name */}
          <div
            className="hidden md:flex items-center space-x-2 relative w-10 h-10 rounded-full overflow-hidden cursor-pointer"
            onClick={toggleAvatarMenu}
          >
            {session && session.user?.image ? (
              <img
                src={session.user.image}
                alt="User Avatar"
                className="w-10 h-10 object-contain rounded-full"
              />
            ) : (
              <img src="/iconx/avatar.png" alt="User Avatar" className="w-10 h-10 object-contain" />
            )}
            {session?.user?.name && (
              <span className="text-white font-medium">{session.user.name}</span> // Display user name next to avatar
            )}
          </div>
        </div>

        {/* Avatar Pop-up Menu for Mobile (Menu appears when avatar clicked) */}
        <AnimatePresence>
          {isAvatarMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden absolute top-14 right-4 bg-black/70 rounded-md p-4 w-48"
            >
              <div className="flex flex-col space-y-2">
                <MobileNavLink href="/meme-creator" onClick={toggleAvatarMenu}>
                  Memelab
                </MobileNavLink>
                <MobileNavLink href="/roadmap" onClick={toggleAvatarMenu}>
                  Roadmap
                </MobileNavLink>
                <MobileNavLink href="/team" onClick={toggleAvatarMenu}>
                  Team
                </MobileNavLink>
                <MobileNavLink href="/marketplace" onClick={toggleAvatarMenu}>
                  Marketplace
                </MobileNavLink>
                <MobileNavLink href="/mint-pad" onClick={toggleAvatarMenu}>
                  Mintpad
                </MobileNavLink>
                <MobileNavLink href="/leaderboard" onClick={toggleAvatarMenu}>
                  Leaderboard
                </MobileNavLink>

                {/* Login/Logout for Mobile */}
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

        {/* Avatar Pop-up Menu for Desktop (Only Login/Logout options visible) */}
        <AnimatePresence>
          {isAvatarMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="hidden md:block absolute top-14 right-4 bg-black/70 rounded-md p-4 w-48"
            >
              <div className="flex flex-col space-y-2">
                {/* Login/Logout for Desktop */}
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

        {/* Mobile Navigation (Hamburger Menu) */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden overflow-hidden mt-4"
            >
              <div className="flex flex-col space-y-4 py-2">
                <MobileNavLink href="/meme-creator" onClick={toggleMenu}>
                  Memelab
                </MobileNavLink>
                <MobileNavLink href="/roadmap" onClick={toggleMenu}>
                  Roadmap
                </MobileNavLink>
                <MobileNavLink href="/team" onClick={toggleMenu}>
                  Team
                </MobileNavLink>

                {/* Login/Logout for Mobile */}
                {session ? (
                  <MobileNavLink href="#" onClick={() => signOut()}>
                    Logout
                  </MobileNavLink>
                ) : (
                  <MobileNavLink href="#" onClick={() => signIn()}>
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
        "relative font-medium group px-3 py-2 transition-transform hover:scale-105",
        active && "text-red-400"
      )}
    >
      {children}
      <span
        className={cn(
          "absolute left-0 -bottom-1 w-full h-0.5 bg-red-400 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300",
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
    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
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
