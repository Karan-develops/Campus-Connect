import { currentUser } from "@clerk/nextjs/server";
import Navbar from "./Navbar";
import { syncUser } from "@/actions/user.actions";

export default async function NavbarWrapper() {
  let clerkUser = null;
  try {
    clerkUser = await currentUser();
  } catch (error) {
    console.error("Error fetching current user:", error);
  }

  const defaultUserData = {
    id: "",
    username: null,
    firstName: null,
    lastName: null,
    imageUrl: "",
    email: "",
  };

  if (!clerkUser) {
    return <Navbar user={null} />;
  }

  try {
    const dbUser = await syncUser();
    const userData = {
      id: dbUser?.id || "",
      username: dbUser?.username || null,
      firstName: clerkUser.firstName,
      lastName: clerkUser.lastName,
      imageUrl: clerkUser.imageUrl,
      email: dbUser?.email || clerkUser.emailAddresses[0]?.emailAddress || "",
    };

    return <Navbar user={userData} />;
  } catch (error) {
    console.error("Error in NavbarWrapper:", error);
    return <Navbar user={defaultUserData} />;
  }
}
