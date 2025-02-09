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
import { useEffect, useState } from "react";
import Loader1 from "@/components/Loader1";

export default function PlacementsContent() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/placements");
        const json = await res.json();
        setData(json);
      } catch (error) {
        setLoading(false);
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  if (loading) {
    return (
      <div className="flex justify-center">
        <Loader1 />
      </div>
    );
  }

  if (!data) {
    return <div>Error loading program information.</div>;
  }
  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-2xl font-semibold mb-4">Placement Statistics</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {data.placements.map((stat: any) => (
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
          {data.recruiters.map((recruiter: any) => (
            <Card
              key={recruiter.name}
              className="flex flex-col items-center justify-center p-4"
            >
              <img
                src={recruiter.logo || ""}
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
                {data.successStories
                  .filter((story: any) => story.batch === year)
                  .map((story: any) => (
                    <Card key={story.name}>
                      <CardHeader>
                        <div className="flex items-center space-x-4">
                          <Avatar>
                            <AvatarImage src={story.image} alt={story.name} />
                            <AvatarFallback>
                              {story.name
                                .split(" ")
                                .map((n: any) => n[0])
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
