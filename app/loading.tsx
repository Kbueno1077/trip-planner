import { Ripple } from "@/components/magicui/ripple";
import React from "react";

function loading() {
  return (
    <div className="flex justify-center items-center h-screen">
      <Ripple />
    </div>
  );
}

export default loading;
