import { ArrowDown, Globe2 } from "lucide-react";
import Chat from "./Chat";

export const suggestions = [
  {
    title: "Create a new trip",
    icon: <Globe2 className="w-5 h-5 text-blue-400 group-hover:text-white" />,
  },
  {
    title: "Inspire me where to go",
    icon: <Globe2 className="w-5 h-5 text-green-500 group-hover:text-white" />,
  },
  {
    title: "Discover Hidden gems",
    icon: <Globe2 className="w-5 h-5 text-orange-500 group-hover:text-white" />,
  },
  {
    title: "Adventure destination",
    icon: <Globe2 className="w-5 h-5 text-yellow-600 group-hover:text-white" />,
  },
];

function Hero() {
  return (
    <div className="mt-16 w-full px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="w-full max-w-5xl text-center space-y-8 sm:space-y-10">
        <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold leading-tight">
          Hey, I&apos;m your personal{" "}
          <span className="text-primary">trip Planner</span>
        </h1>

        <p className="text-base sm:text-lg text-muted-foreground">
          Tell me what you want, I will handle the rest: Flights, Hotels, trip
          planner - all in seconds.
        </p>

        <div>
          <Chat />
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 md:gap-5">
          {suggestions.map((suggestion) => (
            <div
              key={suggestion.title}
              className="group flex items-center gap-2 rounded-full border p-2 sm:p-3 cursor-pointer hover:bg-primary hover:text-white transition-all duration-300"
            >
              {suggestion.icon}
              <h2 className="text-xs sm:text-sm">{suggestion.title}</h2>
            </div>
          ))}
        </div>

        <h2 className="flex items-center justify-center gap-2 text-sm sm:text-base">
          Not sure where to start?{" "}
          <strong className="flex items-center gap-1">
            See how it works <ArrowDown className="h-4 w-4" />
          </strong>
        </h2>

        {/* <HeroVideoDialog
          videoSrc="/videos/hero.mp4"
          thumbnailSrc="/images/hero.png"
        /> */}
      </div>
    </div>
  );
}

export default Hero;
