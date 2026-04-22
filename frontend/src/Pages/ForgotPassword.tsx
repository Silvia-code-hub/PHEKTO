import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../Services/api';

const ForgotPassword: React.FC = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage('');
        setError('');
        setLoading(true);

        try {
            const response = await api.post('/auth/forgot-password', { email });
            setMessage(response.data.message);
            setEmail('');
        } catch (err: any) {
            setError(err.response?.data?.error || 'Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
            <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
                <div className="text-center">
                    <h2 className="text-3xl font-bold text-blue-shade">Forgot Password?</h2>
                    <p className="mt-2 text-gray-600">
                        Enter your email and we'll send you a link to reset your password.
                    </p>
                </div>

                {message && (
                    <div className="mt-4 bg-green-50 border border-green-400 text-green-700 px-4 py-3 rounded">
                        {message}
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
                            Email Address
                        </label>
                        <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-pink-500 focus:border-pink-500"
                            placeholder="you@example.com"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="mt-4 w-full bg-pink-500 text-white py-2 px-4 rounded-md hover:bg-pink-600 disabled:opacity-50"
                    >
                        {loading ? 'Sending...' : 'Send Reset Link'}
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

export default ForgotPassword;