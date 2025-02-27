import { Suspense } from "react";
import { SearchResults } from "./search-results";
import { SearchInput } from "./search-input";
import type { Metadata } from "next";
import Loader1 from "@/components/Loader1";

export const metadata: Metadata = {
  title: "Search | Campus Connect",
  description: "Search for clubs, events, and peers across Campus Connect.",
};

export default async function SearchPage({
  searchParams: searchParamsPromise,
}: {
  searchParams: Promise<{ q: string }>;
}) {
  const searchParams = await searchParamsPromise;
  const query = searchParams.q;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Search Campus Connect</h1>
      <SearchInput initialQuery={query} />
      <Suspense
        fallback={
          <div>
            <Loader1 />
          </div>
        }
      >
        <SearchResults query={query} />
      </Suspense>
    </div>
  );
}
