import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
    FaTachometerAlt,    
    FaBox,             
    FaPlus,             
    FaUsers,            
    FaShoppingBag,     
    FaHeart,           
    FaUser,            
    FaSignOutAlt,      
    FaTags
} from 'react-icons/fa';

const RoleBasedMenu: React.FC = () => {

    const {user, logout } = useAuth();

    if (!user)  return null;
    const commonItems = [
        {
            to: '/profile',
            label: 'My Profile',
            icon: <FaUser />,
            description: 'View and edit your personal information'
        },
        {
            to: '/my-orders',
            label: 'My Orders',
            icon: <FaShoppingBag />,
            description: 'Track your order history and status'
        },
        
    ];


    const vendorItems = [
       
        {
            to: '/vendor/orders',
            label: 'Vendor Orders',
            icon: <FaShoppingBag />,
            description: 'View and fulfill orders for your products'
        },
        {
            to:'/vendor/products',
            label: 'My Products',
            icon: <FaBox />,
            description: 'Manage products inventory'
        },
        {
            to: '/vendor/add-product',
            label: ' Add Product',
            icon: <FaPlus />,
            description:'Add new products to store'
        },
        
    ];

    const adminItems = [
        
        {
            to: '/admin/users',
            label: 'Manage Users',
            icon: <FaUsers />,
            description: 'View and manage all users'
        },
        {
            to: '/admin/products',
            label: 'All Products',
            icon: <FaBox />,
            description: 'View and manage all products'
        },
        {
            to: '/admin/orders',
            label: 'All Orders',
            icon: <FaShoppingBag />,
            description: 'View and manage all orders'
        },
        {   to: '/admin/categories',
             label: 'Categories',
             icon: <FaTags /> 
        },
    ];

    const handleLogout = () => {
        logout();
        window.location.href = '/';

    };
    return (
        <div className="relative group">
            <button className="flex items-center gap-2 px-4 py-2 text-gray-700 transition-colors">
                <FaTachometerAlt />
                <span>Dashboard</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>

            </button>
            <div className='absolute right-0 mt-2 w-64 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50'>
                <div className='py-2'>
                    {commonItems.map((item) => (
                    <Link
                            key={item.to}
                            to={item.to}
                            className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-pink-500 transition-colors group/link"
                            title={item.description}
                            
                        >
                            <span className='text-gray-400 group-hover/link:text-pink-500'>
                            {item.icon}
                            </span>
                            
                            <span>{item.label}</span>
                        </Link>
                    ))}

                    {(user.user_type === 'vendor' || user.user_type === 'admin') && (
                    <hr className=' my-2 border-gray-200'/>)}

                    {( user.user_type === 'vendor' || user.user_type === 'admin') && (
                        <>
                        {vendorItems.map((item) => (
                            <Link
                                key={item.to}
                                to={item.to}
                                className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-pink-500 transition-colors group/link"
                                title={item.description}
                            >
                                <span className='text-gray-400 group-hover/link:text-pink-500'>
                                    {item.icon}
                                </span>
                                <span>{item.label}</span>
                            </Link>
                        ))}
                        </>
                    )}

                    {user.user_type === 'admin' && (
                        <>
                            {adminItems.map((item) => (
                                <Link
                                    key={item.to}
                                    to={item.to}
                                    className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-pink-50 hover:text-pink-500 transition-colors group/link"
                                    title={item.description}
                                >
                                    <span className="text-gray-400 group-hover/link:text-pink-500">
                                        {item.icon}
                                    </span>
                                    <span>{item.label}</span>
                                </Link>
                            ))}
                            <hr className="my-2 border-gray-200" />
                        </>
                    )}
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                    >
                        <FaSignOutAlt />
                        <span>Logout</span>
                    </button>

                </div>

            </div>

        </div>
    );

    
};

export default RoleBasedMenu;