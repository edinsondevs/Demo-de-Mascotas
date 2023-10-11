import { Navigate, Outlet } from "react-router-dom";
import { ProtectedRouteProps } from "../../interfaces/interfacesRoutesProtected";

const ProtectedRoute: React.FC<ProtectedRouteProps>   = ({
    userLogged,
    redirect = "/"
}) => {
    if (!userLogged) {
        return <Navigate to={redirect} replace />
    }
    return <Outlet />
    
    
}

export default ProtectedRoute;