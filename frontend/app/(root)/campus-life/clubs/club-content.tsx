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
import { Input } from "@/components/ui/input";
import { Eye, Search } from "lucide-react";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";
import Loader1 from "@/components/Loader1";

interface Club {
  id: string;
  name: string;
  category: string;
  creator: string;
  description: string;
  image: string;
  _count: {
    members: number;
  };
}

export default function StudentsClubContent() {
  const [searchTerm, setSearchTerm] = useState("");
  const [clubs, setClubs] = useState<Club[]>([]);
  const [filteredClubs, setFilteredClubs] = useState<Club[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchClubs();
  }, []);

  useEffect(() => {
    const filtered = clubs.filter(
      (club) =>
        club.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        club.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredClubs(filtered);
  }, [searchTerm, clubs]);

  const fetchClubs = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/clubs");
      if (!response.ok) {
        throw new Error("Failed to fetch clubs");
      }
      const data: Club[] = await response.json();
      setClubs(data);
      const uniqueCategories = Array.from(
        new Set(data.map((club: Club) => club.category))
      );
      setCategories(uniqueCategories);
    } catch (error) {
      console.error("Error fetching clubs:", error);
      toast({
        title: "Error",
        description: "Failed to fetch clubs. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleJoinClub = async (clubId: string, clubName: string) => {
    try {
      const response = await fetch(`/api/clubs/${clubId}/join`, {
        method: "POST",
      });
      if (!response.ok) {
        throw new Error("Failed to join club");
      }
      const updatedClub = await response.json();
      setClubs(clubs.map((club) => (club.id === clubId ? updatedClub : club)));
      toast({
        title: "Club Joined",
        description: `You have successfully joined ${clubName}!`,
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

  return (
    <div className="space-y-12">
      <section>
        <div className="flex items-center space-x-2 mb-6">
          <Search className="text-gray-400" />
          <Input
            type="text"
            placeholder="Search clubs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-sm"
          />
        </div>
        {loading ? (
          <Loader1 />
        ) : (
          <Tabs defaultValue={categories[0]} className="w-full">
            <TabsList className="mb-4">
              {categories.map((category) => (
                <TabsTrigger key={category} value={category}>
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>
            {categories.map((category) => (
              <TabsContent key={category} value={category}>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {filteredClubs
                    .filter((club) => club.category === category)
                    .map((club) => (
                      <Card key={club.id}>
                        <CardHeader>
                          <CardTitle>{club.name} -- Club Leader - {club.creator} </CardTitle>
                          <CardDescription>
                            {club._count.members} members
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <p className="mb-4">{club.description}</p>
                          <div className="flex justify-between items-center">
                            <Button
                              onClick={() => handleJoinClub(club.id, club.name)}
                            >
                              Join Club
                            </Button>
                            <Link href={`/campus-life/clubs/${club.id}`}>
                              <Button variant="outline">
                                View Club
                                <Eye />
                              </Button>
                            </Link>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        )}
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
