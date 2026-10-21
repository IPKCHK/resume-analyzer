import { useState } from "react";
import "./AnalysisPage.css";

function AnalysisPage() {
    const [resumeText, setResumeText] = useState("");
    const [jobDescription, setJobDescription] = useState("");

    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);

    const handleAnalyze = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem("token");

        if (!token) {
            alert("Please login first");
            return;
        }

        if (!resumeText.trim() || !jobDescription.trim()) {
            alert("Please enter both your resume and job description");
            return;
        }

        setLoading(true);
        setResult(null);

        try {
            const response = await fetch(
                "${import.meta.env.VITE_API_URL}/api/analysis",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        resumeText,
                        jobDescription
                    })
                }
            );

            const data = await response.json();

            if (!response.ok) {
                alert(data.message || "Analysis failed");
                return;
            }

            setResult(data.analysis.result);

        } catch (error) {
            console.log("Analysis error:", error);
            alert("Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="analysis-page">

            <div className="analysis-header">
                <p className="analysis-label">
                    AI RESUME ANALYZER
                </p>

                <h1>
                    Analyze Your Resume
                </h1>

                <p>
                    Compare your resume with a job description and
                    discover how well your profile matches the role.
                </p>
            </div>


            <form
                className="analysis-form"
                onSubmit={handleAnalyze}
            >

                <div className="input-card">

                    <label htmlFor="resume">
                        Your Resume
                    </label>

                    <p className="input-description">
                        Paste the text of your resume below.
                    </p>

                    <textarea
                        id="resume"
                        placeholder="Paste your resume here..."
                        value={resumeText}
                        onChange={(e) => setResumeText(e.target.value)}
                    />

                </div>


                <div className="input-card">

                    <label htmlFor="job-description">
                        Job Description
                    </label>

                    <p className="input-description">
                        Paste the job description you want to compare against.
                    </p>

                    <textarea
                        id="job-description"
                        placeholder="Paste the job description here..."
                        value={jobDescription}
                        onChange={(e) => setJobDescription(e.target.value)}
                    />

                </div>


                <button
                    type="submit"
                    className="analyze-submit"
                    disabled={loading}
                >
                    {loading ? "Analyzing..." : "Analyze Resume"}
                </button>

            </form>


            {result && (
                <section className="analysis-results">

                    <h2>
                        Analysis Results
                    </h2>

                    <div className="match-card">

                        <span>
                            Resume Match
                        </span>

                        <strong>
                            {result.matchPercentage}%
                        </strong>

                    </div>


                    <div className="result-grid">

                        <div className="result-card">
                            <h3>Matching Skills</h3>

                            <ul>
                                {result.matchingSkills?.map(
                                    (skill, index) => (
                                        <li key={index}>
                                            {skill}
                                        </li>
                                    )
                                )}
                            </ul>
                        </div>


                        <div className="result-card">
                            <h3>Missing Skills</h3>

                            <ul>
                                {result.missingSkills?.map(
                                    (skill, index) => (
                                        <li key={index}>
                                            {skill}
                                        </li>
                                    )
                                )}
                            </ul>
                        </div>


                        <div className="result-card">
                            <h3>Keywords</h3>

                            <ul>
                                {result.keywords?.map(
                                    (keyword, index) => (
                                        <li key={index}>
                                            {keyword}
                                        </li>
                                    )
                                )}
                            </ul>
                        </div>


                        <div className="result-card">
                            <h3>Suggestions</h3>

                            <ul>
                                {result.suggestions?.map(
                                    (suggestion, index) => (
                                        <li key={index}>
                                            {suggestion}
                                        </li>
                                    )
                                )}
                            </ul>
                        </div>

                    </div>


                    <div className="interview-card">

                        <h3>
                            Interview Questions
                        </h3>

                        <ol>
                            {result.interviewQuestions?.map(
                                (question, index) => (
                                    <li key={index}>
                                        {question}
                                    </li>
                                )
                            )}
                        </ol>

                    </div>

                </section>
            )}

        </div>
    );
}

export default AnalysisPage;