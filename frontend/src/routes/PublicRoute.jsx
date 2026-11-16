/** Send authenticated users away from login/register to their dashboard. */
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PublicRoute = () => {
    const { isAuthenticated } = useSelector((state) => state.auth);
    if (isAuthenticated) return <Navigate to="/dashboard" replace />;
    return <Outlet />;
};

export default PublicRoute;
