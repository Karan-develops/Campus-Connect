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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import Link from "next/link";

const clubCategories = [
  {
    name: "Academic",
    clubs: [
      {
        name: "Computer Science Society",
        description:
          "A club for CS enthusiasts to collaborate on projects and share knowledge.",
        members: 120,
        image: "/placeholder.svg?height=200&width=300",
      },
      {
        name: "Engineering Club",
        description:
          "Bringing together future engineers for workshops and competitions.",
        members: 85,
        image: "/placeholder.svg?height=200&width=300",
      },
      {
        name: "Literature Circle",
        description:
          "For book lovers and aspiring writers to discuss and create literature.",
        members: 50,
        image: "/placeholder.svg?height=200&width=300",
      },
    ],
  },
  {
    name: "Cultural",
    clubs: [
      {
        name: "International Students Association",
        description:
          "Celebrating diversity and promoting cultural exchange on campus.",
        members: 200,
        image: "/placeholder.svg?height=200&width=300",
      },
      {
        name: "Drama Club",
        description:
          "For students passionate about theater and performing arts.",
        members: 60,
        image: "/placeholder.svg?height=200&width=300",
      },
      {
        name: "Music Ensemble",
        description: "A group for musicians to practice and perform together.",
        members: 40,
        image: "/placeholder.svg?height=200&width=300",
      },
    ],
  },
  {
    name: "Sports",
    clubs: [
      {
        name: "Hiking Club",
        description:
          "Organizing regular hikes and outdoor adventures for nature enthusiasts.",
        members: 75,
        image: "/placeholder.svg?height=200&width=300",
      },
      {
        name: "Yoga and Meditation Society",
        description:
          "Promoting mental and physical well-being through yoga and meditation practices.",
        members: 90,
        image: "/placeholder.svg?height=200&width=300",
      },
      {
        name: "Chess Club",
        description:
          "For chess players of all levels to improve their skills and compete.",
        members: 30,
        image: "/placeholder.svg?height=200&width=300",
      },
    ],
  },
  {
    name: "Community Service",
    clubs: [
      {
        name: "Environmental Action Group",
        description: "Working towards a more sustainable campus and community.",
        members: 110,
        image: "/placeholder.svg?height=200&width=300",
      },
      {
        name: "Volunteer Corps",
        description:
          "Coordinating volunteer opportunities and community outreach programs.",
        members: 150,
        image: "/placeholder.svg?height=200&width=300",
      },
      {
        name: "Peer Tutoring Network",
        description:
          "Students helping students excel in their academic pursuits.",
        members: 80,
        image: "/placeholder.svg?height=200&width=300",
      },
    ],
  },
];

export default function StudentsClubContent() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredClubs = clubCategories
    .map((category) => ({
      ...category,
      clubs: category.clubs.filter(
        (club) =>
          club.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          club.description.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    }))
    .filter((category) => category.clubs.length > 0);

  return (
    <div className="space-y-12">
      <section>
        <div className="flex items-center space-x-2 mb-6">
          <Search className="text-gray-400" />
          <Input
            type="text"
            placeholder="Search clubs..."
            value={searchTerm}
            onChange={(e: any) => setSearchTerm(e.target.value)}
            className="max-w-sm"
          />
        </div>
        <Tabs defaultValue={clubCategories[0].name} className="w-full">
          <TabsList className="mb-4">
            {clubCategories.map((category) => (
              <TabsTrigger key={category.name} value={category.name}>
                {category.name}
              </TabsTrigger>
            ))}
          </TabsList>
          {filteredClubs.map((category) => (
            <TabsContent key={category.name} value={category.name}>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {category.clubs.map((club) => (
                  <Card key={club.name}>
                    <CardHeader>
                      <CardTitle>{club.name}</CardTitle>
                      <CardDescription>{club.members} members</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <img
                        src={club.image || "/placeholder.svg"}
                        alt={club.name}
                        className="w-full h-40 object-cover rounded-md mb-4"
                      />
                      <p className="mb-4">{club.description}</p>
                      <Button>Join Club</Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </section>

      <section className="bg-gray-800 p-8 rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">Start Your Own Club</h2>
        <p className="mb-6">
          Have an idea for a new club? We encourage student initiatives! Here's
          how you can start your own club:
        </p>
        <ol className="list-decimal list-inside space-y-2 mb-6">
          <li>Develop a clear concept and goals for your club</li>
          <li>Find at least 10 interested students to join</li>
          <li>Identify a faculty advisor</li>
          <li>Submit a club proposal to the Student Activities Office</li>
          <li>Attend a new club orientation session</li>
        </ol>
        <Button>
          <Link href={"/campus-life/create"}>Get Started</Link>
        </Button>
      </section>
    </div>
  );
}
