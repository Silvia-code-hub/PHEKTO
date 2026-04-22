import React, { useState } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import api from '../Services/api';

const ResetPassword: React.FC = () => {
    const [searchParams] = useSearchParams();
    const token = searchParams.get('token');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage('');
        setError('');

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        if (password.length < 6) {
            setError('Password must be at least 6 characters');
            return;
        }

        if (!token) {
            setError('Invalid reset link');
            return;
        }

        setLoading(true);

        try {
            const response = await api.post('/auth/reset-password', { token, newPassword: password });
            setMessage(response.data.message);
            setTimeout(() => navigate('/login'), 3000);
        } catch (err: any) {
            setError(err.response?.data?.error || 'Failed to reset password');
        } finally {
            setLoading(false);
        }
    };

    if (!token) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="bg-white p-8 rounded-lg shadow-md text-center">
                    <div className="text-red-500 text-5xl mb-4">✗</div>
                    <h2 className="text-xl font-bold mb-2">Invalid Reset Link</h2>
                    <p className="text-gray-600 mb-4">The reset link is invalid or expired.</p>
                    <Link to="/forgot-password" className="text-pink-500 hover:text-pink-600">
                    Request a new one
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
            <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
                <div className="text-center">
                    <h2 className="text-3xl font-bold text-blue-shade">Create New Password</h2>
                    <p className="mt-2 text-gray-600">
                        Enter your new password below.
                    </p>
                </div>

                {message && (
                    <div className="mt-4 bg-green-50 border border-green-400 text-green-700 px-4 py-3 rounded">
                        {message}
                        <p className="text-sm mt-1">Redirecting to login...</p>
                    </div>
                )}

                {error && (
                    <div className="mt-4 bg-red-50 border border-red-400 text-red-700 px-4 py-3 rounded">
                        {error}
                    </div>
                )}

                <form className="mt-6" onSubmit={handleSubmit}>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            New Password
                        </label>
                        <input
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-pink-500 focus:border-pink-500"
                            placeholder="••••••••"
                        />
                        <p className="text-xs text-gray-500 mt-1">Minimum 6 characters</p>
                    </div>

                    <div className="mt-4">
                        <label className="block text-sm font-medium text-gray-700">
                            Confirm New Password
                        </label>
                        <input
                            type="password"
                            required
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-pink-500 focus:border-pink-500"
                            placeholder="••••••••"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="mt-6 w-full bg-pink-500 text-white py-2 px-4 rounded-md hover:bg-pink-600 disabled:opacity-50"
                    >
                        {loading ? 'Resetting...' : 'Reset Password'}
                    </button>
                </form>

                <div className="mt-4 text-center">
                    <Link to="/login" className="text-pink-500 hover:text-pink-600">
                        Back to Login
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ResetPassword;