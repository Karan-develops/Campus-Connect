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
import Link from "next/link";
import { eventCategories } from "@/app/constants/events-data.constants";

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
        <Button size="lg">
          <Link href={"/campus-life/create"}>Propose an Event</Link>
        </Button>
      </section>
    </div>
  );
}
