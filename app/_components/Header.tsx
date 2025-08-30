"use client";

import { InteractiveHoverButton } from "@/components/magicui/interactive-hover-button";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTripDetailContext } from "@/context/TripDetailContext";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { Menu, X, Plus, MapPin, ChevronDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const menuItems = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Pricing",
    href: "/pricing",
  },
];

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { setTripDetails } = useTripDetailContext();

  return (
    <header className="w-full border-b bg-background/60 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="mx-auto flex max-w-6xl items-center justify-between p-4 md:p-6">
        <div className="flex items-center gap-2">
          <Image src="/logoipsum.svg" alt="logo" width={40} height={40} />
          <h1 className="text-xl font-bold sm:text-2xl tracking-tight">
            Trip Planner
          </h1>
        </div>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 md:flex">
          {menuItems.map((item) => (
            <Link
              href={item.href}
              key={item.label}
              className="text-base font-semibold transition-all duration-300 hover:scale-[1.02] hover:text-primary"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <SignedOut>
            <SignInButton mode="modal">
              <InteractiveHoverButton>Get Started</InteractiveHoverButton>
            </SignInButton>
          </SignedOut>

          <SignedIn>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="gap-1">
                  <MapPin className="h-4 w-4" />
                  Trips
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem asChild>
                  <Link href="/my-trips" className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    My trips
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link
                    href="/create-new-trip"
                    className="flex items-center gap-2"
                    onClick={() => {
                      setTripDetails(null);
                    }}
                  >
                    <Plus className="h-4 w-4" />
                    Create new trip
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <UserButton />
          </SignedIn>
        </div>

        {/* Mobile toggle */}
        <div className="flex items-center gap-3 md:hidden">
          <SignedIn>
            <UserButton />
          </SignedIn>

          <Button
            aria-label="Toggle menu"
            variant="ghost"
            size="icon"
            aria-expanded={isOpen}
            onClick={() => setIsOpen((v) => !v)}
          >
            <Menu
              className={`h-6 w-6 transition-all duration-300 ${
                isOpen
                  ? "rotate-90 opacity-0 scale-75"
                  : "rotate-0 opacity-100 scale-100"
              }`}
            />
            <X
              className={`absolute h-6 w-6 transition-all duration-300 ${
                isOpen
                  ? "rotate-0 opacity-100 scale-100"
                  : "rotate-90 opacity-0 scale-75"
              }`}
            />
          </Button>
        </div>
      </div>

      {/* Mobile panel overlay with enhanced animations */}
      <div
        className={`absolute top-full left-0 rounded-lg right-0 bg-background/95 backdrop-blur-xl border-b shadow-lg transition-all duration-300 ease-out md:hidden z-40 ${
          isOpen
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-4 pointer-events-none"
        }`}
      >
        <div className="mx-auto max-w-6xl p-4">
          <nav>
            {menuItems.map((item, index) => (
              <div
                key={item.label}
                className={`transform transition-all duration-300 ease-out ${
                  isOpen
                    ? "translate-y-0 opacity-100"
                    : "-translate-y-3 opacity-0"
                }`}
                style={{
                  transitionDelay: isOpen ? `${index * 60}ms` : "0ms",
                }}
              >
                <Button
                  variant="ghost"
                  className="justify-start w-full hover:scale-[1.02] hover:bg-accent/80 transition-all duration-200"
                  asChild
                >
                  <Link href={item.href} onClick={() => setIsOpen(false)}>
                    {item.label}
                  </Link>
                </Button>
              </div>
            ))}

            <SignedOut>
              <div
                className={`transform transition-all duration-300 ease-out mt-2 pt-2 border-t ${
                  isOpen
                    ? "translate-y-0 opacity-100"
                    : "-translate-y-3 opacity-0"
                }`}
                style={{
                  transitionDelay: isOpen
                    ? `${menuItems.length * 60}ms`
                    : "0ms",
                }}
              >
                <SignInButton mode="modal">
                  <InteractiveHoverButton className="w-full">
                    Get Started
                  </InteractiveHoverButton>
                </SignInButton>
              </div>
            </SignedOut>

            <SignedIn>
              <div
                className={`border-t pt-2 mt-2 transform transition-all duration-300 ease-out ${
                  isOpen
                    ? "translate-y-0 opacity-100"
                    : "-translate-y-3 opacity-0"
                }`}
                style={{
                  transitionDelay: isOpen
                    ? `${(menuItems.length + 1) * 60}ms`
                    : "0ms",
                }}
              >
                <Button
                  variant="ghost"
                  className="justify-start w-full hover:scale-[1.02] hover:bg-accent/80 transition-all duration-200"
                  asChild
                >
                  <Link
                    href="/my-trips"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-2"
                  >
                    <MapPin className="h-4 w-4" />
                    My trips
                  </Link>
                </Button>
                <Button
                  variant="ghost"
                  className="justify-start w-full hover:scale-[1.02] hover:bg-accent/80 transition-all duration-200"
                  asChild
                >
                  <Link
                    href="/create-new-trip"
                    onClick={() => {
                      setIsOpen(false);
                      setTripDetails(null);
                    }}
                    className="flex items-center gap-2"
                  >
                    <Plus className="h-4 w-4" />
                    Create new trip
                  </Link>
                </Button>
              </div>
            </SignedIn>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;
