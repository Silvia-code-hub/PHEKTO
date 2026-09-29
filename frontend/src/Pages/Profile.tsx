import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaEnvelope, FaPhone, FaShoppingBag, FaHeart, FaSignOutAlt, FaEdit } from 'react-icons/fa';
import Layout from '../Components/layout';
import { useAuth } from '../context/AuthContext';
import api from '../Services/api';

interface UserProfile {
    user_id: number;
    username: string;
    email: string;
    first_name?: string;
    last_name?: string;
    phone?: string;
    user_type: string;
    created_at?: string;
}

const Profile: React.FC = () => {
    const navigate = useNavigate();
    const { user, logout, refreshUser } = useAuth();

    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);
    const [editing, setEditing] = useState(false);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        phone: ''
    });

    
    useEffect(() => {
        const fetchProfile = async () => {
            if (!user) {
                navigate('/login');
                return;
            }

            try {
                setLoading(true);
                const response = await api.get(`/users/${user.user_id}`);
                const data = response.data.data;
                setProfile(data);
                setFormData({
                    first_name: data.first_name || '',
                    last_name: data.last_name || '',
                    email: data.email || '',
                    phone: data.phone || ''
                });
            } catch (err: any) {
                console.error('Failed to fetch profile:', err);
                setError(err.response?.data?.error || 'Failed to load profile');
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, [user, navigate]);

   
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user) return;

        setSaving(true);
        setError('');
        setSuccess('');

        try {
            const response = await api.put(`/users/${user.user_id}`, formData);
            
            setProfile(response.data.data);
            setSuccess(' Profile updated successfully!');
            setEditing(false);

           
            if (refreshUser) {
                await refreshUser();
            }

            setTimeout(() => setSuccess(''), 3000);
        } catch (err: any) {
            console.error('Save error:', err);
            setError(err.response?.data?.error || 'Failed to update profile');
        } finally {
            setSaving(false);
        }
    };

    const handleCancel = () => {
        if (!profile) return;
        setFormData({
            first_name: profile.first_name || '',
            last_name: profile.last_name || '',
            email: profile.email || '',
            phone: profile.phone || ''
        });
        setEditing(false);
        setError('');
    };

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

   
    if (loading) {
        return (
            <Layout>
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500"></div>
                </div>
            </Layout>
        );
    }

    if (!profile || !user) {
        return (
            <Layout>
                <div className="text-center py-20">
                    <p className="text-gray-500">Unable to load profile</p>
                </div>
            </Layout>
        );
    }


    const initials = `${profile.first_name?.[0] || ''}${profile.last_name?.[0] || profile.username?.[0] || ''}`.toUpperCase();
    const fullName = `${profile.first_name || ''} ${profile.last_name || ''}`.trim() || profile.username;

    
    return (
        <Layout>
            <div className="max-w-6xl mx-auto py-8 px-4">
                <h1 className="text-3xl font-bold text-blue-shade mb-2">My Profile</h1>
                <p className="text-gray-500 mb-8">Manage your account information</p>

           
                {success && (
                    <div className="bg-green-50 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
                        {success}
                    </div>
                )}
                {error && (
                    <div className="bg-red-50 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                        {error}
                    </div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    
                    
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-lg shadow-md p-6 text-center">
                         
                            <div className="w-24 h-24 bg-pink-500 text-white rounded-full flex items-center justify-center text-3xl font-bold mx-auto mb-4">
                                {initials || <FaUser />}
                            </div>

                            <h2 className="text-xl font-bold text-blue-shade">{fullName}</h2>
                            <p className="text-sm text-gray-500 mt-1">{profile.email}</p>
                            
                            <span className="inline-block mt-3 px-3 py-1 bg-purple-100 text-purple-700 text-xs font-semibold rounded-full capitalize">
                                {profile.user_type}
                            </span>

                            {profile.created_at && (
                                <p className="text-xs text-gray-400 mt-4">
                                    Member since {new Date(profile.created_at).toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'long'
                                    })}
                                </p>
                            )}

                            
                            <button
                                onClick={handleLogout}
                                className="mt-6 w-full flex items-center justify-center gap-2 border border-red-300 text-red-500 px-4 py-2 rounded-lg hover:bg-red-50 transition-colors"
                            >
                                <FaSignOutAlt />
                                Logout
                            </button>
                        </div>

                        
                        <div className="bg-white rounded-lg shadow-md p-6 mt-6">
                            <h3 className="font-semibold text-blue-shade mb-4">Quick Links</h3>
                            <div className="space-y-2">
                                <button
                                    onClick={() => navigate('/my-orders')}
                                    className="w-full flex items-center gap-3 text-left px-3 py-2 rounded hover:bg-pink-50 text-gray-700 transition-colors"
                                >
                                    <FaShoppingBag className="text-pink-500" />
                                    My Orders
                                </button>
                                <button
                                    onClick={() => navigate('/wishlist')}
                                    className="w-full flex items-center gap-3 text-left px-3 py-2 rounded hover:bg-pink-50 text-gray-700 transition-colors"
                                >
                                    <FaHeart className="text-pink-500" />
                                    Wishlist
                                </button>
                                <button
                                    onClick={() => navigate('/shopping-cart')}
                                    className="w-full flex items-center gap-3 text-left px-3 py-2 rounded hover:bg-pink-50 text-gray-700 transition-colors"
                                >
                                    <FaShoppingBag className="text-pink-500" />
                                    Shopping Cart
                                </button>
                            </div>
                        </div>
                    </div>

               
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-xl font-bold text-blue-shade">
                                    Personal Information
                                </h2>
                                {!editing && (
                                    <button
                                        onClick={() => setEditing(true)}
                                        className="flex items-center gap-2 text-pink-500 hover:text-pink-600 text-sm font-medium"
                                    >
                                        <FaEdit />
                                        Edit
                                    </button>
                                )}
                            </div>

                            <form onSubmit={handleSave}>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    
                                    
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Username
                                        </label>
                                        <div className="flex items-center gap-2 px-3 py-2 bg-gray-50 border border-gray-200 rounded-md">
                                            <FaUser className="text-gray-400 text-sm" />
                                            <span className="text-gray-700">{profile.username}</span>
                                        </div>
                                        <p className="text-xs text-gray-400 mt-1">Username cannot be changed</p>
                                    </div>

                                    
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Email Address
                                        </label>
                                        <div className="relative">
                                            <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                disabled={!editing}
                                                className={`w-full pl-9 pr-3 py-2 border rounded-md focus:ring-pink-500 focus:border-pink-500 ${
                                                    editing 
                                                        ? 'bg-white border-gray-300' 
                                                        : 'bg-gray-50 border-gray-200 text-gray-500'
                                                }`}
                                            />
                                        </div>
                                    </div>

                                   
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            First Name
                                        </label>
                                        <input
                                            type="text"
                                            name="first_name"
                                            value={formData.first_name}
                                            onChange={handleChange}
                                            disabled={!editing}
                                            placeholder="Not set"
                                            className={`w-full px-3 py-2 border rounded-md focus:ring-pink-500 focus:border-pink-500 ${
                                                editing 
                                                    ? 'bg-white border-gray-300' 
                                                    : 'bg-gray-50 border-gray-200 text-gray-500'
                                            }`}
                                        />
                                    </div>

                                    
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Last Name
                                        </label>
                                        <input
                                            type="text"
                                            name="last_name"
                                            value={formData.last_name}
                                            onChange={handleChange}
                                            disabled={!editing}
                                            placeholder="Not set"
                                            className={`w-full px-3 py-2 border rounded-md focus:ring-pink-500 focus:border-pink-500 ${
                                                editing 
                                                    ? 'bg-white border-gray-300' 
                                                    : 'bg-gray-50 border-gray-200 text-gray-500'
                                            }`}
                                        />
                                    </div>

                                    
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Phone Number
                                        </label>
                                        <div className="relative">
                                            <FaPhone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
                                            <input
                                                type="tel"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleChange}
                                                disabled={!editing}
                                                placeholder="+254 700 000000"
                                                className={`w-full pl-9 pr-3 py-2 border rounded-md focus:ring-pink-500 focus:border-pink-500 ${
                                                    editing 
                                                        ? 'bg-white border-gray-300' 
                                                        : 'bg-gray-50 border-gray-200 text-gray-500'
                                                }`}
                                            />
                                        </div>
                                    </div>
                                </div>

                                
                                {editing && (
                                    <div className="flex justify-end gap-3 mt-6 pt-6 border-t">
                                        <button
                                            type="button"
                                            onClick={handleCancel}
                                            className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            disabled={saving}
                                            className="px-6 py-2 bg-pink-500 text-white rounded-md hover:bg-pink-600 disabled:opacity-50"
                                        >
                                            {saving ? 'Saving...' : 'Save Changes'}
                                        </button>
                                    </div>
                                )}
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Profile;