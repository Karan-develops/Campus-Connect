import { currentUser } from "@clerk/nextjs/server";
import Navbar from "./Navbar";
import { syncUser } from "@/actions/user.actions";

export default async function NavbarWrapper() {
  let clerkUser = await currentUser();

  if (!clerkUser) {
    return <Navbar user={null} />;
  }
  const dbUser = await syncUser();

  return <Navbar user={dbUser} />;
}
