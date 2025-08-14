"use client";

import type { Doc } from "@/convex/_generated/dataModel";
import { useUser } from "@clerk/nextjs";
import { createContext, useContext } from "react";

type UserContextValue = {
  user: ReturnType<typeof useUser>["user"];
  userDetails: Doc<"users"> | null;
};

export const UserDetailContext = createContext<UserContextValue | undefined>(
  undefined,
);

export function useUserContext() {
  const context = useContext(UserDetailContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserContextProvider");
  }
  return context;
}
