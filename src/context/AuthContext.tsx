'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';

interface User {
    email: string;
    name: string;
    role: 'admin' | 'staff';
}

interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Admin credentials - In production, these should be in a secure database
const ADMIN_CREDENTIALS = [
    {
        email: 'admin@quickbooks.com',
        password: 'admin123',
        name: 'Admin User',
        role: 'admin' as const,
    },
    {
        email: 'staff@quickbooks.com',
        password: 'staff123',
        name: 'Staff Member',
        role: 'staff' as const,
    },
];

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    // Check for existing session on mount
    useEffect(() => {
        const savedSession = localStorage.getItem('quickbooks-admin-session');
        if (savedSession) {
            try {
                const sessionData = JSON.parse(savedSession);
                // Validate session isn't expired (24 hours)
                if (sessionData.expiresAt > Date.now()) {
                    setUser(sessionData.user);
                } else {
                    localStorage.removeItem('quickbooks-admin-session');
                }
            } catch (e) {
                localStorage.removeItem('quickbooks-admin-session');
            }
        }
        setIsLoading(false);
    }, []);

    const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 1000));

        const matchedUser = ADMIN_CREDENTIALS.find(
            (cred) => cred.email.toLowerCase() === email.toLowerCase() && cred.password === password
        );

        if (matchedUser) {
            const userData: User = {
                email: matchedUser.email,
                name: matchedUser.name,
                role: matchedUser.role,
            };

            // Save session with 24-hour expiry
            const sessionData = {
                user: userData,
                expiresAt: Date.now() + 24 * 60 * 60 * 1000,
            };
            localStorage.setItem('quickbooks-admin-session', JSON.stringify(sessionData));

            setUser(userData);
            return { success: true };
        }

        return { success: false, error: 'Invalid email or password' };
    };

    const logout = () => {
        localStorage.removeItem('quickbooks-admin-session');
        setUser(null);
        router.push('/dashboard/login');
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                isAuthenticated: !!user,
                isLoading,
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
