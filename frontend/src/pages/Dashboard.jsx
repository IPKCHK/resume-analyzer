import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

function Dashboard() {
    const navigate = useNavigate();

    const [analyses, setAnalyses] = useState([]);
    const [loading, setLoading] = useState(true);

    const user = JSON.parse(localStorage.getItem("user"));

    useEffect(() => {
        const fetchAnalyses = async () => {
            const token = localStorage.getItem("token");

            if (!token) {
                setLoading(false);
                return;
            }

            try {
                const response = await fetch(
                    `${import.meta.env.VITE_API_URL}/api/analysis`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );

                const data = await response.json();

                if (response.ok) {
                    setAnalyses(data);
                }

            } catch (error) {
                console.log("Fetch analyses error:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchAnalyses();
    }, []);

    return (
        <div className="dashboard-page">

            {/* Hero Section */}
            <section className="dashboard-hero">

                <div className="hero-content">
                    <p className="hero-label">
                        AI-POWERED CAREER TOOL
                    </p>

                    <h1>
                        Welcome back, {user?.name || "User"}!
                    </h1>

                    <p>
                        Analyze your resume against job descriptions,
                        discover skill gaps, and improve your chances
                        of getting shortlisted.
                    </p>

                    <button
                        className="analyze-btn"
                        onClick={() => navigate("/analysis")}
                    >
                        Analyze Resume
                    </button>
                </div>

            </section>


            {/* Statistics */}
            <section className="dashboard-stats">

                <div className="stat-card">
                    <span className="stat-title">
                        Total Analyses
                    </span>

                    <span className="stat-number">
                        {analyses.length}
                    </span>
                </div>

                <div className="stat-card">
                    <span className="stat-title">
                        Average Match
                    </span>

                    <span className="stat-number">
                        {analyses.length > 0
                            ? Math.round(
                                analyses.reduce(
                                    (sum, item) =>
                                        sum + Number(
                                            item.result?.matchPercentage || 0
                                        ),
                                    0
                                ) / analyses.length
                            )
                            : 0
                        }%
                    </span>
                </div>

                <div className="stat-card">
                    <span className="stat-title">
                        Latest Analysis
                    </span>

                    <span className="stat-number">
                        {analyses.length > 0
                            ? `${analyses[0].result?.matchPercentage || 0}%`
                            : "--"
                        }
                    </span>
                </div>

            </section>


            {/* Recent Analyses */}
            <section className="recent-section">

                <div className="section-header">
                    <div>
                        <h2>Recent Analyses</h2>
                        <p>
                            Your latest resume and job description comparisons
                        </p>
                    </div>

                    <button
                        className="view-all-btn"
                        onClick={() => navigate("/analysis")}
                    >
                        New Analysis
                    </button>
                </div>


                {loading ? (
                    <div className="empty-message">
                        Loading analyses...
                    </div>
                ) : analyses.length === 0 ? (

                    <div className="empty-card">
                        <h3>No analyses yet</h3>

                        <p>
                            Upload your resume and compare it with a job
                            description to get your first AI analysis.
                        </p>

                        <button
                            onClick={() => navigate("/analysis")}
                        >
                            Start Your First Analysis
                        </button>
                    </div>

                ) : (

                    <div className="analysis-list">

                        {analyses.slice(0, 5).map((analysis) => (

                            <div
                                className="analysis-card"
                                key={analysis.id}
                            >

                                <div className="analysis-info">

                                    <h3>
                                        Resume Analysis
                                    </h3>

                                    <p>
                                        {analysis.job_description
                                            .slice(0, 100)}
                                        ...
                                    </p>

                                    <span>
                                        {new Date(
                                            analysis.created_at
                                        ).toLocaleDateString()}
                                    </span>

                                </div>


                                <div className="match-score">

                                    <strong>
                                        {analysis.result?.matchPercentage || 0}%
                                    </strong>

                                    <span>
                                        Match
                                    </span>

                                </div>

                            </div>

                        ))}

                    </div>

                )}

            </section>


            {/* How It Works */}
            <section className="how-section">

                <h2>How It Works</h2>

                <div className="steps">

                    <div className="step-card">
                        <span className="step-number">01</span>

                        <h3>Upload Resume</h3>

                        <p>
                            Provide your resume text and let the AI
                            understand your skills and experience.
                        </p>
                    </div>


                    <div className="step-card">
                        <span className="step-number">02</span>

                        <h3>Add Job Description</h3>

                        <p>
                            Enter the job description you want to
                            compare your resume against.
                        </p>
                    </div>


                    <div className="step-card">
                        <span className="step-number">03</span>

                        <h3>Get AI Insights</h3>

                        <p>
                            See your match percentage, missing skills,
                            keywords, suggestions, and interview questions.
                        </p>
                    </div>

                </div>

            </section>

        </div>
    );
}

export default Dashboard;