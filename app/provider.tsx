"use client";

import { api } from "@/convex/_generated/api";
import type { Doc } from "@/convex/_generated/dataModel";
import type { CreateUserArgs } from "@/convex/validators";
import { useUser } from "@clerk/nextjs";
import { useMutation } from "convex/react";
import React, { createContext, useContext, useEffect, useState } from "react";
import Header from "./_components/Header";

type UserContextValue = {
  user: ReturnType<typeof useUser>["user"];
  userDetails: Doc<"users"> | null;
};

const UserDetailContext = createContext<UserContextValue | undefined>(
  undefined,
);

export function useUserContext() {
  const context = useContext(UserDetailContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserContextProvider");
  }
  return context;
}

function Provider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user } = useUser();
  const [userDetails, setUserDetails] = useState<Doc<"users"> | null>(null);
  const createUserMutation = useMutation(api.user.createNewUser);

  const createNewUser = async () => {
    if (user) {
      const payload: CreateUserArgs = {
        clerkId: user?.id || "",
        name: user?.fullName || "",
        imageUrl: user?.imageUrl || "",
        email: user?.primaryEmailAddress?.emailAddress || "",
        subscription: "free",
        credits: 30,
      };
      const newUser = await createUserMutation(payload);
      setUserDetails(newUser);
    }
  };

  useEffect(() => {
    createNewUser();
  }, [user]);

  return (
    <UserDetailContext.Provider value={{ user, userDetails }}>
      <Header />

      {children}
    </UserDetailContext.Provider>
  );
}

export default Provider;
