"use client";

import { useAuthStore } from "@/lib/store/authStore";
import Navbar from "./Navbar";

export default function NavbarWrapper() {
  const { user } = useAuthStore();

  if (user === null) {
    return <Navbar user={null} />;
  }

  return <Navbar user={user} />;
}
