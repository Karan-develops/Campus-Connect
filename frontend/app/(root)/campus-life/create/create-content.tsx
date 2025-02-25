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
import { useToast } from "@/hooks/use-toast";
import DynamicForm, { FormField } from "@/components/CreateForm";

const eventFields: FormField[] = [
  { name: "name", label: "Event Name", type: "text" },
  { name: "date", label: "Event Date - [ 01 - 10 - 20XX ]", type: "text" },
  { name: "location", label: "Location", type: "text" },
  { name: "description", label: "Description", type: "textarea" },
];

const clubFields: FormField[] = [
  { name: "name", label: "Club Name", type: "text" },
  {
    name: "category",
    label: "Category",
    type: "select",
    options: ["Academic", "Cultural", "Sports", "Other"],
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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const handleSubmit = async (data: Record<string, string>) => {
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: activeTab,
          data,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create item");
      }

      const result = await response.json();

      toast({
        title: "Success",
        description: `Your ${activeTab} has been created successfully.`,
      });

      router.push(`/campus-life/${activeTab}s`);
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        title: "Error",
        description: "There was an error creating your item. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
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
              submitButtonText={isSubmitting ? "Creating..." : "Create Event"}
              isSubmitting={isSubmitting}
            />
          </TabsContent>
          <TabsContent value="club">
            <DynamicForm
              fields={clubFields}
              onSubmit={handleSubmit}
              submitButtonText={isSubmitting ? "Creating..." : "Create Club"}
              isSubmitting={isSubmitting}
            />
          </TabsContent>
          <TabsContent value="sport">
            <DynamicForm
              fields={sportFields}
              onSubmit={handleSubmit}
              submitButtonText={isSubmitting ? "Creating..." : "Create Sport"}
              isSubmitting={isSubmitting}
            />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
