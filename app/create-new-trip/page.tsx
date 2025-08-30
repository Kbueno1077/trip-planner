"use client";

import React, { useState } from "react";
import ChatBox from "./_components/Chat/ChatBox";
import { Itinerary } from "./_components/Itinerary/Itinerary";
import GlobalMap from "./_components/GlobalMap/GlobalMap";
import { Globe2, Plane } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

function CreateNewTrip() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 ">
      <div className="lg:col-span-2">
        <ChatBox />
      </div>

      <div className="col-span-3 relative mt-2 lg:mt-0 px-3 lg:px-0">
        {activeIndex === 0 && <Itinerary />}
        {activeIndex === 1 && (
          <Card className="h-[90dvh] flex flex-col">
            <CardHeader className="flex flex-col gap-2 flex-shrink-0">
              <CardTitle>Trip Map</CardTitle>
              <CardDescription>Build your trip, easy and fast.</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 overflow-hidden">
              <GlobalMap />
            </CardContent>
          </Card>
        )}

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
