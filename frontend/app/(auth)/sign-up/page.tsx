"use client";

import type React from "react";

import { useState } from "react";
import { useSignUp } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Github, Mail } from "lucide-react";
import Link from "next/link";

export default function SignUpPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { isLoaded, signUp, setActive } = useSignUp();

  if (!isLoaded) {
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const result = await signUp.create({
        emailAddress: email,
        password,
        firstName,
        lastName,
      });

      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId });
        router.push("/");
      } else {
        console.error("Sign up result", result);
        setError("An error occurred during sign up. Please try again.");
      }
    } catch (err: any) {
      console.error("Error during sign up:", err);
      setError(
        err.errors[0]?.message ||
          "An error occurred during sign up. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleOAuthSignUp = async (
    strategy: "oauth_github" | "oauth_google"
  ) => {
    setIsLoading(true);
    setError("");

    try {
      await signUp.authenticateWithRedirect({
        strategy,
        redirectUrl: "/sso-callback",
        redirectUrlComplete: "/",
      });
    } catch (err: any) {
      console.error("Error during OAuth sign up:", err);
      setError(
        err.errors[0]?.message ||
          "An error occurred during sign up. Please try again."
      );
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Sign Up</CardTitle>
        <CardDescription>
          Create a new account to join Campus Connect
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && (
            <Alert variant="destructive">
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Signing Up..." : "Sign Up"}
          </Button>
        </form>
        <div className="mt-4 flex items-center justify-between">
          <hr className="w-full" />
          <span className="px-2 text-gray-500">or</span>
          <hr className="w-full" />
        </div>
        <div className="mt-4 space-y-2">
          <Button
            type="button"
            variant="outline"
            className="w-full"
            onClick={() => handleOAuthSignUp("oauth_github")}
            disabled={isLoading}
          >
            <Github className="mr-2 h-4 w-4" /> Sign up with GitHub
          </Button>
          <Button
            type="button"
            variant="outline"
            className="w-full"
            onClick={() => handleOAuthSignUp("oauth_google")}
            disabled={isLoading}
          >
            <Mail className="mr-2 h-4 w-4" /> Sign up with Google
          </Button>
        </div>
      </CardContent>
      <CardFooter>
        <Link href="/sign-in" className="text-sm text-gray-400 hover:underline">
          Already have an account? Sign In
        </Link>
      </CardFooter>
    </Card>
  );
}
