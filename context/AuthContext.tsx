"use client";
import { CustomToast } from "@/components/ui/ReactToast";
import { useRouter } from "next/navigation";
import { createContext, useContext, useState, useEffect, useCallback } from "react";
import toast from "react-hot-toast";

interface User {
    token: string;
    id: string;
    email: string;
    name?: string;
    type?: "admin" | "user" | "guest"; // 👈 Add this
    status?: "active" | "inactive" | "banned";
    lastLogin?: Date;

}

interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    login: (userData: User) => void;
    logout: () => void;
    loading: boolean; // 👈 added

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
    const router = useRouter(); // ✅ for navigation

    const { getStoredUser, setStoredUser, removeStoredUser } = useLocalStorage();
    const [user, setUserState] = useState<User | null>(null);
    const [loading, setLoading] = useState(true); // 👈 added

    useEffect(() => {
        const initialUser = getStoredUser();
        if (initialUser) {
            setUserState(initialUser);
        }
        setLoading(false); // 👈 once done loading

    }, [getStoredUser]);


    const login = (userData: User) => {
        setUserState(userData);
        setStoredUser(userData);
        toast.custom((t) => (
            <CustomToast
                t={t}
                status="Success"
                message={"Welcome back!"}
            />
        ));
        // ✅ Redirect based on userType
        if (userData.type === "admin") {
            router.push("/admin");
        } else if (userData.type === "user") {
            router.push("/user");
        } else {
            router.push("/");
        }
    };

    const logout = () => {
        setUserState(null);
        removeStoredUser();
        toast.custom((t) => (
            <CustomToast
                t={t}
                status="Success"
                message={"Logged out successfully."}
            />
        ));
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
        loading, // 👈 added
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