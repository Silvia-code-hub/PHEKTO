import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import api from '../Services/api';

const VerifyEmail: React.FC = () => {
    const [searchParams] = useSearchParams();
    const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const verifyEmail = async () => {
            const token = searchParams.get('token');
            
            if (!token) {
                setStatus('error');
                setMessage('Invalid verification link');
                return;
            }
            
            try {
                const response = await api.post('/auth/verify-email', { token });
                setStatus('success');
                setMessage(response.data.message);
                setTimeout(() => navigate('/login'), 3000);
            } catch (error: any) {
                setStatus('error');
                setMessage(error.response?.data?.error || 'Verification failed');
            }
        };
        
        verifyEmail();
    }, [searchParams, navigate]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="bg-white p-8 rounded-lg shadow-md w-96 text-center">
                {status === 'loading' && (
                    <>
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500 mx-auto"></div>
                        <p className="mt-4 text-gray-600">Verifying your email...</p>
                    </>
                )}
                {status === 'success' && (
                    <>
                        <div className="text-green-500 text-5xl mb-4">✓</div>
                        <h2 className="text-xl font-bold mb-2">Email Verified!</h2>
                        <p className="text-gray-600">{message}</p>
                        <p className="text-sm text-gray-500 mt-4">Redirecting to login...</p>
                    </>
                )}
                {status === 'error' && (
                    <>
                        <div className="text-red-500 text-5xl mb-4">✗</div>
                        <h2 className="text-xl font-bold mb-2">Verification Failed</h2>
                        <p className="text-red-600">{message}</p>
                        <button 
                            onClick={() => navigate('/login')}
                            className="mt-4 bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600"
                        >
                            Go to Login
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};

export default VerifyEmail;