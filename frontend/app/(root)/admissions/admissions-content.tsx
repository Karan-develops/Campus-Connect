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
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import {
  admissionProcess,
  faqItems,
  requirements,
} from "@/app/constants/admissions.constants";

const importantDates = [
  { date: new Date(2023, 7, 1), event: "Fall Application Opens" },
  { date: new Date(2023, 10, 1), event: "Early Decision Deadline" },
  { date: new Date(2024, 0, 15), event: "Regular Decision Deadline" },
  { date: new Date(2024, 2, 31), event: "Admission Decisions Released" },
  { date: new Date(2024, 4, 1), event: "Enrollment Deposit Due" },
];

export default function AdmissionsContent() {
  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <div className="space-y-12">
      <section>
        <h2 className="text-2xl font-semibold mb-4">Admission Process</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {admissionProcess.map((step) => (
            <Card key={step.step}>
              <CardHeader>
                <CardTitle>
                  Step {step.step}: {step.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{step.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Admission Requirements</h2>
        <Tabs defaultValue="Undergraduate" className="w-full">
          <TabsList>
            {requirements.map((req) => (
              <TabsTrigger key={req.program} value={req.program}>
                {req.program}
              </TabsTrigger>
            ))}
          </TabsList>
          {requirements.map((req) => (
            <TabsContent key={req.program} value={req.program}>
              <Card>
                <CardHeader>
                  <CardTitle>{req.program} Requirements</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc pl-5 space-y-2">
                    {req.items.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Important Dates</h2>
        <div className="flex flex-col md:flex-row gap-8">
          <Card className="flex-grow">
            <CardHeader>
              <CardTitle>Admissions Calendar</CardTitle>
            </CardHeader>
            <CardContent>
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border"
              />
            </CardContent>
          </Card>
          <Card className="flex-grow">
            <CardHeader>
              <CardTitle>Key Dates</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {importantDates.map((item, index) => (
                  <li key={index} className="flex items-center justify-between">
                    <span>{item.event}</span>
                    <Badge variant="outline">
                      {item.date.toLocaleDateString()}
                    </Badge>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">
          Frequently Asked Questions
        </h2>
        <Accordion type="single" collapsible className="w-full">
          {faqItems.map((item, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger>{item.question}</AccordionTrigger>
              <AccordionContent>{item.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      <section className="text-center">
        <h2 className="text-2xl font-semibold mb-4">Ready to Apply?</h2>
        <p className="mb-6">
          Start your journey with us today. Apply now to join our vibrant
          academic community.
        </p>
        <Button asChild size="lg">
          <Link href="/apply">
            Apply Now <ChevronRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </section>
    </div>
  );
}
