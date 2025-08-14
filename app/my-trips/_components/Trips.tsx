"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useTripDetailContext } from "@/context/TripDetailContext";
import { useUserContext } from "@/context/UserDetailContext";
import { api } from "@/convex/_generated/api";
import type { Doc, Id } from "@/convex/_generated/dataModel";
import type { TripPlan } from "@/types/trip_details";
import { useQuery } from "convex/react";
import { Calendar, DollarSign, Users } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";

type TripDoc = Omit<Doc<"tripDetails">, "tripDetail" | "uid"> & {
  tripDetail: TripPlan;
  uid: Id<"users">;
};

function Trips() {
  const router = useRouter();
  const { userDetails } = useUserContext();
  const { setTripDetails } = useTripDetailContext();

  const trips = useQuery(
    api.tripDetails.getUserTrips,
    userDetails ? { userId: userDetails._id } : "skip",
  ) as TripDoc[] | undefined;

  const isLoading = !userDetails || trips === undefined;

  const sortedTrips = useMemo(() => {
    if (!trips) return [] as TripDoc[];
    return trips;
  }, [trips]);

  const [photoByDestination, setPhotoByDestination] = useState<
    Record<string, string>
  >({});
  const isFetchingRef = useRef<Record<string, boolean>>({});

  useEffect(() => {
    const controller = new AbortController();

    async function fetchPhotoForDestination(destination: string) {
      try {
        isFetchingRef.current[destination] = true;
        const res = await fetch("/api/google-place-details", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ placeName: destination }),
          signal: controller.signal,
        });
        if (!res.ok) return;
        const data = (await res.json()) as { photo?: string };
        if (data?.photo) {
          setPhotoByDestination((prev) => ({
            ...prev,
            [destination]: data.photo!,
          }));
        }
      } catch {
        // ignore error
      } finally {
        isFetchingRef.current[destination] = false;
      }
    }

    sortedTrips.forEach((t) => {
      const dest = t.tripDetail?.destination;
      if (!dest) return;
      if (photoByDestination[dest]) return;
      if (isFetchingRef.current[dest]) return;
      fetchPhotoForDestination(dest);
    });

    return () => controller.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortedTrips]);

  const handleOpenTrip = (trip: TripDoc) => {
    router.push(`/view/${trip._id}`);
  };

  const handleCreateNewTrip = () => {
    setTripDetails(null);
    router.push("/create-new-trip");
  };

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <Card key={i}>
            <CardHeader>
              <Skeleton className="h-5 w-3/5" />
              <Skeleton className="h-4 w-2/5" />
            </CardHeader>
            <CardContent className="space-y-3">
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-6 w-4/5" />
            </CardContent>
            <CardFooter>
              <Skeleton className="h-9 w-24" />
            </CardFooter>
          </Card>
        ))}
      </div>
    );
  }

  if (!sortedTrips.length) {
    return (
      <Card>
        <CardHeader className="text-center">
          <CardTitle>No trips yet</CardTitle>
          <CardDescription>
            Start planning your next adventure by creating a new trip.
          </CardDescription>
        </CardHeader>
        <CardFooter className="justify-center">
          <Button onClick={handleCreateNewTrip}>Create your first trip</Button>
        </CardFooter>
      </Card>
    );
  }

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sortedTrips.map((trip) => {
          const plan = trip.tripDetail;
          const destination = plan?.destination ?? "Unknown";
          const origin = plan?.origin ?? "";
          const duration = plan?.duration ?? "";
          const groupSize = plan?.group_size ?? "";
          const budget = plan?.budget ?? "";

          const photoUrl = destination
            ? photoByDestination[destination]
            : undefined;

          return (
            <Card
              key={trip._id}
              className="cursor-pointer transition hover:shadow-md p-2"
              onClick={() => handleOpenTrip(trip)}
            >
              <div className="relative h-36 w-full overflow-hidden rounded-xl">
                {photoUrl ? (
                  <Image
                    src={photoUrl}
                    alt={`${destination} photo`}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover"
                    priority={false}
                  />
                ) : (
                  <Skeleton className="h-full w-full" />
                )}
              </div>
              <CardHeader>
                <CardTitle className="line-clamp-1">{destination}</CardTitle>
                <CardDescription className="line-clamp-1">
                  {origin ? `From ${origin}` : ""}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-2">
                {duration && (
                  <Badge variant="secondary" className="inline-flex gap-1">
                    <Calendar className="h-3.5 w-3.5" /> {duration}
                  </Badge>
                )}
                {groupSize && (
                  <Badge variant="secondary" className="inline-flex gap-1">
                    <Users className="h-3.5 w-3.5" /> {groupSize}
                  </Badge>
                )}
                {budget && (
                  <Badge variant="secondary" className="inline-flex gap-1">
                    <DollarSign className="h-3.5 w-3.5" /> {budget}
                  </Badge>
                )}
              </CardContent>
              <CardFooter>
                <Button
                  variant="secondary"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleOpenTrip(trip);
                  }}
                >
                  Open
                </Button>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

export default Trips;
