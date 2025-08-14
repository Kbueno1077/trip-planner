import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { placeName } = await request.json();

  const BASE_URL = "https://places.googleapis.com/v1/places:searchText";

  const headers = {
    "Content-Type": "application/json",
    "X-Goog-Api-Key": process.env.GOOGLE_MAPS_API_KEY,
    "X-Goog-FieldMask":
      "places.photos,places.displayName,places.id,places.formattedAddress",
  };

  try {
    const result = await axios.post(
      BASE_URL,
      {
        textQuery: placeName,
        maxResultCount: 5,
      },
      { headers },
    );

    const placeRefName = result.data.places[0]?.photos[0]?.name;
    const PHOTO_URL = `https://places.googleapis.com/v1/${placeRefName}/media?maxHeightPx=1000&maxWidthPx=1000&key=${process.env.GOOGLE_MAPS_API_KEY}`;

    return NextResponse.json({
      photo: PHOTO_URL,
    });
  } catch (error) {
    console.error("🚀 ~ POST ~ error:", error);
    return NextResponse.json(
      { error: "Failed to fetch place details" },
      { status: 500 },
    );
  }
}
