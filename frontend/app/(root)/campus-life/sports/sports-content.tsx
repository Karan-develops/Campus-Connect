"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Loader1 from "@/components/Loader1";
import Image from "next/image";

const upcomingEvents = [
  { date: new Date(2023, 8, 15), event: "Basketball Season Opener" },
  { date: new Date(2023, 8, 22), event: "Soccer Tournament" },
  { date: new Date(2023, 9, 5), event: "Swimming Meet" },
  { date: new Date(2023, 9, 12), event: "Track and Field Invitational" },
  { date: new Date(2023, 9, 19), event: "Tennis Championship" },
];

export default function SportsContent() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/sports-info");
        const json = await res.json();
        setData(json);
      } catch (error) {
        setLoading(false);
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  if (loading) {
    return (
      <div className="flex justify-center">
        <Loader1 />
      </div>
    );
  }

  if (!data) {
    return <div>Error loading program information.</div>;
  }

  return (
    <div className="space-y-12">
      <section>
        <h2 className="text-2xl font-semibold mb-4">Our Sports Programs</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {data.sportsPrograms.map((sport: any) => (
            <Card key={sport.name}>
              <CardHeader>
                <CardTitle>{sport.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <Image
                  src={sport.image || ""}
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
          {data.facilities.map((facility: any) => (
            <Card key={facility.name}>
              <CardHeader>
                <CardTitle>{facility.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <Image
                  src={facility.image || ""}
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
        <h2 className="text-2xl font-semibold mb-4">
          Organize New Sports Program
        </h2>
        <p className="mb-6">
          Want to organize sports program on campus ? We'd love to hear your
          ideas!
        </p>
        <Button size="lg">
          <Link href={"/campus-life/create"}>Organize Program</Link>
        </Button>
      </section>
    </div>
  );
}
