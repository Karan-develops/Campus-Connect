"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

const streams = [
  {
    name: "B.Tech Computer Science and Engineering",
    shortName: "CSE",
    description:
      "Learn cutting-edge technologies and software development practices.",
    duration: "4 years",
    careers: ["Software Engineer", "Data Scientist", "Developer"],
    image: "https://plus.unsplash.com/premium_photo-1661872817492-fd0c30404d74?q=80&w=2087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "B.Tech Information Technology",
    shortName: "IT",
    description:
      "Focus on information systems, networks, and database management.",
    duration: "4 years",
    careers: ["Systems Analyst", "Network Administrator", "IT Consultant"],
    image: "https://plus.unsplash.com/premium_photo-1681426687411-21986b0626a8?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "B.Tech Electronics and Communication",
    shortName: "ECE",
    description:
      "Study electronic systems, signal processing, and communication technologies.",
    duration: "4 years",
    careers: [
      "Electronics Engineer",
      "Telecommunications Specialist",
      "IoT Developer",
    ],
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Bachelor of Commerce",
    shortName: "BCom",
    description: "Learn accounting, finance, and business management principles.",
    duration: "3 years",
    careers: ["Accountant", "Financial Analyst", "Business Consultant"],
    image: "https://images.unsplash.com/photo-1640197618317-dc379a226fbe?q=80&w=1937&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Bachelor of Business Administration",
    shortName: "BBA",
    description: "Develop management skills and business acumen. Enhance your leadership and strategic thinking abilities.",
    duration: "3 years",
    careers: ["Business Analyst", "Marketing Manager", "Entrepreneur"],
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "B.Tech Artifical Intelligence and Data Science",
    shortName: "AI-DS",
    description:
      "Gain a strong foundation in artificial intelligence and data science.",
    duration: "4 years",
    careers: [
      "Software Developer",
      "Data Analyst",
      "Machine Learning Engineer",
    ],
    image: "https://plus.unsplash.com/premium_photo-1676637656166-cb7b3a43b81a?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "B.Tech Mechanical Engineering",
    shortName: "ME",
    description:
      "Learn about the design, analysis, and manufacturing of mechanical systems.",
    duration: "4 years",
    careers: ["Mechanical Engineer", "Automotive Engineer", "Aerospace Engineer"],
    image: "https://images.unsplash.com/photo-1581091215367-9b6c00b3035a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "B.Tech AI and Machine Learning",
    shortName: "AI-ML",
    description:
      "Gain a strong foundation in artificial intelligence and machine learning.",
    duration: "4 years",
    careers: ["Software Developer", "Data Analyst", "Machine Learning Engineer"],
    image: "https://plus.unsplash.com/premium_photo-1682002216092-efdf11860aa1?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

export default function AcademicsContent() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {streams.map((stream) => (
        <Card key={stream.shortName} className="flex flex-col">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              {stream.name}
              <Badge variant="secondary">{stream.shortName}</Badge>
            </CardTitle>
            <CardDescription>{stream.description}</CardDescription>
          </CardHeader>
          <CardContent className="flex-grow">
            <img
              src={stream.image || "/placeholder.svg"}
              alt={`${stream.name} illustration`}
              className="w-full h-40 object-cover rounded-md mb-4"
            />
            <div className="space-y-2">
              <p>
                <strong>Duration:</strong> {stream.duration}
              </p>
              <p>
                <strong>Career Opportunities:</strong>
              </p>
              <ul className="list-disc list-inside">
                {stream.careers.map((career, index) => (
                  <li key={index}>{career}</li>
                ))}
              </ul>
            </div>
          </CardContent>
          <div className="p-4 mt-auto">
            <Button className="w-full" asChild>
              <Link href={`/academics/${encodeURIComponent(stream.name)}`}>
                Explore More <ChevronRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </Card>
      ))}
    </div>
  );
}
