"use client";
import { createContext, useContext, useState, useEffect, useCallback } from "react";
import toast from "react-hot-toast";

interface User {
    token: string;
    id: string;
    email: string;
    name?: string;
}

interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    login: (userData: User) => void;
    logout: () => void;
    getUser: () => User | null;
    setUser: (userData: User) => void;
}

const AUTH_STORAGE_KEY = "dailyblock_auth_user";
const AuthContext = createContext<AuthContextType | undefined>(undefined);

const useLocalStorage = () => {
    const getStoredUser = useCallback((): User | null => {
        if (typeof window !== "undefined") {
            const storedData = localStorage.getItem(AUTH_STORAGE_KEY);
            return storedData ? (JSON.parse(storedData) as User) : null;
        }
        return null;
    }, []);

    const setStoredUser = (userData: User) => {
        if (typeof window !== "undefined") {
            localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(userData));
        }
    };

    const removeStoredUser = () => {
        if (typeof window !== "undefined") {
            localStorage.removeItem(AUTH_STORAGE_KEY);
        }
    };

    return { getStoredUser, setStoredUser, removeStoredUser };
};


export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const { getStoredUser, setStoredUser, removeStoredUser } = useLocalStorage();
    const [user, setUserState] = useState<User | null>(null);

    useEffect(() => {
        const initialUser = getStoredUser();
        if (initialUser) {
            setUserState(initialUser);
        }
    }, [getStoredUser]);


    const login = (userData: User) => {
        setUserState(userData);
        setStoredUser(userData);
        toast.success("Welcome back!");
    };

    const logout = () => {
        setUserState(null);
        removeStoredUser();
        toast.success("Logged out successfully.");
    };

    const getUser = () => {
        return user;
    };

    const setUser = (userData: User) => {
        setUserState(userData);
        setStoredUser(userData);
    };

    const isAuthenticated = !!user;

    const contextValue = {
        user,
        isAuthenticated,
        login,
        logout,
        getUser,
        setUser,
    };

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
};

// --- 6. Custom Hook to Consume Context ---

export const useAuthContext = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        // This is a common pattern to ensure the hook is used inside the Provider
        throw new Error("useAuthContext must be used within an AuthProvider");
    }
    return context;
};