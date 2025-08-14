import React from "react";
import ChatBox from "./_components/ChatBox";
import { Itinerary } from "./_components/Itinerary/Itinerary";

function CreateNewTrip() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
      <div className="">
        <ChatBox />
      </div>

      <div className="col-span-2">
        <Itinerary />
      </div>

      {/* <div>Map</div> */}
    </div>
  );
}

export default CreateNewTrip;
