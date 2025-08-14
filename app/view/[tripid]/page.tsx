import React from "react";
import { TripViewer } from "./_components/TripViewer";

interface PageProps {
  params: Promise<{ tripid: string }>;
}

async function ViewTripPage({ params }: PageProps) {
  const { tripid } = await params;

  return <TripViewer tripId={tripid} />;
}

export default ViewTripPage;
