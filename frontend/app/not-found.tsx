import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FileQuestion, Home, PhoneForwarded } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white px-4">
      <div className="text-center">
        <div className="mb-8 flex justify-center">
          <FileQuestion className="h-32 w-32 text-primary animate-pulse" />
        </div>
        <h1 className="text-5xl font-bold mb-4">404</h1>
        <h2 className="text-3xl font-semibold mb-4">Page Not Found</h2>
        <p className="text-xl mb-8">
          Oops! The page you're looking for doesn't exist.
        </p>
        <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
          <Button asChild className="w-full sm:w-auto">
            <Link href="/">
              <Home className="mr-2 h-4 w-4" />
              Go to Homepage
            </Link>
          </Button>
          <Button asChild variant="outline" className="w-full sm:w-auto">
            <Link href="/contact">
              <PhoneForwarded className="mr-2 h-4 w-4" />
              Contact US
            </Link>
          </Button>
        </div>
        <p className="mt-8 text-gray-400">
          If you believe this is a mistake, please{" "}
          <Link
            href="/contact"
            className="text-primary hover:underline text-emerald-500"
          >
            contact our support team
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
