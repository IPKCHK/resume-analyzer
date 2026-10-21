import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";

function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(
                "http://localhost:3000/api/auth/login",
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

            localStorage.setItem("token", data.token);
            localStorage.setItem("user", JSON.stringify(data.user));

            navigate("/");

        } catch (error) {
            console.log("Login error:", error);
            alert("Something went wrong");
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
                    >
                        Login
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