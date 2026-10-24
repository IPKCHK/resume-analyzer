// import { useState } from "react";
// import "./AnalysisPage.css";

// function AnalysisPage() {
//     const [resumeText, setResumeText] = useState("");
//     const [jobDescription, setJobDescription] = useState("");

//     const [loading, setLoading] = useState(false);
//     const [result, setResult] = useState(null);

//     const handleAnalyze = async (e) => {
//         e.preventDefault();

//         const token = localStorage.getItem("token");

//         if (!token) {
//             alert("Please login first");
//             return;
//         }

//         if (!resumeText.trim() || !jobDescription.trim()) {
//             alert("Please enter both your resume and job description");
//             return;
//         }

//         setLoading(true);
//         setResult(null);

//         try {
//             const response = await fetch(
//                 `${import.meta.env.VITE_API_URL}/api/analysis`,
//                 {
//                     method: "POST",
//                     headers: {
//                         "Content-Type": "application/json",
//                         Authorization: `Bearer ${token}`
//                     },
//                     body: JSON.stringify({
//                         resumeText,
//                         jobDescription
//                     })
//                 }
//             );

//             const data = await response.json();

//             if (!response.ok) {
//                 alert(data.message || "Analysis failed");
//                 return;
//             }

//             setResult(data.analysis.result);

//         } catch (error) {
//             console.log("Analysis error:", error);
//             alert("Something went wrong");
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <div className="analysis-page">

//             <div className="analysis-header">
//                 <p className="analysis-label">
//                     AI RESUME ANALYZER
//                 </p>

//                 <h1>
//                     Analyze Your Resume
//                 </h1>

//                 <p>
//                     Compare your resume with a job description and
//                     discover how well your profile matches the role.
//                 </p>
//             </div>


//             <form
//                 className="analysis-form"
//                 onSubmit={handleAnalyze}
//             >

//                 <div className="input-card">

//                     <label htmlFor="resume">
//                         Your Resume
//                     </label>

//                     <p className="input-description">
//                         Paste the text of your resume below.
//                     </p>

//                     <textarea
//                         id="resume"
//                         placeholder="Paste your resume here..."
//                         value={resumeText}
//                         onChange={(e) => setResumeText(e.target.value)}
//                     />

//                 </div>


//                 <div className="input-card">

//                     <label htmlFor="job-description">
//                         Job Description
//                     </label>

//                     <p className="input-description">
//                         Paste the job description you want to compare against.
//                     </p>

//                     <textarea
//                         id="job-description"
//                         placeholder="Paste the job description here..."
//                         value={jobDescription}
//                         onChange={(e) => setJobDescription(e.target.value)}
//                     />

//                 </div>


//                 <button
//                     type="submit"
//                     className="analyze-submit"
//                     disabled={loading}
//                 >
//                     {loading ? "Analyzing..." : "Analyze Resume"}
//                 </button>

//             </form>


//             {result && (
//                 <section className="analysis-results">

//                     <h2>
//                         Analysis Results
//                     </h2>

//                     <div className="match-card">

//                         <span>
//                             Resume Match
//                         </span>

//                         <strong>
//                             {result.matchPercentage}%
//                         </strong>

//                     </div>


//                     <div className="result-grid">

//                         <div className="result-card">
//                             <h3>Matching Skills</h3>

//                             <ul>
//                                 {result.matchingSkills?.map(
//                                     (skill, index) => (
//                                         <li key={index}>
//                                             {skill}
//                                         </li>
//                                     )
//                                 )}
//                             </ul>
//                         </div>


//                         <div className="result-card">
//                             <h3>Missing Skills</h3>

//                             <ul>
//                                 {result.missingSkills?.map(
//                                     (skill, index) => (
//                                         <li key={index}>
//                                             {skill}
//                                         </li>
//                                     )
//                                 )}
//                             </ul>
//                         </div>


//                         <div className="result-card">
//                             <h3>Keywords</h3>

//                             <ul>
//                                 {result.keywords?.map(
//                                     (keyword, index) => (
//                                         <li key={index}>
//                                             {keyword}
//                                         </li>
//                                     )
//                                 )}
//                             </ul>
//                         </div>


//                         <div className="result-card">
//                             <h3>Suggestions</h3>

//                             <ul>
//                                 {result.suggestions?.map(
//                                     (suggestion, index) => (
//                                         <li key={index}>
//                                             {suggestion}
//                                         </li>
//                                     )
//                                 )}
//                             </ul>
//                         </div>

//                     </div>


//                     <div className="interview-card">

//                         <h3>
//                             Interview Questions
//                         </h3>

//                         <ol>
//                             {result.interviewQuestions?.map(
//                                 (question, index) => (
//                                     <li key={index}>
//                                         {question}
//                                     </li>
//                                 )
//                             )}
//                         </ol>

//                     </div>

//                 </section>
//             )}

//         </div>
//     );
// }

// export default AnalysisPage;



// import { useState } from "react";
// import "./AnalysisPage.css";

// function AnalysisPage() {
//     // Text states
//     const [resumeText, setResumeText] = useState("");
//     const [jobDescription, setJobDescription] = useState("");

//     // File states
//     const [resumeFile, setResumeFile] = useState(null);
//     const [jdFile, setJdFile] = useState(null);

//     const [loading, setLoading] = useState(false);
//     const [result, setResult] = useState(null);

//     const handleAnalyze = async (e) => {
//         e.preventDefault();

//         const token = localStorage.getItem("token");

//         if (!token) {
//             alert("Please login first");
//             return;
//         }

//         // Check if user provided EITHER text OR a file for both fields
//         const hasResume = resumeText.trim() || resumeFile;
//         const hasJd = jobDescription.trim() || jdFile;

//         if (!hasResume || !hasJd) {
//             alert("Please provide both your resume (text or PDF) and a job description (text or PDF)");
//             return;
//         }

//         setLoading(true);
//         setResult(null);

//         try {
//             // Switch to FormData for handling files
//             const formData = new FormData();
            
//             if (resumeFile) formData.append("resumeFile", resumeFile);
//             if (resumeText.trim()) formData.append("resumeText", resumeText);
            
//             if (jdFile) formData.append("jdFile", jdFile);
//             if (jobDescription.trim()) formData.append("jobDescription", jobDescription);

//             const response = await fetch(
//                 `${import.meta.env.VITE_API_URL}/api/analysis`,
//                 {
//                     method: "POST",
//                     // CRITICAL: We removed "Content-Type" so the browser can set the multipart boundary automatically
//                     headers: {
//                         Authorization: `Bearer ${token}`
//                     },
//                     body: formData
//                 }
//             );

//             const data = await response.json();

//             if (!response.ok) {
//                 alert(data.message || "Analysis failed");
//                 return;
//             }

//             setResult(data.analysis.result);

//         } catch (error) {
//             console.log("Analysis error:", error);
//             alert("Something went wrong");
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <div className="analysis-page">

//             <div className="analysis-header">
//                 <p className="analysis-label">
//                     AI RESUME ANALYZER
//                 </p>
//                 <h1>
//                     Analyze Your Resume
//                 </h1>
//                 <p>
//                     Compare your resume with a job description and
//                     discover how well your profile matches the role.
//                 </p>
//             </div>

//             <form
//                 className="analysis-form"
//                 onSubmit={handleAnalyze}
//             >

//                 <div className="input-card">
//                     <label htmlFor="resume">
//                         Your Resume
//                     </label>
//                     <p className="input-description">
//                         Upload a PDF or paste the text below.
//                     </p>
                    
//                     {/* New File Input for Resume */}
//                     <input 
//                         type="file" 
//                         accept=".pdf"
//                         onChange={(e) => setResumeFile(e.target.files[0])}
//                         style={{ marginBottom: '15px' }}
//                     />

//                     <textarea
//                         id="resume"
//                         placeholder="Paste your resume here..."
//                         value={resumeText}
//                         onChange={(e) => setResumeText(e.target.value)}
//                     />
//                 </div>

//                 <div className="input-card">
//                     <label htmlFor="job-description">
//                         Job Description
//                     </label>
//                     <p className="input-description">
//                         Upload a PDF or paste the job description you want to compare against.
//                     </p>
                    
//                     {/* New File Input for JD */}
//                     <input 
//                         type="file" 
//                         accept=".pdf"
//                         onChange={(e) => setJdFile(e.target.files[0])}
//                         style={{ marginBottom: '15px' }}
//                     />

//                     <textarea
//                         id="job-description"
//                         placeholder="Paste the job description here..."
//                         value={jobDescription}
//                         onChange={(e) => setJobDescription(e.target.value)}
//                     />
//                 </div>

//                 <button
//                     type="submit"
//                     className="analyze-submit"
//                     disabled={loading}
//                 >
//                     {loading ? "Analyzing..." : "Analyze Resume"}
//                 </button>

//             </form>

//             {result && (
//                 <section className="analysis-results">
//                     <h2>
//                         Analysis Results
//                     </h2>

//                     <div className="match-card">
//                         <span>
//                             Resume Match
//                         </span>
//                         <strong>
//                             {result.matchPercentage}%
//                         </strong>
//                     </div>

//                     <div className="result-grid">
//                         <div className="result-card">
//                             <h3>Matching Skills</h3>
//                             <ul>
//                                 {result.matchingSkills?.map((skill, index) => (
//                                     <li key={index}>{skill}</li>
//                                 ))}
//                             </ul>
//                         </div>

//                         <div className="result-card">
//                             <h3>Missing Skills</h3>
//                             <ul>
//                                 {result.missingSkills?.map((skill, index) => (
//                                     <li key={index}>{skill}</li>
//                                 ))}
//                             </ul>
//                         </div>

//                         <div className="result-card">
//                             <h3>Keywords</h3>
//                             <ul>
//                                 {result.keywords?.map((keyword, index) => (
//                                     <li key={index}>{keyword}</li>
//                                 ))}
//                             </ul>
//                         </div>

//                         <div className="result-card">
//                             <h3>Suggestions</h3>
//                             <ul>
//                                 {result.suggestions?.map((suggestion, index) => (
//                                     <li key={index}>{suggestion}</li>
//                                 ))}
//                             </ul>
//                         </div>
//                     </div>

//                     <div className="interview-card">
//                         <h3>
//                             Interview Questions
//                         </h3>
//                         <ol>
//                             {result.interviewQuestions?.map((question, index) => (
//                                 <li key={index}>{question}</li>
//                             ))}
//                         </ol>
//                     </div>
//                 </section>
//             )}
//         </div>
//     );
// }

// export default AnalysisPage;





import { useState, useRef } from "react";
import "./AnalysisPage.css";
import { useAuthStore } from "../store/authStore";


function AnalysisPage() {
    // Text states
    const [resumeText, setResumeText] = useState("");
    const [jobDescription, setJobDescription] = useState("");

    // File states
    const [resumeFile, setResumeFile] = useState(null);
    const [jdFile, setJdFile] = useState(null);

    // Refs to reset file inputs
    const resumeFileRef = useRef(null);
    const jdFileRef = useRef(null);

    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);
    const token = useAuthStore((state) => state.token);

    const handleAnalyze = async (e) => {
        e.preventDefault();

        if (!token) {
            alert("Please login first");
            return;
        }

        // Check if user provided EITHER text OR a file for both fields
        const hasResume = resumeText.trim() || resumeFile;
        const hasJd = jobDescription.trim() || jdFile;

        if (!hasResume || !hasJd) {
            alert(
                "Please provide both your resume (text or PDF) and a job description (text or PDF)"
            );
            return;
        }

        setLoading(true);
        setResult(null);

        try {
            // FormData handles text and PDF files
            const formData = new FormData();

            if (resumeFile) formData.append("resumeFile", resumeFile);
            if (resumeText.trim()) formData.append("resumeText", resumeText);

            if (jdFile) formData.append("jdFile", jdFile);
            if (jobDescription.trim()) {
                formData.append("jobDescription", jobDescription);
            }

            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/api/analysis`,
                {
                    method: "POST",
                    // Do not set Content-Type manually.
                    // The browser sets the multipart boundary automatically.
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                    body: formData
                }
            );

            const data = await response.json();

            if (!response.ok) {
                alert(data.message || "Analysis failed");
                return;
            }

            // Display analysis results
            setResult(data.analysis.result);

            // Clear pasted text after successful analysis
            setResumeText("");
            setJobDescription("");

            // Clear selected files from React state
            setResumeFile(null);
            setJdFile(null);

            // Clear selected filenames from the actual file inputs
            if (resumeFileRef.current) {
                resumeFileRef.current.value = "";
            }

            if (jdFileRef.current) {
                jdFileRef.current.value = "";
            }

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
                        Upload a PDF or paste the text below.
                    </p>

                    {/* Resume PDF Input */}
                    <input
                        ref={resumeFileRef}
                        type="file"
                        accept=".pdf"
                        onChange={(e) =>
                            setResumeFile(e.target.files[0] || null)
                        }
                        style={{ marginBottom: "15px" }}
                    />

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
                        Upload a PDF or paste the job description you want to compare against.
                    </p>

                    {/* Job Description PDF Input */}
                    <input
                        ref={jdFileRef}
                        type="file"
                        accept=".pdf"
                        onChange={(e) =>
                            setJdFile(e.target.files[0] || null)
                        }
                        style={{ marginBottom: "15px" }}
                    />

                    <textarea
                        id="job-description"
                        placeholder="Paste the job description here..."
                        value={jobDescription}
                        onChange={(e) =>
                            setJobDescription(e.target.value)
                        }
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
                                {result.matchingSkills?.map((skill, index) => (
                                    <li key={index}>{skill}</li>
                                ))}
                            </ul>
                        </div>

                        <div className="result-card">
                            <h3>Missing Skills</h3>

                            <ul>
                                {result.missingSkills?.map((skill, index) => (
                                    <li key={index}>{skill}</li>
                                ))}
                            </ul>
                        </div>

                        <div className="result-card">
                            <h3>Keywords</h3>

                            <ul>
                                {result.keywords?.map((keyword, index) => (
                                    <li key={index}>{keyword}</li>
                                ))}
                            </ul>
                        </div>

                        <div className="result-card">
                            <h3>Suggestions</h3>

                            <ul>
                                {result.suggestions?.map((suggestion, index) => (
                                    <li key={index}>{suggestion}</li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div className="interview-card">
                        <h3>
                            Interview Questions
                        </h3>

                        <ol>
                            {result.interviewQuestions?.map((question, index) => (
                                <li key={index}>{question}</li>
                            ))}
                        </ol>
                    </div>
                </section>
            )}
        </div>
    );
}

export default AnalysisPage;