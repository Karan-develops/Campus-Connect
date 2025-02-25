"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Award } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ClubMember {
  id: string;
  name: string;
  avatarUrl: string | null;
}

interface Club {
  id: string;
  name: string;
  category: string;
  description: string;
  members: ClubMember[];
  _count: {
    members: number;
  };
}

interface ClubDetailsProps {
  club: Club;
}

export default function ClubDetails({ club }: ClubDetailsProps) {
  const [isMember, setIsMember] = useState(false);
  const { toast } = useToast();

  const handleJoinClub = async () => {
    try {
      const response = await fetch(`/api/clubs/${club.id}/join`, {
        method: "POST",
      });
      if (!response.ok) {
        throw new Error("Failed to join club");
      }
      setIsMember(true);
      toast({
        title: "Club Joined",
        description: `You have successfully joined ${club.name}!`,
      });
    } catch (error) {
      console.error("Error joining club:", error);
      toast({
        title: "Error",
        description: "Failed to join club. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleLeaveClub = async () => {
    try {
      const response = await fetch(`/api/clubs/${club.id}/leave`, {
        method: "POST",
      });
      if (!response.ok) {
        throw new Error("Failed to leave club");
      }
      setIsMember(false);
      toast({
        title: "Club Left",
        description: `You have left ${club.name}.`,
      });
    } catch (error) {
      console.error("Error leaving club:", error);
      toast({
        title: "Error",
        description: "Failed to leave club. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-3xl">{club.name}</CardTitle>
              <CardDescription>{club.category}</CardDescription>
            </div>
            <Badge variant="outline">{club._count.members} members</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-lg mb-4">{club.description}</p>
          {isMember ? (
            <Button onClick={handleLeaveClub} variant="destructive">
              Leave Club
            </Button>
          ) : (
            <Button onClick={handleJoinClub}>Join Club</Button>
          )}
        </CardContent>
      </Card>

      <Tabs defaultValue="about">
        <TabsList>
          <TabsTrigger value="members">Members</TabsTrigger>
          <TabsTrigger value="events">Events</TabsTrigger>
        </TabsList>
        <TabsContent value="events">
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Events</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                {[
                  {
                    name: "Workshop: Introduction to Machine Learning",
                    date: "2023-06-15",
                    time: "14:00 - 16:00",
                  },
                  {
                    name: "Guest Lecture: Ethics in AI",
                    date: "2023-06-22",
                    time: "18:00 - 19:30",
                  },
                  {
                    name: "Hackathon: AI for Social Good",
                    date: "2023-07-01",
                    time: "09:00 - 21:00",
                  },
                ].map((event, index) => (
                  <li key={index} className="flex items-center space-x-4">
                    <Calendar className="h-6 w-6 text-primary" />
                    <div>
                      <p className="font-semibold">{event.name}</p>
                      <p className="text-sm text-gray-500">
                        {event.date} | {event.time}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="members">
          <Card>
            <CardHeader>
              <CardTitle>Club Members</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {club.members.length === 0 ? (
                  <div className="flex flex-col gap-2">
                    No Members - Wanna Join ??
                    <Button onClick={handleJoinClub}>Join Club</Button>
                  </div>
                ) : (
                  club.members.map((member: any) => (
                    <div
                      key={member.id}
                      className="flex items-center space-x-4"
                    >
                      <Avatar>
                        <AvatarImage src={member.avatarUrl} alt={member.name} />
                        <AvatarFallback>
                          {member.name
                            .split(" ")
                            .map((n: any) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold">{member.name}</p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
