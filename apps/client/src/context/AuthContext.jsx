import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { authApi } from "../services/api/authApi.js";
import { setAccessToken, setUnauthorizedHandler } from "../services/api/axiosClient.js";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const clearSession = useCallback(() => {
    setAccessToken(null);
    setUser(null);
  }, []);

  useEffect(() => {
    setUnauthorizedHandler(clearSession);
  }, [clearSession]);

  useEffect(() => {
    // Attempt silent refresh on first load (relies on httpOnly cookie).
    (async () => {
      try {
        const { data } = await authApi.refreshToken();
        setAccessToken(data.data.accessToken);
        setUser(data.data.user);
      } catch {
        clearSession();
      } finally {
        setLoading(false);
      }
    })();
  }, [clearSession]);

  const login = async (email, password) => {
    const { data } = await authApi.login({ email, password });
    setAccessToken(data.data.accessToken);
    setUser(data.data.user);
    return data.data.user;
  };

  const signup = async (payload) => {
    const { data } = await authApi.signup(payload);
    return data.data.user;
  };

  const logout = async () => {
    try {
      await authApi.logout();
    } finally {
      clearSession();
    }
  };

  const refreshUser = async () => {
    const { data } = await authApi.getMe();
    setUser(data.data.user);
    return data.data.user;
  };

  return (
    <AuthContext.Provider
      value={{ user, setUser, loading, login, signup, logout, refreshUser, isAuthenticated: !!user }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuthContext must be used within AuthProvider");
  return ctx;
}
