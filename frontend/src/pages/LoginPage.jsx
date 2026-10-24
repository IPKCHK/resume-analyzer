import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import "./LoginPage.css";

function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false); // Added loading state
    const setAuth = useAuthStore((state) => state.setAuth);

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true); // Start loading

        try {
            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/api/auth/login`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        email,
                        password
                    })
                }
            );

            const data = await response.json();

            if (!response.ok) {
                alert(data.message);
                return;
            }

            setAuth(data.token, data.user);

            navigate("/");

        } catch (error) {
            console.log("Login error:", error);
            alert("Something went wrong");
        } finally {
            setLoading(false); // Stop loading regardless of success or failure
        }
    };

    return (
        <div className="login-page">
            <div className="login-card">
                <h1>Welcome Back</h1>
                <p className="login-subtitle">
                    Login to continue to AI Resume Analyzer
                </p>

                <form onSubmit={handleLogin}>
                    <div className="form-group">
                        <label htmlFor="email">
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">
                            Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="login-submit"
                        disabled={loading} // Disable button while loading
                    >
                        {loading ? "Logging in..." : "Login"} {/* Dynamic text */}
                    </button>
                </form>

                <p className="signup-text">
                    Don't have an account?
                    <span onClick={() => navigate("/signup")}>
                        Sign up
                    </span>
                </p>
            </div>
        </div>
    );
}

export default LoginPage;