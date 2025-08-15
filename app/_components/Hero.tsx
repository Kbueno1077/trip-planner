"use client";

import AnimatedGridPattern from "@/components/magicui/animated-grid-pattern";
import {
  ArcTimeline,
  ArcTimelineItem,
} from "@/components/magicui/arc-timeline";
import { BentoCard, BentoGrid } from "@/components/magicui/bento-grid";
import NumberTicker from "@/components/magicui/number-ticker";
import Sparkles from "@/components/magicui/sparkles";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { bentoFeatures } from "@/data/bentoFeatures";
import { heroStats, planningTimeline as timelineData } from "@/data/heroData";
import {
  Clock,
  Search,
  MapPin,
  Calendar,
  CreditCard,
  Plane,
  Zap,
  Sparkles as SparklesIcon,
} from "lucide-react";
import { motion } from "motion/react";

// Icon mapping function
const getIcon = (iconName: string) => {
  const iconMap = {
    Search: <Search className="h-6 w-6" />,
    MapPin: <MapPin className="h-6 w-6" />,
    Calendar: <Calendar className="h-6 w-6" />,
    CreditCard: <CreditCard className="h-6 w-6" />,
    Clock: <Clock className="h-6 w-6" />,
    Zap: <Zap className="h-6 w-6" />,
    Plane: <Plane className="h-6 w-6" />,
  };
  return (
    iconMap[iconName as keyof typeof iconMap] || <Search className="h-6 w-6" />
  );
};

// Convert timeline data with icon components
const planningTimeline: ArcTimelineItem[] = timelineData.map((item) => ({
  ...item,
  steps: item.steps.map((step) => ({
    ...step,
    icon: getIcon(step.icon),
  })),
}));

function Hero() {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <AnimatedGridPattern className="absolute inset-0 opacity-30" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="text-center space-y-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Badge className="inline-flex items-center gap-2 px-4 py-2 text-sm bg-primary/10 text-primary border-primary/20">
              <SparklesIcon className="h-4 w-4" />
              AI-Powered Trip Planning
            </Badge>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-6"
          >
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight">
              Plan your{" "}
              <Sparkles className="inline-block">
                <span className="bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent">
                  dream trip
                </span>
              </Sparkles>
              <br />
              in seconds
            </h1>

            <p className="text-xl sm:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Let our AI create the perfect itinerary, find the best deals, and
              discover amazing places you&apos;ll love
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <Button
                size="lg"
                className="text-lg px-10 py-5 h-auto shadow-xl shadow-primary/25 bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary border-0 relative overflow-hidden group"
              >
                <span className="relative z-10 flex items-center">
                  Start Planning Your Trip
                  <SparklesIcon className="ml-2 h-5 w-5 transition-transform group-hover:rotate-12" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              </Button>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <Button
                variant="outline"
                size="lg"
                className="text-lg px-8 py-5 h-auto border-2 border-primary/30 bg-background/80 backdrop-blur-sm hover:bg-primary/5 hover:border-primary/50 transition-all duration-300"
              >
                See Example Trips
              </Button>
            </motion.div>
          </motion.div>

          {/* Timeline Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-20 mb-16"
          >
            <div className="text-center mb-8 sm:mb-12 px-4">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">
                From <span className="text-red-500">Stressful Planning</span> to{" "}
                <span className="bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent">
                  Instant Adventures
                </span>
              </h2>
              <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                See how our AI transforms weeks of tedious planning into seconds
                of pure excitement
              </p>
            </div>

            <div className="relative px-4 sm:px-8">
              <ArcTimeline
                data={planningTimeline}
                className="mx-auto max-w-4xl"
                defaultActiveStep={{
                  time: "Traditional Planning",
                  stepIndex: 0,
                }}
                arcConfig={{
                  circleWidth: 3500,
                  angleBetweenMinorSteps: 0.45,
                  lineCountFillBetweenSteps: 6,
                  boundaryPlaceholderLinesCount: 35,
                }}
                autoplay={{
                  enabled: true,
                  delay: 4000,
                  pauseOnHover: true,
                }}
              />

              {/* Gradient overlay for visual enhancement */}
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent pointer-events-none" />

              {/* Mobile instruction text */}
              <div className="block sm:hidden text-center mt-4 text-sm text-muted-foreground">
                Tap the timeline steps to explore
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="max-w-6xl mx-auto"
          >
            <BentoGrid>
              {bentoFeatures.map((feature, idx) => (
                <BentoCard key={idx} {...feature} />
              ))}
            </BentoGrid>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mt-16 p-8 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/5 "
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {heroStats.map((stat, index) => (
                <div key={stat.label} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                    <NumberTicker
                      value={stat.value}
                      delay={0.5 + index * 0.2}
                    />
                    +
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
