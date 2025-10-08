import React, { useState } from 'react';
import DropdownMenu from './DropdownMenu';
import type { MenuItem } from "./DropDown"

const HomeDropdown: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);

    const menuItems: MenuItem[] = [
        { id: 1, label: 'grid-default', path: '/home1' },
        { id: 2, label: 'shop-list', path: '/shop-list' },  
        { id: 3, label: 'shop-left-sidebar', path: '/home3' },
        { id: 4, label: 'product-details', path: '/home4' },
        { id: 5, label: 'shopping-cart', path: '/home5' },
        { id: 6, label: 'order-completed', path: '/home6' },
        { id: 7, label: 'hekto-demo', path: '/home7' },
        { id: 8, label: 'my-account', path: '/home7' },
        { id: 9, label: 'blog-page', path: '/home7' },
        { id: 10, label: 'single-blog', path: '/home7' },
        { id: 11, label: 'about-us', path: '/home7' },
        { id: 12, label: 'contact-us', path: '/home7' },
        { id: 13, label: '404-not-found', path: '/home7' },
        { id: 14, label: 'faq', path: '/home7' },

    ];
    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const closeDropdown = () => {
        setIsOpen(false);
    };
    return (
        <div className="home-dropdown-container">
            <button
                className="home-button"
                onClick={toggleDropdown}
                aria-haspopup="true"
                aria-expanded={isOpen}
            >
                Home
                <span className={`dropdown-arrow ${isOpen ? 'open' : ''}`}>
                    ▼
                </span>
            </button>
            <DropdownMenu
                items={menuItems}
                isOpen={isOpen}
                onClose={closeDropdown}
            />
        </div>
    );
}
export default HomeDropdown;

