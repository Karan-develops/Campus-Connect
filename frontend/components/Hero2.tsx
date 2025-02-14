import React from "react";
import { Button } from "./ui/button";
import { CalendarDays, School, Sparkle, Users } from "lucide-react";
import Link from "next/link";

const Hero2 = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="relative overflow-hidden">
        <div className="absolute " />
        <div className="relative pt-20 pb-24 lg:pt-32 lg:pb-40 container">
          <div className="flex flex-col items-center text-center">
            <div className="inline-flex items-center rounded-full px-3 py-1 text-sm font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border border-slate-800/10 dark:border-slate-50/[0.1] bg-slate-50/40 dark:bg-slate-800/40 backdrop-blur-md mb-8">
              <span className="text-primary">
                ✨ Your Campus Life, Organized
              </span>
            </div>

            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl bg-clip-text text-transparent bg-gradient-to-r from-slate-900/80 to-slate-700 dark:from-slate-100 dark:to-slate-300 mb-6">
              Community Campus
              <br /> Diary
            </h1>

            <p className="max-w-2xl text-lg text-muted-foreground mb-12">
              Connect, collaborate, and create memories with your campus
              community. Track events, join clubs, and stay connected with your
              peers all in one place.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full max-w-4xl">
              <Button
                variant="secondary"
                size="lg"
                className="group relative overflow-hidden h-32 hover:border-primary/50 transition-colors"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-50  dark:to-blue-800/20 opacity-50 group-hover:opacity-70 transition-opacity" />
                <Link
                  className="relative flex flex-col items-center gap-2 text-xl"
                  href={"/peers"}
                >
                  <Users className="h-6 w-6" />
                  Connect with Peers
                </Link>
              </Button>

              <Button
                variant="secondary"
                size="lg"
                className="group relative overflow-hidden h-32 hover:border-primary/50 transition-colors"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-green-50 dark:to-green-500/20 opacity-70 group-hover:opacity-70 transition-opacity" />
                <Link
                  href={"/campus-life/clubs"}
                  className="relative flex flex-col items-center gap-2 text-xl"
                >
                  <School className="h-6 w-6" />
                  <span>Join Clubs</span>
                </Link>
              </Button>

              <Button
                variant="secondary"
                size="lg"
                className="group relative overflow-hidden h-32 hover:border-primary/50 transition-colors"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-purple-50 dark:to-purple-100/20 opacity-50 group-hover:opacity-70 transition-opacity" />
                <Link
                  href={"/campus-life/events"}
                  className="relative flex flex-col items-center gap-2 text-xl"
                >
                  <CalendarDays className="h-6 w-6" />
                  <span>Track Events</span>
                </Link>
              </Button>

              <Button
                variant="secondary"
                size="lg"
                className="group relative overflow-hidden h-32 hover:border-primary/50 transition-colors"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-orange-300 to-orange-50  dark:to-pink-200/20 opacity-50 group-hover:opacity-70 transition-opacity" />
                <Link
                  href={"/campus-life/create"}
                  className="relative flex flex-col items-center gap-2 text-xl"
                >
                  <Sparkle className="text-2xl!" />
                  <span>Organize</span>
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero2;
