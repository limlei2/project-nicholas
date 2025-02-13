import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../authentication/useAuth";

const requireAuth = ({ allowedRoles }) => {
    const { auth } = useAuth();
    const location = useLocation();

    return (
        auth?.role?.find(role => allowedRoles?.includes(role))
            ? <Outlet />
            :
            <>
                {/* {asking()} */}
                <Navigate to="/login" state={{ from: location }} replace />
            </>
    );
}

export default requireAuth;