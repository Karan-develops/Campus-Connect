"use client";

import type React from "react";

import { useState } from "react";
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
import { mockListings } from "@/app/constants/skill.constants";

export default function SkillExchangeContent() {
  const [searchQuery, setSearchQuery] = useState("");
  const [listings, setListings] = useState(mockListings);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const filteredListings = mockListings.filter(
      (listing) =>
        listing.offeredSkill
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        listing.desiredSkill.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setListings(filteredListings);
  };

  const handleCreateListing = (data: any) => {
    // Backend pe bhejna Hai
    console.log("New listing data:", data);
    // Demo Listings
    setListings([
      {
        id: listings.length + 1,
        ...data,
        user: {
          name: "Current User",
          avatar: "",
        },
        likes: 0,
        comments: 0,
      },
      ...listings,
    ]);
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
        <Dialog>
          <DialogTrigger asChild>
            <Button>Create Listing</Button>
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
                handleCreateListing(Object.fromEntries(formData));
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
            {listings.map((listing) => (
              <Card key={listing.id} className="flex flex-col">
                <CardHeader>
                  <div className="flex items-center space-x-4">
                    <Avatar>
                      <AvatarImage
                        src={listing.user.avatar}
                        alt={listing.user.name}
                      />
                      <AvatarFallback>
                        {listing.user.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-lg">
                        {listing.user.name}
                      </CardTitle>
                      <CardDescription>
                        {new Date().toLocaleDateString()}
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
                  <p className="text-sm text-gray-300">{listing.description}</p>
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
            ))}
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
