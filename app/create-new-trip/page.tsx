import React from "react";
import ChatBox from "./_components/Chat/ChatBox";
import { Itinerary } from "./_components/Itinerary/Itinerary";

function CreateNewTrip() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 ">
      <div className="lg:col-span-2 ">
        <ChatBox />
      </div>

      <div className="col-span-3">
        <Itinerary />
      </div>

      {/* <div>Map</div> */}
    </div>
  );
}

export default CreateNewTrip;
