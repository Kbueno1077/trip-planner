"use client";

import { Marquee } from "@/components/magicui/marquee";
import OrbitingCircles from "@/components/magicui/orbiting-circles";
import { cn } from "@/lib/utils";
import {
  Bell,
  Calendar,
  Camera,
  DollarSign,
  Hotel,
  MapPin,
  Plane,
  Share2,
  Star,
  Zap,
} from "lucide-react";
import { motion } from "motion/react";
import { destinations, recentActivities } from "./heroData";

export const bentoFeatures = [
  {
    Icon: Plane,
    name: "Popular Destinations",
    description:
      "Discover trending destinations and get AI-powered recommendations.",
    href: "/create-new-trip",
    cta: "Explore Destinations",
    className: "col-span-3 lg:col-span-1",
    background: (
      <Marquee
        pauseOnHover
        className="absolute top-10 [--duration:20s] [mask-image:linear-gradient(to_top,transparent_40%,#000_100%)]"
      >
        {destinations.map((dest, idx) => (
          <figure
            key={idx}
            className={cn(
              "relative w-40 cursor-pointer overflow-hidden rounded-xl border p-4",
              "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
              "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]",
              "transform-gpu blur-[1px] transition-all duration-300 ease-out hover:blur-none",
            )}
          >
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <MapPin className="h-4 w-4 text-primary" />
                <div className="flex items-center gap-1">
                  <Star className="h-3 w-3 text-yellow-500 fill-current" />
                  <span className="text-xs">{dest.rating}</span>
                </div>
              </div>
              <figcaption className="text-sm font-medium dark:text-white">
                {dest.name}
              </figcaption>
              <blockquote className="text-xs text-muted-foreground">
                {dest.description}
              </blockquote>
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-primary">
                  {dest.price}
                </span>
                <DollarSign className="h-3 w-3 text-green-500" />
              </div>
            </div>
          </figure>
        ))}
      </Marquee>
    ),
  },
  {
    Icon: Bell,
    name: "Real-time Activity",
    description: "See what other travelers are planning and get inspired.",
    href: "/my-trips",
    cta: "View Activity",
    className: "col-span-3 lg:col-span-2",
    background: (
      <div className="absolute right-2 top-4 h-[300px] w-full transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_10%,#000_100%)] group-hover:scale-105">
        <div className="flex flex-col gap-4 p-4">
          {recentActivities.map((activity, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.2 }}
              className="flex items-center gap-3 rounded-lg border bg-background/50 p-3"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-medium">
                {activity.avatar}
              </div>
              <div className="flex-1">
                <p className="text-sm">
                  <span className="font-medium">{activity.user}</span>{" "}
                  {activity.action}
                </p>
                <p className="text-xs text-muted-foreground">{activity.time}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    ),
  },
  {
    Icon: Share2,
    name: "AI Integration",
    description: "Connect with 100+ travel services and booking platforms.",
    href: "/pricing",
    cta: "View Integrations",
    className: "col-span-3 lg:col-span-2",
    background: (
      <div className="absolute right-2 top-4 h-[300px] w-full transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_10%,#000_100%)] group-hover:scale-105">
        <div className="relative flex items-center justify-center h-full">
          <div className="relative">
            <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
              <Zap className="h-8 w-8 text-primary" />
            </div>
            <OrbitingCircles
              className="size-[30px] border-none bg-transparent"
              radius={60}
              duration={20}
            >
              <Plane className="h-5 w-5 text-blue-500" />
            </OrbitingCircles>
            <OrbitingCircles
              className="size-[30px] border-none bg-transparent"
              radius={60}
              duration={20}
              delay={5}
              reverse
            >
              <Hotel className="h-5 w-5 text-green-500" />
            </OrbitingCircles>
            <OrbitingCircles
              className="size-[30px] border-none bg-transparent"
              radius={60}
              duration={20}
              delay={10}
            >
              <Camera className="h-5 w-5 text-purple-500" />
            </OrbitingCircles>
            <OrbitingCircles
              className="size-[30px] border-none bg-transparent"
              radius={60}
              duration={20}
              delay={15}
              reverse
            >
              <MapPin className="h-5 w-5 text-orange-500" />
            </OrbitingCircles>
          </div>
        </div>
      </div>
    ),
  },
  {
    Icon: Calendar,
    name: "Smart Planning",
    description: "AI-powered itinerary planning with optimal timing.",
    className: "col-span-3 lg:col-span-1",
    href: "/create-new-trip",
    cta: "Start Planning",
    background: (
      <div className="absolute right-0 top-10 origin-top scale-90 transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_40%,#000_100%)] group-hover:scale-100">
        <div className="rounded-md border bg-background p-6">
          <div className="grid grid-cols-7 gap-2 text-center text-sm">
            <div className="font-medium">S</div>
            <div className="font-medium">M</div>
            <div className="font-medium">T</div>
            <div className="font-medium">W</div>
            <div className="font-medium">T</div>
            <div className="font-medium">F</div>
            <div className="font-medium">S</div>
            {Array.from({ length: 35 }, (_, i) => (
              <div
                key={i}
                className={cn(
                  "h-8 w-8 rounded-sm flex items-center justify-center text-sm",
                  i === 15 && "bg-primary text-primary-foreground",
                  i === 16 && "bg-primary/50",
                  i === 17 && "bg-primary/50",
                )}
              >
                {i < 31 ? i + 1 : ""}
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
  },
];
