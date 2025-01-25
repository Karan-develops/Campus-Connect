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

const sportsPrograms = [
  {
    name: "Basketball",
    description:
      "Men's and Women's teams competing in the National Collegiate Athletic Association (NCAA) Division I.",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    name: "Soccer",
    description:
      "Renowned soccer program with state-of-the-art training facilities.",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    name: "Swimming",
    description:
      "Olympic-sized pool and expert coaching for competitive swimming.",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    name: "Track and Field",
    description:
      "Comprehensive track and field program with indoor and outdoor facilities.",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    name: "Tennis",
    description:
      "Top-tier tennis courts and competitive teams for both men and women.",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    name: "Volleyball",
    description:
      "Exciting volleyball program with a history of conference championships.",
    image: "/placeholder.svg?height=200&width=300",
  },
];

const facilities = [
  {
    name: "Main Stadium",
    description:
      "50,000-seat multi-purpose stadium for football and track events.",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    name: "Aquatic Center",
    description:
      "State-of-the-art aquatic center with Olympic-sized pool and diving platforms.",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    name: "Fitness Center",
    description:
      "Modern fitness center equipped with the latest exercise machines and free weights.",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    name: "Indoor Courts",
    description:
      "Multiple indoor courts for basketball, volleyball, and other sports.",
    image: "/placeholder.svg?height=200&width=300",
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
    </div>
  );
}
