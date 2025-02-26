import { Suspense } from "react";
import MessageContent from "./messages-content";
import type { Metadata } from "next";
import { getOtherUser } from "@/actions/message.actions";
import Loader1 from "@/components/Loader1";

export const metadata: Metadata = {
  title: "Messages | Campus Connect",
  description: "Chat with your peers at Campus Connect.",
};

export default async function MessagePage({
  params: paramsPromise,
}: {
  params: Promise<{ identifier: string }>;
}) {
  const params = await paramsPromise;
  const otherUser = await getOtherUser(params.identifier);
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">
        Chat with {otherUser.name}
      </h1>
      <Suspense fallback={<Loader1 />}>
        <MessageContent otherUser={otherUser} />
      </Suspense>
    </div>
  );
}
