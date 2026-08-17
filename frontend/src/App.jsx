import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

import ProtectedRoute from "./components/ProtectedRoute";

import Dashboard from "./pages/Dashboard";
import Projects from "./pages/Projects";

import DashboardLayout from "./components/dashboard/DashboardLayout";

function App() {
    return (
        <BrowserRouter>
            <Routes>

                {/* Public Pages */}
                <Route
                    path="/"
                    element={<Home />}
                />

                <Route
                    path="/Login"
                    element={<Login />}
                />

                <Route
                    path="/Register"
                    element={<Register />}
                />


                {/* Protected Dashboard */}
                <Route
                    path="/Dashboard"
                    element={
                        <ProtectedRoute>
                            <DashboardLayout />
                        </ProtectedRoute>
                    }
                >
                    {/* /Dashboard */}
                    <Route
                        index
                        element={<Dashboard />}
                    />

                    {/* /Dashboard/Projects */}
                    <Route
                        path="Projects"
                        element={<Projects />}
                    />

                </Route>

            </Routes>
        </BrowserRouter>
    );
}

export default App;