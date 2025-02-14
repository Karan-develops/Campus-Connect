"use client";

import { motion } from "framer-motion";
import React from "react";
import {
  Zap,
  Command,
  Bot,
  Sparkles,
  GitPullRequestArrow,
  HeartHandshake,
} from "lucide-react";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import Link from "next/link";
import { SelectSeparator } from "./ui/select";

const HomeNewFeatures = () => {
  return (
    <div>
      <section className="container space-y-12 py-12 md:py-24 lg:py-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center"
        >
          <h2 className="text-3xl font-bold leading-[1.1] sm:text-3xl md:text-5xl">
            Why Choose Us
          </h2>
          <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
            Experience a vibrant and supportive learning community at Campus
            Diary, where you'll find personalized attention, ample opportunities
            for growth, and lifelong connections. We foster a culture of
            collaboration and innovation, inspiring you to make a difference.
          </p>
        </motion.div>
        <div className="mx-auto grid gap-8 sm:max-w-3xl sm:grid-cols-2 lg:max-w-5xl lg:grid-cols-3">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{
                rotateX: index % 2 === 0 ? 5 : -5,
                rotateY: index % 3 === 0 ? 5 : -5,
                transition: { duration: 0.3 },
              }}
              className="relative overflow-hidden rounded-lg border bg-background p-2"
            >
              <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
                <feature.icon className="h-12 w-12 text-primary" />
                <div className="space-y-2">
                  <h3 className="font-bold">{feature.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
      <Separator />
      <section className="container py-12 md:py-24 lg:py-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center"
        >
          <h2 className="text-3xl font-bold leading-[1.1] sm:text-3xl md:text-5xl">
            Ready to Start Your Journey?
          </h2>
          <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
            Join our community of learners and innovators today. Keep
            Contributing Keep Learning!
          </p>
          <Button size="lg" className="mt-4">
            <Link href={"/apply"}>Apply Now</Link>
          </Button>
        </motion.div>
      </section>
      <SelectSeparator/>
    </div>
  );
};

export default HomeNewFeatures;

const features = [
  {
    name: "Peers",
    description: "Connect with a diverse and inspiring community of peers.",
    icon: Zap,
  },
  {
    name: "Career Success",
    description: "Outstanding placement records and alumni network.",
    icon: Command,
  },
  {
    name: "Open Source",
    description: "Collaborate on exciting projects, Enhance contributions.",
    icon: GitPullRequestArrow,
  },
  {
    name: "Message Peers",
    description: "Connect with peers for group studies and support.",
    icon: Bot,
  },
  {
    name: "Club Culture",
    description:
      "Join or start your club, Expand your horizons through club involvement.",
    icon: HeartHandshake,
  },
  {
    name: "Organize Events",
    description: "Explore our diverse events, clubs and sports calendars.",
    icon: Sparkles,
  },
] as const;
