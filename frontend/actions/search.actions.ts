"use server";

import prisma from "@/lib/prisma";

type SearchResult = {
  id: string;
  title: string;
  description: string;
  type: "Club" | "Event" | "User" | "SkillExchange";
  category: string;
  link: string;
};

export async function searchContent(query: string): Promise<SearchResult[]> {
  try {
    const clubs = await prisma.club.findMany({
      where: {
        OR: [
          { name: { contains: query, mode: "insensitive" } },
          { description: { contains: query, mode: "insensitive" } },
        ],
      },
      take: 10,
    });

    const events = await prisma.event.findMany({
      where: {
        OR: [
          { name: { contains: query, mode: "insensitive" } },
          { description: { contains: query, mode: "insensitive" } },
        ],
      },
      take: 10,
    });

    const users = await prisma.user.findMany({
      where: {
        OR: [
          { name: { contains: query, mode: "insensitive" } },
          { username: { contains: query, mode: "insensitive" } },
          { major: { contains: query, mode: "insensitive" } },
        ],
      },
      take: 10,
    });

    const skillExchanges = await prisma.skillExchange.findMany({
      where: {
        OR: [
          { offeredSkill: { contains: query, mode: "insensitive" } },
          { desiredSkill: { contains: query, mode: "insensitive" } },
          { description: { contains: query, mode: "insensitive" } },
        ],
      },
      take: 10,
    });

    const results: SearchResult[] = [
      ...clubs.map((club) => ({
        id: club.id,
        title: club.name,
        description: club.description,
        type: "Club" as const,
        category: club.category,
        link: `/campus-life/clubs/${club.id}`,
      })),
      ...events.map((event) => ({
        id: event.id,
        title: event.name,
        description: event.description,
        type: "Event" as const,
        category: "Event",
        link: `/campus-life/events/${event.id}`,
      })),
      ...users.map((user) => ({
        id: user.id,
        title: user.name || user.username || "",
        description: `${user.major || "Student"}, ${user.year || ""}`,
        type: "User" as const,
        category: "Profile",
        link: `/profile/${user.username}`,
      })),
      ...skillExchanges.map((exchange) => ({
        id: exchange.id,
        title: `${exchange.offeredSkill} for ${exchange.desiredSkill}`,
        description: exchange.description,
        type: "SkillExchange" as const,
        category: "Skill Exchange",
        link: `/peers/skill-exchange/listing/${exchange.id}`,
      })),
    ];

    return results.sort((a, b) => a.title.localeCompare(b.title));
  } catch (error) {
    console.log("Error Searching Results:", error);
    throw new Error("Internal Server Error");
  }
}
