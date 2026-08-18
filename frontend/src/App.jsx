import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PublicProjects from "./pages/PublicProjects";
import ProjectDetails from "./pages/ProjectDetails";

import Dashboard from "./pages/Dashboard";
import Projects from "./pages/Projects";
import Skills from "./pages/Skills";
import Experience from "./pages/Experience";
import Messages from "./pages/Messages";
import Contact from "./pages/Contact";

import ProtectedRoute from "./components/ProtectedRoute";
import DashboardLayout from "./components/dashboard/DashboardLayout";
import Navbar from "./components/home/Navbar";


function App() {
    return (
        <BrowserRouter>

            {/* Public Navbar */}
            <Navbar />

            <Routes>

                {/* =========================
                    Public Pages
                ========================= */}
                <Route
                path="/contact"
                element={<Contact />}
                            />
                <Route
                    path="/"
                    element={<Home />}
                />

                <Route
                    path="/projects"
                    element={<PublicProjects />}
                />

                <Route
                    path="/projects/:id"
                    element={<ProjectDetails />}
                />

                <Route
                    path="/login"
                    element={<Login />}
                />

                <Route
                    path="/register"
                    element={<Register />}
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