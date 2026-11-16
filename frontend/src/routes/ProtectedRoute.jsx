/** Client navigation guard. API authorization remains the responsibility of backend JWT/ownership checks. */
import { Outlet, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux';

const ProtectedRoute = () => {
    const {isAuthenticated} = useSelector((state) => state.auth)  ;

    if(!isAuthenticated){
        return <Navigate to='/login' replace />
    }
    return (
        <Outlet/>
    )
}

export default ProtectedRoute
