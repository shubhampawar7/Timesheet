import React, { createContext, useContext, useEffect, useState } from 'react';
import type { User } from '../types';
import * as authApi from '../api/auth';

interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const initAuth = async () => {
            const token = sessionStorage.getItem('token');
            if (token) {
                try {
                    const user = await authApi.getUserFromToken(token);
                    setUser(user);
                } catch (error) {
                    sessionStorage.removeItem('token');
                }
            }
            setIsLoading(false);
        };

        initAuth();
    }, []);

    const login = async (email: string, password: string) => {
        const { user, token } = await authApi.login(email, password);
        sessionStorage.setItem('token', token);
        setUser(user);
    };

    const logout = () => {
        sessionStorage.removeItem('token');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, isAuthenticated: !!user, isLoading, login, logout }}>
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
