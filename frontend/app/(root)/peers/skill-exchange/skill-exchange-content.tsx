"use client";

import type React from "react";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, MessageCircle, ThumbsUp, Share2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface SkillExchangeListing {
  id: string;
  offeredSkill: string;
  desiredSkill: string;
  description: string;
  user: {
    name: string | null;
    avatarUrl: string | null;
  };
  likes: number;
  comments: number;
  createdAt: string;
}

export default function SkillExchangeContent() {
  const [searchQuery, setSearchQuery] = useState("");
  const [listings, setListings] = useState<SkillExchangeListing[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchListings();
  }, []);

  const fetchListings = async (query = "") => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `/api/skill-exchange${query ? `?query=${query}` : ""}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch listings");
      }
      const data = await response.json();
      setListings(data);
    } catch (error) {
      console.error("Error fetching listings:", error);
      toast({
        title: "Error",
        description: "Failed to fetch listings. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchListings(searchQuery);
  };

  const handleCreateListing = async (data: {
    offeredSkill: string;
    desiredSkill: string;
    description: string;
  }) => {
    try {
      const response = await fetch("/api/skill-exchange", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to create listing");
      }

      const newListing = await response.json();
      setListings([newListing, ...listings]);
      toast({
        title: "Success",
        description: "Your listing has been created successfully.",
      });
      setIsDialogOpen(false);
    } catch (error) {
      console.error("Error creating listing:", error);
      toast({
        title: "Error",
        description: "Failed to create listing. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-8">
      <Card className="bg-gradient-to-r from-gray-800 to-gray-900 text-white">
        <CardHeader>
          <CardTitle className="text-2xl">
            Welcome to the Skill Exchange Hub!
          </CardTitle>
          <CardDescription className="text-gray-100">
            Share your skills, learn from others, and grow together. What would
            you like to learn today?
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSearch} className="flex space-x-2">
            <Input
              type="search"
              placeholder="Search skills..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-gray-900 text-white"
            />
            <Button type="submit" variant="secondary">
              <Search className="mr-2 h-4 w-4" /> Search
            </Button>
          </form>
        </CardContent>
      </Card>

      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Skill Exchange Listings</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setIsDialogOpen(true)}>
              Create Listing
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create a New Skill Exchange Listing</DialogTitle>
              <DialogDescription>
                Share what you can teach and what you'd like to learn in return.
              </DialogDescription>
            </DialogHeader>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                handleCreateListing({
                  offeredSkill: formData.get("offeredSkill") as string,
                  desiredSkill: formData.get("desiredSkill") as string,
                  description: formData.get("description") as string,
                });
              }}
            >
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="offeredSkill" className="text-right">
                    I can teach
                  </Label>
                  <Input
                    id="offeredSkill"
                    name="offeredSkill"
                    className="col-span-3"
                    required
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="desiredSkill" className="text-right">
                    I want to learn
                  </Label>
                  <Input
                    id="desiredSkill"
                    name="desiredSkill"
                    className="col-span-3"
                    required
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="description" className="text-right">
                    Description
                  </Label>
                  <Textarea
                    id="description"
                    name="description"
                    className="col-span-3"
                    required
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Create Listing</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList>
          <TabsTrigger value="all">All Listings</TabsTrigger>
          <TabsTrigger value="offering">Offering</TabsTrigger>
          <TabsTrigger value="seeking">Seeking</TabsTrigger>
        </TabsList>
        <TabsContent value="all">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {isLoading ? (
              <p>Loading listings...</p>
            ) : listings.length === 0 ? (
              <p>No listings found.</p>
            ) : (
              listings.map((listing) => (
                <Card key={listing.id} className="flex flex-col">
                  <CardHeader>
                    <div className="flex items-center space-x-4">
                      <Avatar>
                        {/* FIXME: */}
                        {/* <AvatarImage
                          src={listing.user.avatarUrl || undefined}
                          alt={listing.user.name || ""}
                        /> */}
                        <AvatarFallback>
                          {listing.user.name
                            ? listing.user.name.charAt(0)
                            : "U"}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-lg">
                          {listing.user.name}
                        </CardTitle>
                        <CardDescription>
                          {new Date(listing.createdAt).toLocaleDateString()}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <div className="flex justify-between mb-4">
                      <Badge variant="secondary">
                        Offering: {listing.offeredSkill}
                      </Badge>
                      <Badge variant="outline">
                        Seeking: {listing.desiredSkill}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-300">
                      {listing.description}
                    </p>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="ghost" size="sm">
                      <ThumbsUp className="mr-2 h-4 w-4" />
                      {listing.likes}
                    </Button>
                    <Button variant="ghost" size="sm">
                      <MessageCircle className="mr-2 h-4 w-4" />
                      {listing.comments}
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Share2 className="mr-2 h-4 w-4" />
                      Share
                    </Button>
                  </CardFooter>
                </Card>
              ))
            )}
          </div>
        </TabsContent>
        <TabsContent value="offering">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {listings.map((listing) => (
              <Card key={listing.id} className="flex flex-col">
                <CardHeader>
                  <CardTitle>{listing.offeredSkill}</CardTitle>
                  <CardDescription>
                    Offered by {listing.user.name}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-sm text-gray-600">{listing.description}</p>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" size="sm">
                    Contact
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="seeking">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {listings.map((listing) => (
              <Card key={listing.id} className="flex flex-col">
                <CardHeader>
                  <CardTitle>{listing.desiredSkill}</CardTitle>
                  <CardDescription>
                    Sought by {listing.user.name}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-sm text-gray-600">{listing.description}</p>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" size="sm">
                    Offer Help
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
