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

const streams = [
  {
    name: "B.Tech Computer Science and Engineering",
    shortName: "CSE",
    description:
      "Learn cutting-edge technologies and software development practices.",
    duration: "4 years",
    careers: ["Software Engineer", "Data Scientist", "AI/ML Engineer"],
    image: "",
  },
  {
    name: "B.Tech Information Technology",
    shortName: "IT",
    description:
      "Focus on information systems, networks, and database management.",
    duration: "4 years",
    careers: ["Systems Analyst", "Network Administrator", "IT Consultant"],
    image: "",
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
    image: "",
  },
  {
    name: "Bachelor of Arts",
    shortName: "BA",
    description: "Explore humanities, social sciences, and liberal arts.",
    duration: "3 years",
    careers: ["Journalist", "Teacher", "Social Worker"],
    image: "",
  },
  {
    name: "Bachelor of Business Administration",
    shortName: "BBA",
    description: "Develop management skills and business acumen.",
    duration: "3 years",
    careers: ["Business Analyst", "Marketing Manager", "Entrepreneur"],
    image: "",
  },
  {
    name: "B.Sc Computer Science",
    shortName: "BCS",
    description:
      "Gain a strong foundation in computer science theory and practice.",
    duration: "3 years",
    careers: [
      "Software Developer",
      "Database Administrator",
      "Cybersecurity Analyst",
    ],
    image: "",
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
            <Button className="w-full">
              Learn More <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </Card>
      ))}
    </div>
  );
}
