"use client";

import { TripDetailContext } from "@/context/TripDetailContext";
import { UserDetailContext } from "@/context/UserDetailContext";
import { api } from "@/convex/_generated/api";
import type { Doc } from "@/convex/_generated/dataModel";
import type { CreateUserArgs } from "@/convex/validators";
import { TripPlan } from "@/types/trip_details";
import { useUser } from "@clerk/nextjs";
import { useMutation } from "convex/react";
import React, { useEffect, useState } from "react";
import Header from "./_components/Header";

function Provider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user } = useUser();
  const [userDetails, setUserDetails] = useState<Doc<"users"> | null>(null);

  const [tripDetails, setTripDetails] = useState<TripPlan | null>(null);
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
      <TripDetailContext.Provider value={{ tripDetails, setTripDetails }}>
        <Header />

        {children}
      </TripDetailContext.Provider>
    </UserDetailContext.Provider>
  );
}

export default Provider;
