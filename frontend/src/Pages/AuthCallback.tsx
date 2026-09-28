import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

const AuthCallback: React.FC = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    useEffect(() => {
        const accessToken = searchParams.get('accessToken');
        const refreshToken = searchParams.get('refreshToken');
        const error = searchParams.get('error');

        console.log(' Auth Callback - Tokens received:', {
            hasAccessToken: !!accessToken,
            hasRefreshToken: !!refreshToken,
            error
        });

        if (error) {
            navigate('/login?error=' + error);
            return;
        }

        if (accessToken && refreshToken) {
            
            localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('refreshToken', refreshToken);
            
            console.log(' Tokens saved, redirecting to home...');
            
            
            window.location.href = '/';
        } else {
            console.error(' No tokens received');
            navigate('/login?error=no_tokens');
        }
    }, [searchParams, navigate]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500 mx-auto"></div>
                <p className="mt-4 text-gray-600">Completing sign in...</p>
            </div>
        </div>
    );
};

export default AuthCallback;