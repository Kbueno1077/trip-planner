"use client";

import { InteractiveHoverButton } from "@/components/magicui/interactive-hover-button";
import { Button } from "@/components/ui/button";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { Menu, X } from "lucide-react";
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

  return (
    <header className="w-full border-b">
      <div className="mx-auto flex max-w-6xl items-center justify-between p-4 md:p-6">
        <div className="flex items-center gap-2">
          <Image src="/logoipsum.svg" alt="logo" width={40} height={40} />
          <h1 className="text-xl font-bold sm:text-2xl">Trip Planner</h1>
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
            <UserButton />

            <Link href="/create-new-trip">
              <Button>Create New Trip</Button>
            </Link>
          </SignedIn>
        </div>

        {/* Mobile toggle */}
        <div className="flex items-center gap-2 md:hidden">
          <Button
            aria-label="Toggle menu"
            variant="ghost"
            aria-expanded={isOpen}
            onClick={() => setIsOpen((v) => !v)}
            className="inline-flex items-center justify-center rounded-md p-2 outline-none ring-0 "
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>

          <SignedIn>
            <UserButton />

            <Link href="/create-new-trip">
              <Button>Create New Trip</Button>
            </Link>
          </SignedIn>
        </div>
      </div>

      {/* Mobile panel */}
      {isOpen && (
        <div className="mx-auto block max-w-6xl p-4 pt-0 md:hidden">
          <nav className="flex flex-col gap-2 rounded-lg border p-3">
            {menuItems.map((item) => (
              <Link
                href={item.href}
                key={item.label}
                className="rounded-md px-3 py-2 text-base font-medium hover:bg-accent hover:text-accent-foreground"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}

            <SignInButton mode="modal">
              <InteractiveHoverButton className="w-full">
                Get Started
              </InteractiveHoverButton>
            </SignInButton>
          </nav>
        </div>
      )}
    </header>
  );
}

export default Header;
