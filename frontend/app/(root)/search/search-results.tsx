import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { searchContent } from "@/actions/search.actions";
import { ArrowRightCircleIcon, Frown, ScanFace, SearchCheckIcon } from "lucide-react";

export async function SearchResults({ query }: { query: string }) {
  if (!query) {
    return (
      <p className="flex gap-2 text-2xl m-4">
        <ScanFace className="mt-1" />
        Enter a search query to get started.
      </p>
    );
  }

  const results = await searchContent(query);

  if (results.length === 0) {
    return (
      <span className="flex text-2xl mb-4 gap-2">
        <Frown /> No results found for "{query}".
      </span>
    );
  }

  return (
    <>
      <span className="flex text-2xl mb-4 gap-2">
        <SearchCheckIcon />
        Results for {query}
      </span>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {results.map((result) => (
          <Card key={result.id}>
            <CardHeader>
              <CardTitle>{result.title}</CardTitle>
              <CardDescription>{result.type}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-2">{result.description}</p>
              <div className="flex justify-between items-center">
                <Badge className="p-2">{result.category}</Badge>
                <Link
                  href={result.link}
                  className="flex gap-2 text-primary hover:underline"
                >
                  <ArrowRightCircleIcon/>
                  View Details
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
}
