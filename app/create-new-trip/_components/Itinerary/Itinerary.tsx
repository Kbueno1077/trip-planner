"use client";

import { Timeline } from "@/components/ui/timeline";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useTripDetailContext } from "@/context/TripDetailContext";
import { DayActivities } from "./DayActivities";
import { HotelsSection } from "./HotelsSection";
import Image from "next/image";
import React from "react";

export function Itinerary() {
  const { tripDetails } = useTripDetailContext();

  if (!tripDetails) {
    return (
      <Card className="h-[90dvh]">
        <CardHeader>
          <CardTitle>Get your trip ready</CardTitle>
          <CardDescription>Build your trip, easy and fast.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-2xl overflow-hidden">
            <img
              src="/trip2.jpg"
              alt="Trip illustration"
              className="w-full h-full object-cover"
            />
          </div>
        </CardContent>
      </Card>
    );
  }

  const data = [
    {
      title: "Hotels",
      content: <HotelsSection hotels={tripDetails.hotels} />,
    },

    ...tripDetails.itinerary.map((dayData) => {
      return {
        title: `Day ${dayData.day}`,
        content: <DayActivities activities={dayData.activities} />,
      };
    }),
  ];

  return (
    <HeroItinerary tripDestination={tripDetails.destination}>
      <div className="relative w-full h-[90dvh] overflow-auto pt-5 ">
        <Timeline data={data} tripDetails={tripDetails} />
      </div>
    </HeroItinerary>
  );
}

function HeroItinerary({
  tripDestination,

  children,
}: {
  tripDestination: string;

  children: React.ReactNode;
}) {
  const [photoUrl, setPhotoUrl] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState<boolean>(true);

  React.useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    async function run() {
      try {
        setLoading(true);
        const res = await fetch("/api/google-place-details", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ placeName: tripDestination }),
          signal: controller.signal,
        });
        if (!res.ok) return;
        const data = (await res.json()) as { photo?: string };
        if (isMounted) setPhotoUrl(data.photo ?? null);
      } catch {
        if (isMounted) setPhotoUrl(null);
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    if (tripDestination) run();
    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [tripDestination]);

  return <div className="w-full">{children}</div>;
}
