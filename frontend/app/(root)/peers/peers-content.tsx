"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search, MessageCircle, UserPlus, Bookmark } from "lucide-react";
import { User } from "@prisma/client";
import { projects, students } from "@/app/constants/peersData.constants";
import { connectWithUser } from "@/actions/user.actions";
import Link from "next/link";

interface PeersContentProps {
  initialUsers: User[];
}

export default function PeersContent({ initialUsers }: PeersContentProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const [users, setUsers] = useState(initialUsers);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    const filteredUsers = initialUsers.filter(
      (user) =>
        user.name.toLowerCase().includes(query) ||
        user.major?.toLowerCase().includes(query) ||
        user.year?.toLowerCase().includes(query)
    );
    setUsers(filteredUsers);
  };

  const handleConnect = async (userId: string) => {
    try {
      await connectWithUser(userId);
      // Updating the UI to reflect the new connection
      setUsers(
        users.map((user) =>
          user.id === userId ? { ...user, isConnected: true } : user
        )
      );
    } catch (error) {
      console.error("Error connecting with user:", error);
    }
  };

  const filteredStudents = students.filter(
    (student) =>
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.major.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.skills.some((skill) =>
        skill.toLowerCase().includes(searchTerm.toLowerCase())
      )
  );

  const filteredProjects = projects.filter(
    (project) =>
      (project.title &&
        project.title.toLowerCase().includes(searchTerm.toLowerCase())) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.skills.some((skill) =>
        skill.toLowerCase().includes(searchTerm.toLowerCase())
      )
  );

  return (
    <div className="space-y-12">
      <section>
        <div className="flex items-center space-x-2 mb-6">
          <Search className="text-gray-400" />
          <Input
            type="text"
            placeholder="Search peers..."
            value={searchQuery}
            onChange={handleSearch}
            className="max-w-sm"
          />
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {users.map((user) => (
            <Card key={user.id}>
              <CardHeader>
                <div className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarImage
                      src={user.avatarUrl || undefined}
                      alt={user.name}
                    />
                    <AvatarFallback>
                      {user.name.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle>{user.name}</CardTitle>
                    <CardDescription>
                      {user.major}, {user.year}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">{user.bio}</p>
                <div className="flex flex-wrap gap-2">
                  {user.major?.split(",").map((skill: any, index: any) => (
                    <Badge key={index} variant="secondary">
                      {skill.trim()}
                    </Badge>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" size="sm" asChild>
                  <Link href={`/messages/${user.id}`}>
                    <MessageCircle className="mr-2 h-4 w-4" />
                    Message
                  </Link>
                </Button>
                {/* <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleConnect(user.id)}
                  disabled={user.isConnected}
                >
                  <UserPlus className="mr-2 h-4 w-4" />
                  {user.isConnected ? "Connected" : "Connect"}
                </Button> */}
              </CardFooter>
            </Card>
          ))}
        </div>
        <Tabs defaultValue="peers" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="peers">Peers</TabsTrigger>
            <TabsTrigger value="projects">Projects</TabsTrigger>
          </TabsList>
          <TabsContent value="peers">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredStudents.map((student) => (
                <Card key={student.id}>
                  <CardHeader>
                    <div className="flex items-center space-x-4">
                      <Avatar>
                        <AvatarImage src={student.image} alt={student.name} />
                        <AvatarFallback>
                          {student.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle>{student.name}</CardTitle>
                        <CardDescription>
                          {student.major}, {student.year}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {student.skills.map((skill, index) => (
                        <Badge key={index} variant="secondary">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" size="sm">
                      <MessageCircle className="mr-2 h-4 w-4" />
                      Message
                    </Button>
                    <Button variant="outline" size="sm">
                      <UserPlus className="mr-2 h-4 w-4" />
                      Connect
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="projects">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredProjects.map((project) => (
                <Card key={project.id}>
                  <CardHeader>
                    <CardTitle>{project.title}</CardTitle>
                    <CardDescription>by {project.owner}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-4">{project.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {project.skills.map((skill, index) => (
                        <Badge key={index} variant="secondary">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" size="sm">
                      <MessageCircle className="mr-2 h-4 w-4" />
                      Contact Owner
                    </Button>
                    <Button variant="outline" size="sm">
                      <Bookmark className="mr-2 h-4 w-4" />
                      Save Project
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">
          Upcoming Collaboration Events
        </h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Project Showcase</CardTitle>
              <CardDescription>Date: September 5, 2023</CardDescription>
            </CardHeader>
            <CardContent>
              <p>
                Present your projects to industry professionals and fellow
                students. Great networking opportunity!
              </p>
            </CardContent>
            <CardFooter>
              <Button variant="outline">RSVP</Button>
            </CardFooter>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Collaboration Workshop</CardTitle>
              <CardDescription>Date: October 10, 2023</CardDescription>
            </CardHeader>
            <CardContent>
              <p>
                Learn effective techniques for team collaboration and project
                management in this hands-on workshop.
              </p>
            </CardContent>
            <CardFooter>
              <Button variant="outline">Sign Up</Button>
            </CardFooter>
          </Card>
        </div>
      </section>
    </div>
  );
}
