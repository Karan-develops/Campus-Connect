"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { User } from "@prisma/client";
import { getMessages, sendMessage } from "@/actions/message.actions";
import { ChevronRight } from "lucide-react";

interface MessageContentProps {
  otherUser: User;
}

export default function MessageContent({
  otherUser
}: MessageContentProps) {
  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    const fetchMessages = async () => {
      const fetchedMessages = await getMessages(otherUser.id);
      setMessages(fetchedMessages);
    };
    fetchMessages();
  }, [otherUser.id]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim()) {
      const sentMessage = await sendMessage(
        otherUser.id,
        newMessage
      );
      setMessages([...messages, sentMessage]);
      setNewMessage("");
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Avatar>
            <AvatarImage
              src={otherUser.avatarUrl || undefined}
              alt={otherUser.name}
            />
            <AvatarFallback>
              {otherUser.name.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <span>{otherUser.name}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="h-[400px] overflow-y-auto">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`mb-2 ${
              message.senderId === otherUser.id ? "text-left" : "text-right"
            }`}
          >
            <div
              className={`inline-block p-2 rounded-lg ${
                message.senderId === otherUser.id
                  ? "bg-gray-200 text-gray-800"
                  : "bg-blue-500 text-white"
              }`}
            >
              {message.content}
            </div>
          </div>
        ))}
      </CardContent>
      <CardFooter>
        <form onSubmit={handleSendMessage} className="flex w-full space-x-2">
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-grow"
          />
          <Button type="submit">
            Send
            <ChevronRight />
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
}
