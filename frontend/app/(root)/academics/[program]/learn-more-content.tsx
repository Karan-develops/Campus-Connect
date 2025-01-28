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
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Book, Trophy, Briefcase, GraduationCap, Calendar } from "lucide-react";

interface LearnMoreContentProps {
  programName: string;
}

export default function LearnMoreContent({
  programName,
}: LearnMoreContentProps) {
  const [activeTab, setActiveTab] = useState("overview");

  // Baadme database se data lana h
  const programData = {
    "B.Tech Computer Science and Engineering": {
      description:
        "Our B.Tech in Computer Science and Engineering program is designed to provide students with a strong foundation in computer science theory and practice. Students will learn cutting-edge technologies and software development practices, preparing them for successful careers in the tech industry.",
      duration: "4 years",
      credits: 160,
      careers: [
        "Software Engineer",
        "Data Scientist",
        "AI/ML Engineer",
        "Cloud Architect",
        "Cybersecurity Specialist",
      ],
      courses: [
        { name: "Data Structures and Algorithms", year: 1 },
        { name: "Object-Oriented Programming", year: 1 },
        { name: "Database Management Systems", year: 2 },
        { name: "Computer Networks", year: 2 },
        { name: "Artificial Intelligence", year: 3 },
        { name: "Machine Learning", year: 3 },
        { name: "Cloud Computing", year: 4 },
        { name: "Blockchain Technology", year: 4 },
      ],
      faculty: [
        {
          name: "Dr. Sarah Johnson",
          role: "Professor",
          image: "/placeholder.svg?height=100&width=100",
        },
        {
          name: "Dr. Michael Chen",
          role: "Associate Professor",
          image: "/placeholder.svg?height=100&width=100",
        },
        {
          name: "Dr. Emily Rodriguez",
          role: "Assistant Professor",
          image: "/placeholder.svg?height=100&width=100",
        },
      ],
      statistics: {
        placementRate: 95,
        averageSalary: "₹12.5 LPA",
        internshipPartners: 50,
        researchPublications: 75,
      },
    },
    // Add data for other programs here
  };

  const data = programData[programName as keyof typeof programData];

  if (!data) {
    return <div>Program data not found</div>;
  }

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Program Overview</CardTitle>
          <CardDescription>{data.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="flex items-center space-x-2">
              <Calendar className="h-5 w-5 text-muted-foreground" />
              <span>Duration: {data.duration}</span>
            </div>
            <div className="flex items-center space-x-2">
              <GraduationCap className="h-5 w-5 text-muted-foreground" />
              <span>Total Credits: {data.credits}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Briefcase className="h-5 w-5 text-muted-foreground" />
              <span>Placement Rate: {data.statistics.placementRate}%</span>
            </div>
            <div className="flex items-center space-x-2">
              <Trophy className="h-5 w-5 text-muted-foreground" />
              <span>Avg. Salary: {data.statistics.averageSalary}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-1 md:grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
          <TabsTrigger value="faculty">Faculty</TabsTrigger>
          <TabsTrigger value="careers">Careers</TabsTrigger>
        </TabsList>
        <TabsContent value="overview">
          <Card>
            <CardHeader>
              <CardTitle>Program Highlights</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Key Features</h3>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Cutting-edge curriculum</li>
                    <li>Industry-aligned projects</li>
                    <li>State-of-the-art laboratories</li>
                    <li>International collaborations</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">
                    Learning Outcomes
                  </h3>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Strong theoretical foundation</li>
                    <li>Practical problem-solving skills</li>
                    <li>Effective communication abilities</li>
                    <li>Ethical and professional conduct</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="curriculum">
          <Card>
            <CardHeader>
              <CardTitle>Curriculum Overview</CardTitle>
              <CardDescription>
                Explore our comprehensive curriculum designed to prepare you for
                success.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2">
                {[1, 2, 3, 4].map((year) => (
                  <Card key={year}>
                    <CardHeader>
                      <CardTitle>Year {year}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {data.courses
                          .filter((course) => course.year === year)
                          .map((course, index) => (
                            <li
                              key={index}
                              className="flex items-center space-x-2"
                            >
                              <Book className="h-4 w-4 text-muted-foreground" />
                              <span>{course.name}</span>
                            </li>
                          ))}
                      </ul>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="faculty">
          <Card>
            <CardHeader>
              <CardTitle>Our Faculty</CardTitle>
              <CardDescription>
                Learn from industry experts and renowned academics.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {data.faculty.map((member, index) => (
                  <Card key={index}>
                    <CardContent className="flex flex-col items-center p-6">
                      <Avatar className="h-24 w-24 mb-4">
                        <AvatarImage src={member.image} alt={member.name} />
                        <AvatarFallback>
                          {member.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <h3 className="text-lg font-semibold">{member.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {member.role}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="careers">
          <Card>
            <CardHeader>
              <CardTitle>Career Opportunities</CardTitle>
              <CardDescription>
                Discover the diverse career paths available to our graduates.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <h3 className="text-lg font-semibold mb-4">
                    Popular Career Paths
                  </h3>
                  <ul className="space-y-2">
                    {data.careers.map((career, index) => (
                      <li key={index} className="flex items-center space-x-2">
                        <Briefcase className="h-4 w-4 text-muted-foreground" />
                        <span>{career}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-4">
                    Industry Statistics
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span>Placement Rate</span>
                        <span>{data.statistics.placementRate}%</span>
                      </div>
                      <Progress
                        value={data.statistics.placementRate}
                        className="w-full"
                      />
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span>Average Salary</span>
                        <span>{data.statistics.averageSalary}</span>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span>Internship Partners</span>
                        <span>{data.statistics.internshipPartners}+</span>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span>Research Publications</span>
                        <span>{data.statistics.researchPublications}+</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Card>
        <CardHeader>
          <CardTitle>Ready to Apply?</CardTitle>
          <CardDescription>
            Take the next step towards your future in {programName}.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center space-y-4">
          <Button size="lg">Apply Now</Button>
          <p className="text-sm text-muted-foreground">
            Have questions?{" "}
            <a href="/contact" className="underline">
              Contact our admissions team
            </a>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
