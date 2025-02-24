import { Suspense } from "react";
import { notFound } from "next/navigation";
import { getSkillExchangeListing } from "@/actions/skills.actions";
import type { Metadata } from "next";
import Loader1 from "@/components/Loader1";
import SkillExchangeListingContent from "./ListingContent";

export async function generateMetadata({
  params: paramsPromise,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const params = await paramsPromise;
  const listing = await getSkillExchangeListing(params.id);

  if (!listing) {
    return {
      title: "Listing Not Found",
    };
  }

  return {
    title: `${listing.offeredSkill} / ${listing.desiredSkill} | Skill Exchange`,
    description: listing.description,
  };
}

export default async function SkillExchangeListingPage({
  params: paramsPromise,
}: {
  params: Promise<{ id: string }>;
}) {
  const params = await paramsPromise;
  const listing = await getSkillExchangeListing(params.id);

  if (!listing) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">
        Skill Exchange Listing
      </h1>
      <Suspense
        fallback={
          <div>
            <Loader1 />
          </div>
        }
      >
        <SkillExchangeListingContent initialListing={listing} />
      </Suspense>
    </div>
  );
}
