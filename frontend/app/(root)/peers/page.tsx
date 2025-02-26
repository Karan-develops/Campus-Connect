import { Metadata } from "next";
import PeersContent from "./peers-content";
import { Suspense } from "react";
import Loader1 from "@/components/Loader1";
import { getUsers } from "@/actions/peers.actions";
import LoginPage from "./login-page";
import { currentUser } from "@clerk/nextjs/server";

export const metadata: Metadata = {
  title: "Peers | Campus Connect",
  description:
    "Connect with your peers, find collaborators, and explore exciting projects at Campus Connect.",
};

export default async function PeersPage() {
  const user = await currentUser();

  if (!user) {
    return <LoginPage />;
  }
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
