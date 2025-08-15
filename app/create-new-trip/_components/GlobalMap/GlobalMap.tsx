"use client";

import { useTripDetailContext } from "@/context/TripDetailContext";
import mapboxgl from "mapbox-gl"; //
import "mapbox-gl/dist/mapbox-gl.css";
import { useEffect, useRef } from "react";

function GlobalMap() {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const { tripDetails } = useTripDetailContext();

  useEffect(() => {
    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

    const map = new mapboxgl.Map({
      container: mapContainerRef.current ?? "",
      style: "mapbox://styles/mapbox/streets-v12", // style URL
      center: [-74.5, 40], // starting position [lng, lat]
      zoom: 1.7, // starting zoom
      projection: "globe",
    });

    const markers: mapboxgl.Marker[] = [];

    if (tripDetails?.itinerary) {
      tripDetails?.itinerary.forEach((day) => {
        day.activities.forEach((activity) => {
          if (
            activity.place_geo_coordinates.longitude &&
            activity.place_geo_coordinates.latitude
          ) {
            const marker = new mapboxgl.Marker({ color: "red" })
              .setLngLat([
                activity.place_geo_coordinates.longitude,
                activity.place_geo_coordinates.latitude,
              ])
              .setPopup(
                new mapboxgl.Popup({ offset: 25 }).setText(activity.place_name),
              )
              .addTo(map);
            markers.push(marker);
          }
        });
      });

      map.flyTo({
        center: [
          tripDetails?.itinerary[0].activities[0].place_geo_coordinates
            .longitude,
          tripDetails?.itinerary[0].activities[0].place_geo_coordinates
            .latitude,
        ],
        zoom: 7,
        essential: true,
      });
    }

    return () => {
      markers.forEach((marker) => marker.remove());
    };
  }, [tripDetails]);

  return (
    <div>
      <div
        id="map"
        ref={mapContainerRef}
        style={{ height: "85dvh", borderRadius: "20px", margin: "20px" }}
      ></div>
    </div>
  );
}

export default GlobalMap;
