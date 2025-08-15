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
  {
    label: "Contact us",
    href: "/contact",
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
        <div className="flex items-center gap-2 md:hidden">
          <Button
            aria-label="Toggle menu"
            variant="ghost"
            aria-expanded={isOpen}
            onClick={() => setIsOpen((v) => !v)}
            className="inline-flex items-center justify-center rounded-md p-2"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>

          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </div>

      {/* Mobile panel */}
      {isOpen && (
        <div className="mx-auto block max-w-6xl p-4 pt-0 md:hidden">
          <nav className="flex flex-col gap-2 rounded-lg border p-3 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            {menuItems.map((item) => (
              <Button
                key={item.label}
                variant="ghost"
                className="justify-start"
                asChild
              >
                <Link href={item.href} onClick={() => setIsOpen(false)}>
                  {item.label}
                </Link>
              </Button>
            ))}

            <SignedOut>
              <SignInButton mode="modal">
                <InteractiveHoverButton className="w-full">
                  Get Started
                </InteractiveHoverButton>
              </SignInButton>
            </SignedOut>

            <SignedIn>
              <div className="border-t pt-2 mt-2">
                <Button
                  variant="ghost"
                  className="justify-start w-full"
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
                  className="justify-start w-full"
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
      )}
    </header>
  );
}

export default Header;
