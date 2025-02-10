"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Calendar, Users, Trophy } from "lucide-react";
import Link from "next/link";
import { getUserCreations } from "@/actions/user.actions";

interface MyCreationsContentProps {
  userId: string;
}

export default function MyCreationsContent({
  userId,
}: MyCreationsContentProps) {
  const [creations, setCreations] = useState<{
    events: any[];
    clubs: any[];
    sports: any[];
  }>({ events: [], clubs: [], sports: [] });

  useEffect(() => {
    const fetchCreations = async () => {
      const userCreations = await getUserCreations(userId);
      setCreations(userCreations);
    };
    fetchCreations();
  }, [userId]);

  return (
    <Tabs defaultValue="events">
      <TabsList>
        <TabsTrigger value="events">Events</TabsTrigger>
        <TabsTrigger value="clubs">Clubs</TabsTrigger>
        <TabsTrigger value="sports">Sports</TabsTrigger>
      </TabsList>

      <TabsContent value="events">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {creations.events.map((event) => (
            <Card key={event.id}>
              <CardHeader>
                <CardTitle>{event.name}</CardTitle>
                <CardDescription>{event.date}</CardDescription>
              </CardHeader>
              <CardContent>
                <p>
                  <strong>Location:</strong> {event.location}
                </p>
                <p>{event.description}</p>
              </CardContent>
            </Card>
          ))}
          <Card className="flex items-center justify-center p-16">
            <CardContent>
              <Link href="/campus-life/create">
                <Button>
                  <Calendar className="mr-2 h-4 w-4" />
                  Create New Event
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </TabsContent>

      <TabsContent value="clubs">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {creations.clubs.map((club) => (
            <Card key={club.id}>
              <CardHeader>
                <CardTitle>{club.name}</CardTitle>
                <CardDescription>{club.category}</CardDescription>
              </CardHeader>
              <CardContent>
                <p>{club.description}</p>
                <p>
                  <strong>Contact:</strong> {club.contactEmail}
                </p>
              </CardContent>
            </Card>
          ))}
          <Card className="flex items-center justify-center">
            <CardContent>
              <Link href="/campus-life/create">
                <Button>
                  <Users className="mr-2 h-4 w-4" />
                  Create New Club
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </TabsContent>

      <TabsContent value="sports">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {creations.sports.map((sport) => (
            <Card key={sport.id}>
              <CardHeader>
                <CardTitle>{sport.name}</CardTitle>
                <CardDescription>{sport.type}</CardDescription>
              </CardHeader>
              <CardContent>
                <p>{sport.description}</p>
                <p>
                  <strong>Coach:</strong> {sport.coach}
                </p>
              </CardContent>
            </Card>
          ))}
          <Card className="flex items-center justify-center">
            <CardContent>
              <Link href="/campus-life/create">
                <Button>
                  <Trophy className="mr-2 h-4 w-4" />
                  Create New Sport
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </TabsContent>
    </Tabs>
  );
}
