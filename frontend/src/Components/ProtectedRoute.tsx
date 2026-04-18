// src/components/ProtectedRoute.tsx
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface ProtectedRouteProps {
    children: React.ReactNode;
    allowedRoles?: Array<'customer' | 'vendor' | 'admin'>;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
    children, 
    allowedRoles 
}) => {
    const { user, isLoading } = useAuth();
    
   
    if (isLoading) {
        return <div className="flex justify-center items-center h-screen">Loading...</div>;
    }
    
    
    if (!user) {
        return <Navigate to="/login" replace />;
    }
    
    
    if (allowedRoles && !allowedRoles.includes(user.user_type)) {
        return <Navigate to="/unauthorized" replace />;
    }
    
    return <>{children}</>;
};

export default ProtectedRoute;