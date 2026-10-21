import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SignupPage.css";

function SignupPage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(
                "${import.meta.env.VITE_API_URL}/api/auth/signup",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        name,
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

            alert("Signup successful");

            navigate("/login");

        } catch (error) {
            console.log("Signup error:", error);
            alert("Something went wrong");
        }
    };

    return (
        <div className="signup-page">
            <div className="signup-card">

                <h1>Create Account</h1>

                <p className="signup-subtitle">
                    Create your account to use AI Resume Analyzer
                </p>

                <form onSubmit={handleSignup}>

                    <div className="form-group">
                        <label htmlFor="name">Name</label>

                        <input
                            id="name"
                            type="text"
                            placeholder="Enter your name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">Email</label>

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
                        <label htmlFor="password">Password</label>

                        <input
                            id="password"
                            type="password"
                            placeholder="Create a password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="signup-submit"
                    >
                        Create Account
                    </button>

                </form>

                <p className="login-text">
                    Already have an account?
                    <span onClick={() => navigate("/login")}>
                        Login
                    </span>
                </p>

            </div>
        </div>
    );
}

export default SignupPage;