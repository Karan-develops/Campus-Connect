"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const sportsPrograms = [
  {
    name: "Basketball",
    description:
      "Men's and Women's teams competing in the National Collegiate Athletic Association (NCAA) Division I.",
    image:
      "https://images.unsplash.com/photo-1574623452334-1e0ac2b3ccb4?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Soccer",
    description:
      "Renowned soccer program with state-of-the-art training facilities.",
    image:
      "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Swimming",
    description:
      "Olympic-sized pool and expert coaching for competitive swimming.",
    image:
      "https://plus.unsplash.com/premium_photo-1664475361436-e37f6f2ba407?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Track and Field",
    description:
      "Comprehensive track and field program with indoor and outdoor facilities.",
    image:
      "https://images.unsplash.com/photo-1606416550697-3d653df8d9a7?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Tennis",
    description:
      "Top-tier tennis courts and competitive teams for both men and women.",
    image:
      "https://plus.unsplash.com/premium_photo-1666913667082-c1fecc45275d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Volleyball",
    description:
      "Exciting volleyball program with a history of conference championships.",
    image:
      "https://plus.unsplash.com/premium_photo-1708696237508-37eb0c43cab4?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

const facilities = [
  {
    name: "Main Stadium",
    description:
      "50,000-seat multi-purpose stadium for football and track events.",
    image:
      "https://images.unsplash.com/flagged/photo-1554473675-d0904f3cbf38?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Aquatic Center",
    description:
      "State-of-the-art aquatic center with Olympic-sized pool and diving platforms.",
    image:
      "https://plus.unsplash.com/premium_photo-1721756027099-92f87fd77af7?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Fitness Center",
    description:
      "Modern fitness center equipped with the latest exercise machines and free weights.",
    image:
      "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?q=80&w=1975&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Indoor Courts",
    description:
      "Multiple indoor courts for basketball, volleyball, and other sports.",
    image:
      "https://images.unsplash.com/photo-1531124042451-f3ba1765072c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

const upcomingEvents = [
  { date: new Date(2023, 8, 15), event: "Basketball Season Opener" },
  { date: new Date(2023, 8, 22), event: "Soccer Tournament" },
  { date: new Date(2023, 9, 5), event: "Swimming Meet" },
  { date: new Date(2023, 9, 12), event: "Track and Field Invitational" },
  { date: new Date(2023, 9, 19), event: "Tennis Championship" },
];

export default function SportsContent() {
  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <div className="space-y-12">
      <section>
        <h2 className="text-2xl font-semibold mb-4">Our Sports Programs</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {sportsPrograms.map((sport) => (
            <Card key={sport.name}>
              <CardHeader>
                <CardTitle>{sport.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <img
                  src={sport.image || "/placeholder.svg"}
                  alt={sport.name}
                  className="w-full h-40 object-cover rounded-md mb-4"
                />
                <CardDescription>{sport.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Sports Facilities</h2>
        <div className="grid gap-6 md:grid-cols-2">
          {facilities.map((facility) => (
            <Card key={facility.name}>
              <CardHeader>
                <CardTitle>{facility.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <img
                  src={facility.image || "/placeholder.svg"}
                  alt={facility.name}
                  className="w-full h-48 object-cover rounded-md mb-4"
                />
                <CardDescription>{facility.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Upcoming Sports Events</h2>
        <div className="flex flex-col md:flex-row gap-8">
          <Card className="flex-grow">
            <CardHeader>
              <CardTitle>Sports Calendar</CardTitle>
            </CardHeader>
            <CardContent>
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border"
              />
            </CardContent>
          </Card>
          <Card className="flex-grow">
            <CardHeader>
              <CardTitle>Upcoming Events</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {upcomingEvents.map((item, index) => (
                  <li key={index} className="flex items-center justify-between">
                    <span>{item.event}</span>
                    <Badge variant="outline">
                      {item.date.toLocaleDateString()}
                    </Badge>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>
      <section className="text-center">
        <h2 className="text-2xl font-semibold mb-4">Organize New Sports Program</h2>
        <p className="mb-6">
          Want to organize sports program on campus ? We'd love to hear your ideas!
        </p>
        <Button size="lg">
          <Link href={"/campus-life/create"}>Organize Program</Link>
        </Button>
      </section>
    </div>
  );
}
