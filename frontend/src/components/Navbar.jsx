import { useNavigate } from "react-router-dom";
import "./Navbar.css";

function Navbar() {

    const navigate = useNavigate();

    const token = localStorage.getItem("token");

    const storedUser = localStorage.getItem("user");

    const user = storedUser ? JSON.parse(storedUser) : null;

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        navigate("/login");
    };

    return (
        <nav className="navbar">

            <div
                className="navbar-logo"
                onClick={() => navigate("/")}
            >
                AI Resume <span>Analyzer</span>
            </div>

            {token ? (
                <div className="navbar-right">

                    <span className="navbar-user">
                        Hello, {user?.name}
                    </span>

                    <button
                        className="navbar-btn primary"
                        onClick={() => navigate("/analysis")}
                    >
                        Analyze Resume
                    </button>

                    <button
                        className="navbar-btn logout"
                        onClick={handleLogout}
                    >
                        Logout
                    </button>

                </div>
            ) : (
                <div className="navbar-right">

                    <button
                        className="navbar-btn secondary"
                        onClick={() => navigate("/login")}
                    >
                        Login
                    </button>

                    <button
                        className="navbar-btn primary"
                        onClick={() => navigate("/signup")}
                    >
                        Sign Up
                    </button>

                </div>
            )}

        </nav>
    );
}

export default Navbar;