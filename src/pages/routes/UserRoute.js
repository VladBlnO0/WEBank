// UserRoute.js (for user-specific routes)
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./AuthContext";

export function UserRoute() {
    const { user } = useAuth();

    if (!user) {
        return <Navigate to="/sign-in" replace />;
    }
    if (user.role !== "user") {
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
}
