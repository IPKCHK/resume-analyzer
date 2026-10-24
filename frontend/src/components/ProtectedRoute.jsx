// import { Navigate } from "react-router-dom";

// function ProtectedRoute({ children }) {
//     const token = localStorage.getItem("token");

//     if (!token) {
//         return <Navigate to="/login" replace />;
//     }

//     return children;
// }

// export default ProtectedRoute;

import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore"; // Import your store

function ProtectedRoute({ children }) {
    // Grab the token from Zustand instead of localStorage
    const token = useAuthStore((state) => state.token);

    if (!token) {
        return <Navigate to="/login" replace />;
    }

    return children;
}

export default ProtectedRoute;