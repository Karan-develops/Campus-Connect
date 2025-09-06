"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  ThumbsUp,
  MessageCircle,
  Share2,
  Trash2,
  CircleArrowLeft,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import type { SkillExchangeListing, Comment } from "@/types/skill-exchange";
import {
  likeListing,
  commentOnListing,
  deleteListing,
} from "@/actions/skills.actions";
import Link from "next/link";

interface SkillExchangeListingContentProps {
  initialListing: SkillExchangeListing;
}

export default function SkillExchangeListingContent({
  initialListing,
}: SkillExchangeListingContentProps) {
  const [listing, setListing] = useState<any>(initialListing);
  const [newComment, setNewComment] = useState("");
  const { toast } = useToast();

  const handleLike = async () => {
    try {
      const updatedListing = await likeListing(listing.id);
      setListing(updatedListing);
    } catch (error: any) {
      if (error.status === 400 && error.errorData === "Already liked") {
        toast({
          title: "Already Liked",
          description: "You have already liked this listing.",
          variant: "destructive",
        });
        return;
      }
      console.error("Error liking listing:", error);
      toast({
        title: "Error",
        description: "Failed to like listing. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleComment = async () => {
    try {
      const updatedListing = await commentOnListing(listing.id, newComment);
      setListing(updatedListing);
      setNewComment("");
    } catch (error) {
      console.error("Error adding comment:", error);
      toast({
        title: "Error",
        description: "Failed to add comment. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async () => {
    try {
      await deleteListing(listing.id);
      toast({
        title: "Success",
        description: "Listing deleted successfully.",
      });
      window.location.href = "/peers/skill-exchange";
    } catch (error) {
      console.error("Error deleting listing:", error);
      toast({
        title: "Error",
        description: "Failed to delete listing. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader className="flex">
          <div className="flex items-center space-x-4">
            <Avatar>
              <AvatarImage
                src={listing.user.avatarUrl || undefined}
                alt={listing.user.name || ""}
              />
              <AvatarFallback>
                {listing.user.name ? listing.user.name.charAt(0) : "U"}
              </AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-lg">{listing.user.name}</CardTitle>
              <CardDescription>
                {new Date(listing.createdAt).toLocaleDateString()}
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2 mb-4">
            <Badge variant="secondary">Offering: {listing.offeredSkill}</Badge>
            <Badge variant="outline">Seeking: {listing.desiredSkill}</Badge>
          </div>
          <p className="text-lg mb-4">{listing.description}</p>
          <div className="flex space-x-4">
            <Button variant="outline" size="sm" onClick={handleLike}>
              <ThumbsUp className="mr-2 h-4 w-4" />
              {listing.likes}
            </Button>
            <Button variant="outline" size="sm">
              <MessageCircle className="mr-2 h-4 w-4" />
              {listing.comments.length}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                const shareText = `https://campus-connect-karan.vercel.app/peers/skill-exchange/listing/${listing.id}`;
                navigator.clipboard.writeText(shareText);
                toast({
                  title: "Success",
                  description: "Listing link copied! Share with Friends✅.",
                });
              }}
            >
              <Share2 className="mr-2 h-4 w-4" />
              Share
            </Button>
          </div>
        </CardContent>
        <CardFooter className="flex gap-5">
          <Button variant="destructive" onClick={handleDelete}>
            <Trash2 className="mr-2 h-4 w-4" />
            Delete Listing
          </Button>
          <Button>
            <Link href={"/peers/skill-exchange"} className="flex gap-1">
              <CircleArrowLeft className="mt-[3px]" />
              Go Back to All Listings
            </Link>
          </Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Comments - {listing.comments.length}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {listing.comments.map((comment: Comment) => (
              <div key={comment.id} className="flex items-start space-x-4">
                <Avatar>
                  <AvatarImage
                    src={comment.user.avatarUrl || undefined}
                    alt={comment.user.name || ""}
                  />
                  <AvatarFallback>
                    {comment.user.name ? comment.user.name.charAt(0) : "U"}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold">{comment.user.name}</p>
                  <p className="text-sm text-gray-200">{comment.content}</p>
                  <p className="text-xs text-gray-400">
                    {new Date(comment.createdAt).toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter>
          <div className="w-full space-y-4">
            <Textarea
              placeholder="Add a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
            <Button onClick={handleComment}>Post Comment</Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
