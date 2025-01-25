"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const placementStats = [
  { year: "2023", percentage: 95, averageSalary: "₹12.5 LPA" },
  { year: "2022", percentage: 92, averageSalary: "₹11.8 LPA" },
  { year: "2021", percentage: 88, averageSalary: "₹10.5 LPA" },
];

const topRecruiters = [
  { name: "TechCorp", logo: "/placeholder.svg?height=100&width=100" },
  { name: "InnovaSoft", logo: "/placeholder.svg?height=100&width=100" },
  { name: "DataDynamics", logo: "/placeholder.svg?height=100&width=100" },
  { name: "CloudNine", logo: "/placeholder.svg?height=100&width=100" },
  { name: "AI Solutions", logo: "/placeholder.svg?height=100&width=100" },
  { name: "CyberGuard", logo: "/placeholder.svg?height=100&width=100" },
];

const successStories = [
  {
    name: "Priya Sharma",
    batch: "2023",
    company: "TechCorp",
    role: "Software Engineer",
    image: "/placeholder.svg?height=100&width=100",
    quote:
      "The placement cell at our college provided excellent guidance and opportunities, helping me land my dream job at TechCorp.",
  },
  {
    name: "Rahul Verma",
    batch: "2022",
    company: "DataDynamics",
    role: "Data Scientist",
    image: "/placeholder.svg?height=100&width=100",
    quote:
      "The skills I gained during my time at college were instrumental in securing a position as a Data Scientist at DataDynamics.",
  },
  {
    name: "Ananya Patel",
    batch: "2021",
    company: "AI Solutions",
    role: "Machine Learning Engineer",
    image: "/placeholder.svg?height=100&width=100",
    quote:
      "The exposure to cutting-edge technologies and industry partnerships at our college opened up amazing career opportunities for me.",
  },
];

export default function PlacementsContent() {
  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-2xl font-semibold mb-4">Placement Statistics</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {placementStats.map((stat) => (
            <Card key={stat.year}>
              <CardHeader>
                <CardTitle>{stat.year} Placements</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span>Placement Percentage</span>
                    <Badge variant="secondary">{stat.percentage}%</Badge>
                  </div>
                  <Progress value={stat.percentage} className="w-full" />
                  <p className="text-sm text-muted-foreground">
                    Average Salary: {stat.averageSalary}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Top Recruiters</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
          {topRecruiters.map((recruiter) => (
            <Card
              key={recruiter.name}
              className="flex flex-col items-center justify-center p-4"
            >
              <img
                src={recruiter.logo || "/placeholder.svg"}
                alt={`${recruiter.name} logo`}
                className="w-16 h-16 object-contain mb-2"
              />
              <p className="text-sm font-medium text-center">
                {recruiter.name}
              </p>
            </Card>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Success Stories</h2>
        <Tabs defaultValue="2023" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="2023">2023</TabsTrigger>
            <TabsTrigger value="2022">2022</TabsTrigger>
            <TabsTrigger value="2021">2021</TabsTrigger>
          </TabsList>
          {["2023", "2022", "2021"].map((year) => (
            <TabsContent key={year} value={year}>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {successStories
                  .filter((story) => story.batch === year)
                  .map((story) => (
                    <Card key={story.name}>
                      <CardHeader>
                        <div className="flex items-center space-x-4">
                          <Avatar>
                            <AvatarImage src={story.image} alt={story.name} />
                            <AvatarFallback>
                              {story.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <CardTitle>{story.name}</CardTitle>
                            <CardDescription>
                              {story.role} at {story.company}
                            </CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground">
                          &ldquo;{story.quote}&rdquo;
                        </p>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </section>
    </div>
  );
}
