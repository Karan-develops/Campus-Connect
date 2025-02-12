"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, ChevronDown, UserIcon } from "lucide-react";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { SignInButton } from "@clerk/nextjs";
import { Button } from "./ui/button";

interface NavbarProps {
  user: {
    id?: string;
    username?: string | null;
    firstName?: string | null;
    lastName?: string | null;
    imageUrl?: string;
    email?: string;
  } | null;
}

const navItems = [
  { name: "Home", href: "/" },
  { name: "Academics", href: "/academics" },
  { name: "Placements", href: "/placements" },
  { name: "Admissions", href: "/admissions" },
  { name: "Peers", href: "/peers" },
  { name: "Contact Us", href: "/contact" },
  {
    name: "Campus Life",
    href: "#",
    subItems: [
      { name: "Student Clubs", href: "/campus-life/clubs" },
      { name: "Sports", href: "/campus-life/sports" },
      { name: "Events", href: "/campus-life/events" },
      { name: "Organize", href: "/campus-life/create" },
    ],
  },
];

const Navbar: React.FC<NavbarProps> = ({ user }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const getProfileLink = () => {
    if (user && user.username) {
      return `/profile/${user.username}`;
    }
    return "/profile";
  };

  return (
    <nav className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-1">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0">
              <span className="text-xl font-bold">Campus Diary</span>
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navItems.map((item) => (
                <div key={item.name} className="relative group">
                  {item.subItems ? (
                    <Menubar className="bg-transparent border-none">
                      <MenubarMenu>
                        <MenubarTrigger className="p-2 rounded-lg text-md text-green-500 font-medium hover:bg-gray-700 focus:bg-gray-700 focus:outline-none flex items-center hover:cursor-pointer">
                          {item.name}
                          <ChevronDown className="ml-1 h-4 w-4" />
                        </MenubarTrigger>
                        <MenubarContent className="bg-gray-800 text-white">
                          {item.subItems.map((subItem) => (
                            <MenubarItem
                              key={subItem.name}
                              className="focus:bg-gray-700"
                            >
                              <Link
                                href={subItem.href}
                                className="block px-4 py-2 text-sm"
                              >
                                {subItem.name}
                              </Link>
                            </MenubarItem>
                          ))}
                        </MenubarContent>
                      </MenubarMenu>
                    </Menubar>
                  ) : (
                    <Link
                      href={item.href}
                      className="px-3 py-2 rounded-md text-md font-semibold hover:bg-gray-700"
                    >
                      {item.name}
                    </Link>
                  )}
                </div>
              ))}
              {user ? (
                <>
                  <Button className="flex items-center gap-2" asChild>
                    <Link href={getProfileLink()}>
                      <UserIcon className="w-4 h-4" />
                      <span className="hidden lg:inline">Profile</span>
                    </Link>
                  </Button>
                  {/* <UserButton afterSignOutUrl="/" /> */}
                </>
              ) : (
                <SignInButton mode="modal">
                  <Button variant="default">Sign In</Button>
                </SignInButton>
              )}
            </div>
          </div>
          <div className="md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            >
              <span className="sr-only">Open main menu</span>
              {isMobileMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <div key={item.name}>
                {item.subItems ? (
                  <Menubar className="bg-transparent border-none w-full">
                    <MenubarMenu>
                      <MenubarTrigger className="px-3 py-2 rounded-md text-base font-medium text-white hover:bg-gray-700 w-full text-left flex items-center justify-between">
                        {item.name}
                        <ChevronDown className="h-4 w-4" />
                      </MenubarTrigger>
                      <MenubarContent className="bg-gray-800 text-white">
                        {item.subItems.map((subItem) => (
                          <MenubarItem
                            key={subItem.name}
                            className="focus:bg-gray-700"
                          >
                            <Link
                              href={subItem.href}
                              className="block px-4 py-2 text-sm"
                            >
                              {subItem.name}
                            </Link>
                          </MenubarItem>
                        ))}
                      </MenubarContent>
                    </MenubarMenu>
                  </Menubar>
                ) : (
                  <Link
                    href={item.href}
                    className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-gray-700"
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
            {user && (
              <Link
                href={getProfileLink()}
                className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-gray-700"
              >
                Profile
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
