// src/pages/Register.tsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../Services/api';

const Register: React.FC = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        first_name: '',
        last_name: '',
        phone: ''
    });
    
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,           
            [e.target.name]: e.target.value  
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        
        
        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return;
        }
        
        
        if (formData.password.length < 6) {
            setError('Password must be at least 6 characters');
            return;
        }
        
        setLoading(true);
        
        try {
           
            const { confirmPassword, ...registrationData } = formData;
            
            const response = await api.post('/auth/register', registrationData);
            
            setSuccess(response.data.message);
            
            
            setFormData({
                username: '', email: '', password: '', confirmPassword: '',
                first_name: '', last_name: '', phone: ''
            });
            
           
            setTimeout(() => navigate('/login'), 3000);
            
        } catch (err: any) {
            setError(err.response?.data?.error || 'Registration failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
                <div>
                    <h2 className="text-center text-3xl font-bold text-gray-900">
                        Create your account
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        Or{' '}
                        <Link to="/login" className="text-pink-500 hover:text-pink-600">
                            sign in to existing account
                        </Link>
                    </p>
                </div>
                
                {error && (
                    <div className="bg-red-50 border border-red-400 text-red-700 px-4 py-3 rounded">
                        {error}
                    </div>
                )}
                
                {success && (
                    <div className="bg-green-50 border border-green-400 text-green-700 px-4 py-3 rounded">
                        {success}
                        <p className="text-sm mt-1">Redirecting to login...</p>
                    </div>
                )}
                
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="space-y-4">
                        
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Username *
                            </label>
                            <input
                                type="text"
                                name="username"
                                required
                                value={formData.username}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-pink-500 focus:border-pink-500"
                            />
                        </div>
                        
                        
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Email *
                            </label>
                            <input
                                type="email"
                                name="email"
                                required
                                value={formData.email}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-pink-500 focus:border-pink-500"
                                placeholder="you@example.com"
                            />
                            
                        </div>
                        
                       
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Password *
                            </label>
                            <input
                                type="password"
                                name="password"
                                required
                                value={formData.password}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-pink-500 focus:border-pink-500"
                            />
                            <p className="text-xs text-gray-500 mt-1">Minimum 6 characters</p>
                        </div>
                        
                        
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Confirm Password *
                            </label>
                            <input
                                type="password"
                                name="confirmPassword"
                                required
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-pink-500 focus:border-pink-500"
                            />
                        </div>
                        
                        
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    First Name
                                </label>
                                <input
                                    type="text"
                                    name="first_name"
                                    value={formData.first_name}
                                    onChange={handleChange}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Last Name
                                </label>
                                <input
                                    type="text"
                                    name="last_name"
                                    value={formData.last_name}
                                    onChange={handleChange}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                                />
                            </div>
                        </div>
                        
                        
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Phone Number
                            </label>
                            <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                                placeholder="+254 700 000000"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-pink-500 hover:bg-pink-600 disabled:opacity-50"
                    >
                        {loading ? 'Creating account...' : 'Create account'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Register;