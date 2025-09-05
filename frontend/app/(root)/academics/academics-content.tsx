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
import { streams } from "@/app/constants/academicStreams.constants";
import Image from "next/image";

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
            <Image
              src={stream.image || ""}
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
