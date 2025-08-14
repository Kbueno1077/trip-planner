import { PricingTable } from "@clerk/nextjs";
import React from "react";

function PricingPage() {
  return (
    <main className="container mx-auto max-w-5xl px-4 py-16">
      <div className="mx-auto mb-10 max-w-2xl text-center">
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Simple, transparent pricing
        </h1>
        <p className="mt-3 text-muted-foreground">
          Choose the plan that fits your trip planning needs.
        </p>
      </div>

      <section
        aria-label="Pricing plans"
        className="rounded-xl border bg-card shadow-sm"
      >
        <div className="p-6 sm:p-8">
          <PricingTable />
        </div>
      </section>
    </main>
  );
}

export default PricingPage;
