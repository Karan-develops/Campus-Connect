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
import { clubCategories } from "@/app/constants/club-data.constants";

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
                        src={club.image || ""}
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
