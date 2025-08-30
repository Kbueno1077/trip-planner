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
            <div className="inline-flex items-center gap-2 px-4 py-2 text-sm bg-primary/20 text-primary border-primary/20 rounded-full border">
              <SparklesIcon className="h-4 w-4" />
              AI-Powered Trip Planning
              <SparklesIcon className="h-4 w-4" />
            </div>
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
          </motion.div>

          {/* Timeline Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-20 mb-16"
          >
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
