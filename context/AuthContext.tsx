"use client";

import {
    createContext,
    useContext,
    useEffect,
    useState,
} from "react";

type UserType = {
    id: string;
    email: string;
    usertype: string;
} | null;

type AuthContextType = {
    user: UserType;
    setUser: React.Dispatch<React.SetStateAction<UserType>>;
};

const AuthContext = createContext<AuthContextType | undefined>(
    undefined
);

export function AuthProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [user, setUser] = useState<UserType>(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await fetch("/api/auth/session");

                const data = await res.json();

                setUser(data?.user || null);
            } catch {
                setUser(null);
            }
        };

        fetchUser();
    }, []);

    return (
        <AuthContext.Provider value={{ user, setUser }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error(
            "useAuth must be used inside AuthProvider"
        );
    }

    return context;
}