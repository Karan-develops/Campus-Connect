"use client";

import { useAuthStore } from "@/lib/store/authStore";
import Navbar from "./Navbar";

export default function NavbarWrapper() {
  const { user } = useAuthStore();

  return <Navbar user={user} />;
}
