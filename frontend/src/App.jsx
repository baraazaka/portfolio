import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

import PublicProjects from "./pages/PublicProjects";
import ProjectDetails from "./pages/ProjectDetails";
import PublicPortfolio from "./pages/PublicPortfolio";
import AllPortfolios from "./pages/AllPortfolios";

import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Projects from "./pages/Projects";
import Skills from "./pages/Skills";
import Experience from "./pages/Experience";
import Messages from "./pages/Messages";
import Contact from "./pages/Contact";

import ProtectedRoute from "./components/ProtectedRoute";
import DashboardLayout from "./components/dashboard/DashboardLayout";
import Navbar from "./components/navbar/Navbar";

function App() {
    return (
        <BrowserRouter>

            <Navbar />

            <Routes>

                {/* =========================
                    Public Pages
                ========================= */}

                <Route
                    path="/"
                    element={<Home />}
                />

                <Route
                    path="/contact"
                    element={<Contact />}
                />

                <Route
                    path="/login"
                    element={<Login />}
                />

                <Route
                    path="/register"
                    element={<Register />}
                />

                {/* All Projects */}
                <Route
                    path="/projects"
                    element={<PublicProjects />}
                />

                {/* Project Details */}
                <Route
                    path="/projects/:id"
                    element={<ProjectDetails />}
                />

                {/* All Published Portfolios */}
                <Route
                    path="/portfolios"
                    element={<AllPortfolios />}
                />

                {/* Single Public Portfolio */}
                <Route
                    path="/portfolio/:username"
                    element={<PublicPortfolio />}
                />


                {/* =========================
                    Dashboard
                ========================= */}

                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
                            <DashboardLayout />
                        </ProtectedRoute>
                    }
                >

                    <Route
                        index
                        element={<Dashboard />}
                    />

                    <Route
                        path="profile"
                        element={<Profile />}
                    />

                    <Route
                        path="projects"
                        element={<Projects />}
                    />

                    <Route
                        path="skills"
                        element={<Skills />}
                    />

                    <Route
                        path="experience"
                        element={<Experience />}
                    />

                    <Route
                        path="messages"
                        element={<Messages />}
                    />

                </Route>

            </Routes>

        </BrowserRouter>
    );
}

export default App;