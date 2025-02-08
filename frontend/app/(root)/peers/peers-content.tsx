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
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Search, MessageCircle, UserPlus, Bookmark } from "lucide-react";

// Mock data for students and projects
const students = [
  {
    id: 1,
    name: "Alice Johnson",
    major: "Computer Science",
    year: "Junior",
    skills: ["React", "Node.js", "Python"],
    image: "",
  },
  {
    id: 2,
    name: "Bob Smith",
    major: "Electrical Engineering",
    year: "Senior",
    skills: ["C++", "MATLAB", "Circuit Design"],
    image: "",
  },
  {
    id: 3,
    name: "Charlie Brown",
    major: "Business Administration",
    year: "Sophomore",
    skills: ["Marketing", "Data Analysis", "Public Speaking"],
    image: "",
  },
  {
    id: 4,
    name: "Diana Lee",
    major: "Graphic Design",
    year: "Senior",
    skills: ["Adobe Creative Suite", "UI/UX Design", "Typography"],
    image: "",
  },
];

const projects = [
  {
    id: 1,
    title: "AI-powered Study Assistant",
    description:
      "Developing an AI assistant to help students organize their study schedules and materials.",
    skills: ["Machine Learning", "Python", "UI Design"],
    owner: "Alice Johnson",
  },
  {
    id: 2,
    name: "Sustainable Energy Monitor",
    description:
      "Creating a device to monitor and optimize energy usage in college dormitories.",
    skills: ["IoT", "Data Analysis", "Hardware Design"],
    owner: "Bob Smith",
  },
  {
    id: 3,
    name: "Campus Event App",
    description:
      "Building a mobile app to help students discover and attend campus events.",
    skills: ["React Native", "Node.js", "UX Design"],
    owner: "Charlie Brown",
  },
];

export default function PeersContent() {
  const [searchTerm, setSearchTerm] = useState("");
  const [newProject, setNewProject] = useState({
    title: "",
    description: "",
    skills: "",
  });

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

  const handleNewProject = () => {
    // Here you would typically send this data to your backend
    console.log("New project:", newProject);
    // Reset the form
    setNewProject({ title: "", description: "", skills: "" });
  };

  return (
    <div className="space-y-12">
      <section>
        <div className="flex items-center space-x-2 mb-6">
          <Search className="text-gray-400" />
          <Input
            type="text"
            placeholder="Search peers or projects..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-sm"
          />
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
        <h2 className="text-2xl font-semibold mb-4">Post a New Project</h2>
        <Card>
          <CardHeader>
            <CardTitle>Share Your Project Idea</CardTitle>
            <CardDescription>
              Let others know about your project and find collaborators
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div>
                <Label htmlFor="project-title">Project Title</Label>
                <Input
                  id="project-title"
                  value={newProject.title}
                  onChange={(e) =>
                    setNewProject({ ...newProject, title: e.target.value })
                  }
                  placeholder="Enter your project title"
                />
              </div>
              <div>
                <Label htmlFor="project-description">Project Description</Label>
                <Textarea
                  id="project-description"
                  value={newProject.description}
                  onChange={(e) =>
                    setNewProject({
                      ...newProject,
                      description: e.target.value,
                    })
                  }
                  placeholder="Describe your project and what kind of help you're looking for"
                />
              </div>
              <div>
                <Label htmlFor="project-skills">
                  Required Skills (comma-separated)
                </Label>
                <Input
                  id="project-skills"
                  value={newProject.skills}
                  onChange={(e) =>
                    setNewProject({ ...newProject, skills: e.target.value })
                  }
                  placeholder="e.g. React, Node.js, UI Design"
                />
              </div>
            </form>
          </CardContent>
          <CardFooter>
            <Button onClick={handleNewProject}>Post Project</Button>
          </CardFooter>
        </Card>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">
          Upcoming Collaboration Events
        </h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Hackathon 2023</CardTitle>
              <CardDescription>Date: August 15-17, 2023</CardDescription>
            </CardHeader>
            <CardContent>
              <p>
                Join us for a 48-hour coding marathon to solve real-world
                problems and showcase your skills!
              </p>
            </CardContent>
            <CardFooter>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline">Learn More</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Hackathon 2023</DialogTitle>
                    <DialogDescription>
                      Get ready for an exciting 48-hour coding challenge! Form
                      teams, tackle interesting problems, and compete for
                      amazing prizes.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <p>
                      <strong>Date:</strong> August 15-17, 2023
                    </p>
                    <p>
                      <strong>Location:</strong> Main Campus, Tech Building
                    </p>
                    <p>
                      <strong>Prizes:</strong> Over $10,000 in cash and
                      sponsored gifts
                    </p>
                  </div>
                  <DialogFooter>
                    <Button type="submit">Register Now</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardFooter>
          </Card>
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
