"use client";

import React, { useState } from "react";
import { Map, X } from "lucide-react";
import GlobalMap from "@/app/create-new-trip/_components/GlobalMap/GlobalMap";
import { Button } from "@/components/ui/button";

function MapPopup() {
  const [isMapOpen, setIsMapOpen] = useState(false);

  const toggleMap = () => {
    setIsMapOpen(!isMapOpen);
  };

  return (
    <>
      {/* Toggle Button */}
      {!isMapOpen && (
        <Button
          onClick={toggleMap}
          className="fixed bottom-6 right-6 z-50 shadow-lg transition-all duration-200 flex items-center gap-2 px-4 py-3 rounded-full"
          size="lg"
        >
          <Map className="w-5 h-5" />
          <span className="font-medium">View Map</span>
        </Button>
      )}

      {/* Right Sidebar Map Panel */}
      <div
        className={`fixed top-[95px] right-2 h-[calc(100vh-105px)] rounded-lg w-[calc(100vw-35px)] lg:w-[800px] bg-white border border-gray-200 shadow-2xl shadow-black/30 z-40 transform transition-transform duration-300 ease-in-out ${
          isMapOpen ? "translate-x-0" : "translate-x-full"
        }`}
        style={{
          boxShadow: isMapOpen
            ? "-20px 0 40px -5px rgba(0, 0, 0, 0.15), -40px 0 80px -10px rgba(0, 0, 0, 0.1), -60px 0 120px -20px rgba(0, 0, 0, 0.05)"
            : "none",
        }}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-200 rounded-t-lg bg-white">
          <h2 className="text-xl font-semibold text-gray-900">Trip Map</h2>
          <Button
            onClick={toggleMap}
            variant="ghost"
            size="sm"
            className="text-gray-500 hover:text-gray-700 transition-colors"
            aria-label="Close map"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>
        <div className="h-full pb-16">
          <GlobalMap style={{ height: "calc(85dvh - 50px)", margin: "20px" }} />
        </div>
      </div>
    </>
  );
}

export default MapPopup;
