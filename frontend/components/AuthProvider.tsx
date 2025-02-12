"use client";

import { type ReactNode, useEffect } from "react";
import { useAuthStore } from "@/lib/store/authStore";
import { useUser } from "@clerk/nextjs";
import { syncUser } from "@/actions/user.actions";

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const { user: clerkUser, isLoaded: clerkLoaded } = useUser();
  const { setUser, setIsLoading } = useAuthStore();

  useEffect(() => {
    const initializeAuth = async () => {
      if (clerkLoaded) {
        if (clerkUser) {
          try {
            const dbUser = await syncUser();
            setUser(dbUser);
          } catch (error) {
            console.error("Error syncing user:", error);
            setUser(null);
          }
        } else {
          setUser(null);
        }
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, [clerkUser, clerkLoaded, setUser, setIsLoading]);

  return <>{children}</>;
}
