import React, { createContext, useState, useContext, useEffect } from 'react';
import api from '../Services/api';

interface User {
    user_id: number;
    username: string;
    email: string;
    first_name?: string;
    last_name?: string;
    user_type: 'customer' | 'vendor' | 'admin';
}

interface AuthContextType {
    user: User | null;
    token: string | null;
    login: (email: string, password: string) => Promise<void>;
    register: (userData: any) => Promise<void>;
    logout: () => void;
    isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    
    const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
   
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (token) {
            
            api.get('/users/me')
                .then((response) => {
                    setUser(response.data.data); 
                })
                .catch((error) => {
                    console.error('Failed to fetch user:', error);
                    localStorage.removeItem('token');
                    setToken(null);
                })
                .finally(() => setIsLoading(false));
        } else {
            setIsLoading(false);
        }
    }, [token]);

    const login = async (email: string, password: string) => {
        try {
            const response = await api.post('/users/login', { email, password });
            const { token: newToken, data: userData } = response.data;
            
            localStorage.setItem('token', newToken);
            setToken(newToken);
            setUser(userData);
        } catch (error) {
            console.error('Login error:', error);
            throw error;
        }
    };

    const register = async (userData: any) => {
        try {
            const response = await api.post('/users', userData);
            await login(userData.email, userData.password);
        } catch (error) {
            console.error('Registration error:', error);
            throw error;
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        setToken(null);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, token, login, register, logout, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error('useAuth must be used within AuthProvider');
    return context;
};