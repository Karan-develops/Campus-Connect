import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Home } from "lucide-react";

export default function ApplicationSuccessPage() {
  return (
    <div className="container mx-auto px-4 py-8 my-36">
      <Card className="max-w-lg mx-auto border !border-green-500">
        <CardHeader>
          <CardTitle>Application Submitted Successfully ✅</CardTitle>
          <CardDescription>
            Thank you for applying to our college!
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>
            Your application has been received and is now being processed. We
            will review your information and get back to you as soon as
            possible.
          </p>
          <p>
            If you have any questions or need to provide additional information,
            please don't hesitate to contact our admissions office.
          </p>
          <div className="flex justify-center">
            <Button asChild>
              <Link href="/"><Home/>Return to Homepage</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
