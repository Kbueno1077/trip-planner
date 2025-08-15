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
import { useUserContext } from "@/context/UserDetailContext";
import { api } from "@/convex/_generated/api";
import type { Doc, Id } from "@/convex/_generated/dataModel";
import type { TripPlan } from "@/types/trip_details";
import { useQuery } from "convex/react";
import Image from "next/image";
import React from "react";
import { DayActivities } from "@/app/create-new-trip/_components/Itinerary/DayActivities";
import { HotelsSection } from "@/app/create-new-trip/_components/Itinerary/HotelsSection";
import GlobalMap from "@/app/create-new-trip/_components/GlobalMap/GlobalMap";
import { useTripDetailContext } from "@/context/TripDetailContext";

type TripDoc = Omit<Doc<"tripDetails">, "tripDetail" | "uid"> & {
  tripDetail: TripPlan;
  uid: Id<"users">;
};

interface TripViewerProps {
  tripId: string;
}

export function TripViewer({ tripId }: TripViewerProps) {
  const { userDetails } = useUserContext();
  const { setTripDetails } = useTripDetailContext();

  const trips = useQuery(
    api.tripDetails.getTripById,
    userDetails
      ? { userId: userDetails._id, tripId: tripId as Id<"tripDetails"> }
      : "skip",
  ) as TripDoc[] | undefined;

  const trip = trips?.[0];

  React.useEffect(() => {
    if (trip) {
      setTripDetails(trip.tripDetail);
    }
  }, [trip]);

  const isLoading = !userDetails || trips === undefined;

  if (isLoading) {
    return (
      <div className="w-full">
        <div className="relative h-48 md:h-64 w-full overflow-hidden">
          <Skeleton className="absolute inset-0 h-full w-full" />
        </div>
        <div className="max-w-7xl mx-auto py-5 px-4">
          <Skeleton className="h-8 w-96 mb-4" />
          <Skeleton className="h-4 w-64 mb-6" />
          <div className="space-y-8">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="space-y-4">
                <Skeleton className="h-6 w-32" />
                <Skeleton className="h-32 w-full" />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!trip) {
    return (
      <div className="max-w-7xl mx-auto py-20 px-4">
        <Card>
          <CardHeader className="text-center">
            <CardTitle>Trip not found</CardTitle>
            <CardDescription>
              The trip you&apos;re looking for doesn&apos;t exist or you
              don&apos;t have access to it.
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  const tripDetails = trip.tripDetail;

  const data = [
    {
      title: "Hotels",
      content: <HotelsSection hotels={tripDetails.hotels} />,
    },
    ...tripDetails.itinerary.map((dayData) => ({
      title: `Day ${dayData.day}`,
      content: <DayActivities activities={dayData.activities} />,
    })),
  ];

  return (
    <HeroItinerary tripDestination={tripDetails.destination}>
      <div className="lg:grid grid-cols-5 pt-10">
        <div className="w-full lg:col-span-3">
          <Timeline data={data} tripDetails={tripDetails} />
        </div>

        <div className="w-full lg:col-span-2">
          <GlobalMap />
        </div>
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

  return (
    <div className="w-full">
      <div className="relative h-48 md:h-64 w-full overflow-hidden">
        {loading ? (
          <Skeleton className="absolute inset-0 h-full w-full" />
        ) : photoUrl ? (
          <Image
            src={photoUrl}
            alt={`${tripDestination} hero image`}
            fill
            className="object-cover"
            priority={false}
          />
        ) : (
          <div className="absolute inset-0 bg-muted" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent" />
        <div className="absolute bottom-3 left-4 right-4">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-white">
            {tripDestination}
          </h2>
        </div>
      </div>
      {children}
    </div>
  );
}
