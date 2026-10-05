"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type User = {
  id: string;
  name?: string;
  email?: string;
  role?: string;
  avatar?: string;
  [key: string]: unknown;
};

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  isInitialized: boolean;
  login: (userData: User) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const USER_STORAGE_KEY = "auth_user";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem(USER_STORAGE_KEY);

      if (storedUser) {
        setUser(JSON.parse(storedUser) as User);
      }
    } catch {
      localStorage.removeItem(USER_STORAGE_KEY);
    } finally {
      setIsInitialized(true);
    }
  }, []);

  const login = useCallback((userData: User) => {
    setUser(userData);
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(userData));
  }, []);

  const logout = useCallback(() => {
    setUser(null);

    localStorage.removeItem(USER_STORAGE_KEY);
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
  }, []);

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      isInitialized,
      login,
      logout,
    }),
    [user, isInitialized, login, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}
