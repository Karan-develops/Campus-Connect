import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="container mx-auto px-4 py-8 flex items-center justify-center min-h-screen">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl text-center">
            Welcome to Peers
          </CardTitle>
          <CardDescription className="text-center">
            Connect with your classmates and explore exciting projects
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center">
          <p className="mb-4 text-center">
            Please sign in to access the Peers page and connect with other
            students.
          </p>
          <Button variant="default" className="size-fit">
            <Link href={"/sign-in"}>Sign In</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
