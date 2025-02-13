"use client";

import { useAuthStore } from "@/lib/store/authStore";
import Navbar from "./Navbar";

export default function NavbarWrapper() {
  const { user, isLoading } = useAuthStore();

  if (user === null) {
    return <Navbar user={null} isLoading={isLoading} />;
  }

  return <Navbar user={user} isLoading={isLoading} />;
}
