
import React, { useRef, useEffect } from 'react';
import type { DropdownProps } from './DropDown';

const DropdownMenu: React.FC<DropdownProps> = ({ items, isOpen, onClose }) => {
  const dropdownRef = useRef<HTMLDivElement>(null);
   useEffect(() => {  // Close dropdown on outside click
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        onClose();
      }
    };
     if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => { //
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  useEffect(() => { // Close dropdown on Escape key press
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) { //
      document.addEventListener('keydown', handleEscapeKey);
    }

    return () => { //
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;//

  return ( 
    <div className="dropdown-menu" ref={dropdownRef}>
      <ul className="dropdown-list">
        {items.map((item) => (
          <li key={item.id} className="dropdown-item">
            <a
              href={item.path}
              className="dropdown-link"
              onClick={(e) => {
                e.preventDefault();
                console.log(`Navigating to: ${item.path}`);
                onClose();
                }}
            >
              {item.icon && <span className="dropdown-icon">{item.icon}</span>}
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DropdownMenu;