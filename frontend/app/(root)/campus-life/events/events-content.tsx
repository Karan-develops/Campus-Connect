"use client";

import { useState } from "react";
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
import { Button } from "@/components/ui/button";

const eventCategories = [
  {
    name: "Academic",
    events: [
      {
        title: "Annual Science Fair",
        date: new Date(2023, 9, 15),
        description:
          "Showcase of student research projects across various scientific disciplines.",
      },
      {
        title: "Literature Symposium",
        date: new Date(2023, 10, 5),
        description:
          "A gathering of renowned authors and literature enthusiasts.",
      },
      {
        title: "Math Olympiad",
        date: new Date(2023, 11, 10),
        description:
          "Annual mathematics competition for high school and college students.",
      },
    ],
  },
  {
    name: "Cultural",
    events: [
      {
        title: "International Food Festival",
        date: new Date(2023, 8, 20),
        description: "Celebration of global cuisines and cultures.",
      },
      {
        title: "Art Exhibition",
        date: new Date(2023, 9, 25),
        description: "Showcase of student and faculty artwork.",
      },
      {
        title: "Music Concert",
        date: new Date(2023, 10, 15),
        description:
          "Annual concert featuring various music genres and student performances.",
      },
    ],
  },
  {
    name: "Career",
    events: [
      {
        title: "Job Fair",
        date: new Date(2023, 9, 30),
        description:
          "Connect with potential employers and explore career opportunities.",
      },
      {
        title: "Entrepreneurship Workshop",
        date: new Date(2023, 10, 20),
        description:
          "Learn from successful entrepreneurs and develop business skills.",
      },
      {
        title: "Alumni Networking Event",
        date: new Date(2023, 11, 5),
        description:
          "Network with alumni and gain insights into various industries.",
      },
    ],
  },
];

export default function EventsContent() {
  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <div className="space-y-12">
      <section>
        <h2 className="text-2xl font-semibold mb-4">Upcoming Events</h2>
        <Tabs defaultValue={eventCategories[0].name} className="w-full">
          <TabsList>
            {eventCategories.map((category) => (
              <TabsTrigger key={category.name} value={category.name}>
                {category.name}
              </TabsTrigger>
            ))}
          </TabsList>
          {eventCategories.map((category) => (
            <TabsContent key={category.name} value={category.name}>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {category.events.map((event, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <CardTitle>{event.title}</CardTitle>
                      <CardDescription>
                        {event.date.toLocaleDateString()}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p>{event.description}</p>
                      <Button className="mt-4">Learn More</Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Event Calendar</h2>
        <div className="flex flex-col md:flex-row gap-8">
          <Card className="flex-grow">
            <CardHeader>
              <CardTitle>Events Calendar</CardTitle>
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
              <CardTitle>Highlighted Events</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {eventCategories
                  .flatMap((category) => category.events)
                  .slice(0, 5)
                  .map((event, index) => (
                    <li
                      key={index}
                      className="flex items-center justify-between"
                    >
                      <span>{event.title}</span>
                      <Badge variant="outline">
                        {event.date.toLocaleDateString()}
                      </Badge>
                    </li>
                  ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="text-center">
        <h2 className="text-2xl font-semibold mb-4">Organize an Event</h2>
        <p className="mb-6">
          Want to organize an event on campus? We'd love to hear your ideas!
        </p>
        <Button size="lg">Propose an Event</Button>
      </section>
    </div>
  );
}
