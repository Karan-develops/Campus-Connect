"use client";

import { useEffect, useState } from "react";
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
import Link from "next/link";
import Loader1 from "@/components/Loader1";

interface LearnMoreContentProps {
  programName: string;
}

interface ProgramData {
  description: string;
  duration: string;
  credits: number;
  statistics: {
    placementRate: number;
    averageSalary: string;
    internshipPartners: number;
    researchPublications: number;
  };
  courses: { year: number; name: string }[];
  faculty: { name: string; role: string; image: string }[];
  careers: string[];
}

export default function LearnMoreContent({
  programName,
}: LearnMoreContentProps) {
  const [programData, setProgramData] = useState<ProgramData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `/api/academic-info/${encodeURIComponent(programName)}`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const pData = await response.json();
        setProgramData(pData.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [programName]);

  if (loading) {
    return <div className="flex justify-center"><Loader1/></div>;
  }

  if (!programData) {
    return <div>Error loading program information.</div>;
  }

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Program Overview</CardTitle>
          <CardDescription>{programData.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="flex items-center space-x-2">
              <Calendar className="h-5 w-5 text-muted-foreground" />
              <span>Duration: {programData.duration}</span>
            </div>
            <div className="flex items-center space-x-2">
              <GraduationCap className="h-5 w-5 text-muted-foreground" />
              <span>Total Credits: {programData.credits}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Briefcase className="h-5 w-5 text-muted-foreground" />
              <span>
                Placement Rate: {programData.statistics.placementRate}%
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <Trophy className="h-5 w-5 text-muted-foreground" />
              <span>Avg. Salary: {programData.statistics.averageSalary}</span>
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
                        {programData.courses
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
                {programData.faculty.map((member, index) => (
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
                    {programData.careers.map((career, index) => (
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
                        <span>{programData.statistics.placementRate}%</span>
                      </div>
                      <Progress
                        value={programData.statistics.placementRate}
                        className="w-full"
                      />
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span>Average Salary</span>
                        <span>{programData.statistics.averageSalary}</span>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span>Internship Partners</span>
                        <span>
                          {programData.statistics.internshipPartners}+
                        </span>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span>Research Publications</span>
                        <span>
                          {programData.statistics.researchPublications}+
                        </span>
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
          <Button size="lg">
            <Link href={"/apply"}>Apply Now</Link>
          </Button>
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
