// src/hooks/useAuth.ts

import { useState, useEffect } from "react";
import {
  getProfile,
  isAuthenticated,
  logout,
} from "@/modules/user/api/UserAPI";

interface User {
  _id: string;
  name: string;
  email: string;
}

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadUser = async () => {
      if (!isAuthenticated()) {
        setLoading(false);
        return;
      }

      try {
        const userData = await getProfile();
        setUser(userData);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Error desconocido");
        logout();
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  return { user, loading, error, isAuthenticated: isAuthenticated() };
};
