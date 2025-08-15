import { PricingTable } from "@clerk/nextjs";
import React from "react";
import { Globe } from "@/components/magicui/globe";

function PricingPage() {
  return (
    <main className="container mx-auto max-w-5xl px-4 py-16">
      <div className="mx-auto mb-10 max-w-2xl text-center relative">
        <div className=""></div>
      </div>

      <section
        aria-label="Pricing plans"
        className="shadow-sm relative rounded-2xl border bg-white/5 backdrop-blur-sm p-8"
      >
        <div className="text-center">
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Simple, transparent pricing
          </h1>
          <p className="mt-3 text-muted-foreground">
            Choose the plan that fits your trip planning needs.
          </p>
        </div>

        <div className="p-6 sm:p-8 z-20">
          <PricingTable />
        </div>
      </section>

      <div className="">
        <Globe />
      </div>
    </main>
  );
}

export default PricingPage;
