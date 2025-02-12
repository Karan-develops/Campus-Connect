import { Metadata } from "next";
import PeersContent from "./peers-content";
import { getUsers } from "@/actions/user.actions";
import { Suspense } from "react";
import Loader1 from "@/components/Loader1";

export const metadata: Metadata = {
  title: "Peers | Campus Diary",
  description:
    "Connect with your peers, find collaborators, and explore exciting projects at Campus Diary.",
};

export default async function PeersPage() {
  const users = await getUsers();
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">
        Connect with Peers
      </h1>
      <Suspense fallback={<Loader1 />}>
        <PeersContent initialUsers={users} />
      </Suspense>
    </div>
  );
}
