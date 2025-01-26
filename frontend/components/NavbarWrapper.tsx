import { currentUser } from "@clerk/nextjs/server";
import Navbar from "./Navbar";
import { syncUser } from "@/actions/user.actions";

export default async function NavbarWrapper() {
  const user = await currentUser();
  if(user){
    syncUser();
  }
  
  const userData = user ? {
    id: user.id,
    username: user.username,
    firstName: user.firstName,
    lastName: user.lastName,
    imageUrl: user.imageUrl,
    email: user.emailAddresses[0]?.emailAddress,
  } : null;

  return <Navbar user={userData} />;
}
