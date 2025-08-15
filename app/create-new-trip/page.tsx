"use client";

import React, { useState } from "react";
import ChatBox from "./_components/Chat/ChatBox";
import { Itinerary } from "./_components/Itinerary/Itinerary";
import GlobalMap from "./_components/GlobalMap/GlobalMap";
import { Globe2, Plane } from "lucide-react";
import { Button } from "@/components/ui/button";

function CreateNewTrip() {
  const [activeIndex, setActiveIndex] = useState(1);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 ">
      <div className="lg:col-span-2 ">
        <ChatBox />
      </div>

      <div className="col-span-3 relative">
        {activeIndex === 0 && <Itinerary />}
        {activeIndex === 1 && <GlobalMap />}

        <Button
          size={"icon"}
          variant={"outline"}
          onClick={() => {
            setActiveIndex(activeIndex === 0 ? 1 : 0);
          }}
          className={`absolute ${
            activeIndex === 0 ? "top-22 right-7" : "top-8 right-8"
          } z-10`}
        >
          {activeIndex === 0 ? <Globe2 /> : <Plane />}
        </Button>
      </div>

      {/* <div>Map</div> */}
    </div>
  );
}

export default CreateNewTrip;
