import { notFound } from "next/navigation";
import ClubDetails from "./club-details";
import prisma from "@/lib/prisma";
import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Boxes, CircleArrowLeft } from "lucide-react";
import Link from "next/link";

export async function generateMetadata({
  params: paramsPromise,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const params = await paramsPromise;

  const club = await prisma.club.findUnique({
    where: { id: params.id },
  });

  if (!club) {
    return {
      title: "Club Not Found",
    };
  }

  return {
    title: `${club.name} | Campus Clubs`,
    description: club.description,
  };
}

export default async function ClubPage({
  params: paramsPromise,
}: {
  params: Promise<{ id: string }>;
}) {
  const params = await paramsPromise;
  const club = await prisma.club.findUnique({
    where: { id: params.id },
    include: {
      members: {
        select: {
          id: true,
          name: true,
          avatarUrl: true,
        },
      },
      _count: {
        select: { members: true },
      },
    },
  });

  if (!club) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-around">
        <h1 className="flex gap-2 text-3xl font-bold mb-8 text-center">
          <span>{club.name} Club</span> <Boxes className="mt-2"/>
        </h1>
        <Link href={"/campus-life/clubs"}>
          <Button>
            Go Back <CircleArrowLeft />
          </Button>
        </Link>
      </div>
      <ClubDetails club={club} />
    </div>
  );
}
