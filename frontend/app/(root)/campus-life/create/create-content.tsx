"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DynamicForm, { type FormField } from "@/components/CreateForm";
import { useToast } from "@/hooks/use-toast";

const eventFields: FormField[] = [
  { name: "name", label: "Event Name", type: "text" },
  { name: "date", label: "Event Date", type: "text" },
  {
    name: "category",
    label: "Category",
    type: "select",
    options: ["Academic", "Cultural", "Career"],
  },
  { name: "location", label: "Location", type: "text" },
  { name: "description", label: "Description", type: "textarea" },
];

const clubFields: FormField[] = [
  { name: "name", label: "Club Name", type: "text" },
  {
    name: "category",
    label: "Category",
    type: "select",
    options: ["Academic", "Cultural", "Sports", "Community Service"],
  },
  { name: "description", label: "Description", type: "textarea" },
  { name: "contactEmail", label: "Contact Email", type: "text" },
];

const sportFields: FormField[] = [
  { name: "name", label: "Sport Name", type: "text" },
  {
    name: "type",
    label: "Type",
    type: "select",
    options: ["Individual", "Team"],
  },
  { name: "description", label: "Description", type: "textarea" },
  { name: "coach", label: "Coach Name", type: "text" },
];

export default function CreateContent() {
  const [activeTab, setActiveTab] = useState("event");
  const router = useRouter();

  const { toast } = useToast();

  const handleSubmit = async (data: Record<string, string>) => {
    // TODO:
    // Baadme backend pe bhejna hai
    console.log("Form submitted:", activeTab, data);

    toast({
      title: "default",
      description: `Your ${activeTab} has been created successfully.`,
    });

    // FIXME:
    router.push(`/${activeTab}s`);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create New {activeTab}</CardTitle>
        <CardDescription>
          Create a new event, student club, or sport.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="event">Event</TabsTrigger>
            <TabsTrigger value="club">Student Club</TabsTrigger>
            <TabsTrigger value="sport">Sport</TabsTrigger>
          </TabsList>
          <TabsContent value="event">
            <DynamicForm
              fields={eventFields}
              onSubmit={handleSubmit}
              submitButtonText="Create Event"
            />
          </TabsContent>
          <TabsContent value="club">
            <DynamicForm
              fields={clubFields}
              onSubmit={handleSubmit}
              submitButtonText="Create Club"
            />
          </TabsContent>
          <TabsContent value="sport">
            <DynamicForm
              fields={sportFields}
              onSubmit={handleSubmit}
              submitButtonText="Create Sport"
            />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
