import { BrowserRouter, Routes, Route } from "react-router-dom";
import Experience from "./pages/Experience";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Skills from "./pages/Skills";
import Messages from "./pages/Messages";
import ProtectedRoute from "./components/ProtectedRoute";

import Dashboard from "./pages/Dashboard";
import Projects from "./pages/Projects";

import DashboardLayout from "./components/dashboard/DashboardLayout";

function App() {
    return (
        <BrowserRouter>
            <Routes>


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



                <Route
                    path="/Dashboard"
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
                        path="Projects"
                        element={<Projects />}
                    />

                    <Route
                        path="Skills"
                        element={<Skills />}
                    />

                    <Route
                        path="Experience"
                        element={<Experience />}
                    />
                    <Route
                    path="Messages"
                    element={<Messages />}
                                    />
                </Route>

            </Routes>
        </BrowserRouter>
    );
}

export default App;