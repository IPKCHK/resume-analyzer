// import {Routes, Route } from "react-router-dom";

// import LoginPage from "./pages/LoginPage";
// import SignupPage from "./pages/SignupPage";
// import Dashboard from "./pages/Dashboard";
// import AnalysisPage from "./pages/AnalysisPage";
// import Navbar from "./components/Navbar";

// function App() {
//     return (
//           <div>
//             <Navbar/>
//             <Routes>
//                 <Route path="/" element={<Dashboard />} />
//                 <Route path="/login" element={<LoginPage />} />
//                 <Route path="/signup" element={<SignupPage />} />
//                 <Route path="/analysis" element={<AnalysisPage />} />
//             </Routes>
//           </div> 
//     );
// }

// export default App;

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import Dashboard from "./pages/Dashboard";
import AnalysisPage from "./pages/AnalysisPage";

import ProtectedRoute from "./components/ProtectedRoute";

function App() {
    return (
        <BrowserRouter>

            <Navbar />

            <Routes>

                <Route
                    path="/"
                    element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/login"
                    element={<LoginPage />}
                />

                <Route
                    path="/signup"
                    element={<SignupPage />}
                />

                <Route
                    path="/analysis"
                    element={
                        <ProtectedRoute>
                            <AnalysisPage />
                        </ProtectedRoute>
                    }
                />

            </Routes>

        </BrowserRouter>
    );
}

export default App;