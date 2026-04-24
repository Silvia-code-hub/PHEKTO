import React, { createContext, useState, useContext, useEffect, useCallback, useRef } from 'react';
import api from '../Services/api';

interface User {
    phone: any;
    user_id: number;
    username: string;
    email: string;
    first_name?: string;
    last_name?: string;
    user_type: 'customer' | 'vendor' | 'admin';
}

interface AuthContextType {
    user: User | null;
    accessToken: string | null;
    login: (email: string, password: string) => Promise<void>;
    register: (userData: any) => Promise<void>;
    logout: () => void;
    isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    
    const [accessToken, setAccessToken] = useState<string | null>(() => localStorage.getItem('accessToken'));
    const [refreshToken, setRefreshToken] = useState<string | null>(() => localStorage.getItem('refreshToken'));
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const isInitialMount = useRef(true); 

    const refreshAccessToken = useCallback(async () => {
        const storedRefreshToken = localStorage.getItem('refreshToken');
        if (!storedRefreshToken) return false;
        
        try {
            const response = await api.post('/auth/refresh-token', { refreshToken: storedRefreshToken });
            const { accessToken: newAccessToken } = response.data;
            
            localStorage.setItem('accessToken', newAccessToken);
            setAccessToken(newAccessToken);
            return true;
        } catch (error) {
            console.error('Failed to refresh token:', error);
            return false;
        }
    }, []);

    
    useEffect(() => {
        const fetchUser = async () => {
            const token = localStorage.getItem('accessToken');
            
            if (!token) {
                setIsLoading(false);
                return;
            }
            
            try {
               
                api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                const response = await api.get('/users/me');
                setUser(response.data.data);
                setAccessToken(token);
            } catch (error: any) {
                console.error('Failed to fetch user:', error);
                
                
                if (error.response?.status === 401) {
                    const refreshed = await refreshAccessToken();
                    if (refreshed) {
                        const newToken = localStorage.getItem('accessToken');
                        api.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
                        try {
                            const response = await api.get('/users/me');
                            setUser(response.data.data);
                        } catch (err) {
                            console.error('Still failed after refresh:', err);
                            localStorage.removeItem('accessToken');
                            localStorage.removeItem('refreshToken');
                            setAccessToken(null);
                        }
                    } else {
                        localStorage.removeItem('accessToken');
                        localStorage.removeItem('refreshToken');
                        setAccessToken(null);
                    }
                }
            } finally {
                setIsLoading(false);
            }
        };
        
        
        fetchUser();
    }, []); 

    
    useEffect(() => {
        const interceptor = api.interceptors.request.use(
            (config) => {
                const token = localStorage.getItem('accessToken');
                if (token) {
                    config.headers.Authorization = `Bearer ${token}`;
                }
                return config;
            },
            (error) => Promise.reject(error)
        );
        
        return () => {
            api.interceptors.request.eject(interceptor);
        };
    }, []); 

    const login = async (email: string, password: string) => {
        try {
            const response = await api.post('/auth/login', { email, password });
            console.log('Login response:', response.data);
            const { accessToken: newAccessToken, refreshToken: newRefreshToken, data: userData } = response.data;
            
            localStorage.setItem('accessToken', newAccessToken);
            localStorage.setItem('refreshToken', newRefreshToken);
            
            
            api.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
            
            setAccessToken(newAccessToken);
            setRefreshToken(newRefreshToken);
            setUser(userData);
        } catch (error) {
            console.error('Login error:', error);
            throw error;
        }
    };

    const register = async (userData: any) => {
        try {
            const response = await api.post('/auth/register', userData);
            return response.data;
        } catch (error) {
            console.error('Registration error:', error);
            throw error;
        }
    };

    const logout = async () => {
        const storedRefreshToken = localStorage.getItem('refreshToken');
        if (storedRefreshToken) {
            try {
                await api.post('/auth/logout', { refreshToken: storedRefreshToken });
            } catch (error) {
                console.error('Logout API error:', error);
            }
        }
        
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        
        delete api.defaults.headers.common['Authorization'];
        
        setAccessToken(null);
        setRefreshToken(null);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, accessToken, login, register, logout, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error('useAuth must be used within AuthProvider');
    return context;
};