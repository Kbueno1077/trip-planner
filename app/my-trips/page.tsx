import React from "react";
import Trips from "./_components/Trips";

function MyTripsPage() {
  return (
    <div className="mx-auto max-w-6xl p-4 md:p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">My Trips</h1>
        <p className="text-gray-600">Manage and view all your planned trips</p>
      </div>

      <Trips />
    </div>
  );
}

export default MyTripsPage;
