"use client";

import {
    createContext,
    useContext,
    useEffect,
    useState,
    useCallback,
    type ReactNode,
} from "react";

interface User {
    id: string;
    name: string;
    email: string;
    role: "student" | "admin";
}

interface AuthContextType {
    user: User | null;
    loading: boolean;
    refreshUser: () => Promise<void>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    const refreshUser = useCallback(async () => {
        try {
            const response = await fetch("/api/auth/me");

            if (!response.ok) {
                setUser(null);
                return;
            }

            const data = await response.json();
            setUser(data.user);
        } catch {
            setUser(null);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        let active = true;

        const checkAuth = async () => {
            try {
                const response = await fetch("/api/auth/me");
                if (!response.ok) {
                    if (active) setUser(null);
                    return;
                }
                const data = await response.json();
                if (active) setUser(data.user);
            } catch {
                if (active) setUser(null);
            } finally {
                if (active) setLoading(false);
            }
        };

        checkAuth();

        return () => {
            active = false;
        };
    }, []);

    const logout = async () => {
        try {
            await fetch("/api/auth/logout", {
                method: "POST",
            });
        } finally {
            setUser(null);
        }
    };

    return (
        <AuthContext.Provider
            value={{ user, loading, refreshUser, logout }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("useAuth must be used inside AuthProvider");
    }

    return context;
}
