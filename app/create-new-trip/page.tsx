"use client";

import React, { useState } from "react";
import ChatBox from "./_components/Chat/ChatBox";
import { Itinerary } from "./_components/Itinerary/Itinerary";
import GlobalMap from "./_components/GlobalMap/GlobalMap";
import { Globe2, Plane } from "lucide-react";
import { Button } from "@/components/ui/button";

function CreateNewTrip() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 ">
      <div className="lg:col-span-2">
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
          className={`absolute h-[60px] w-[50px] top-0 right-[40px] rounded-t-none border-t-0 border-primary/50 z-[100]`}
        >
          {activeIndex === 0 ? <Globe2 /> : <Plane />}
        </Button>
      </div>
    </div>
  );
}

export default CreateNewTrip;
