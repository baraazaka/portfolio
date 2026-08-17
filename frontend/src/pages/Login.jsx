import { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();

    async function handleLogin(e) {
        e.preventDefault();

        try {
            const response = await api.post("/auth/Login", {
                email,
                password
            });

            localStorage.setItem("token", response.data.token);

            window.dispatchEvent(new Event("authChange"));

            navigate("/dashboard");

        } catch (error) {
            console.log(error);

            if (error.response) {
                setError(error.response.data.error);
            } else {
                setError("Login Failed");
            }
        }
    }

    return (
        <div className="min-h-screen bg-gray-50 px-6 py-16">
            <div className="mx-auto flex min-h-[70vh] max-w-md items-center justify-center">

                <div className="w-full rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
                    <div className="mb-6 flex justify-center">
    <img
        src={logo}
        alt="Bara Logo"
        className="h-16 w-auto object-contain"
    />
</div>
                    <div className="mb-8 text-center">
                        <h1 className="text-3xl font-bold text-gray-900">
                            Welcome back
                        </h1>

                        <p className="mt-2 text-sm text-gray-500">
                            Login to manage your portfolio.
                        </p>
                    </div>

                    {error && (
                        <div className="mb-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                            {error}
                        </div>
                    )}

                    <form
                        onSubmit={handleLogin}
                        className="space-y-5"
                    >

                        <div>
                            <label
                                htmlFor="email"
                                className="mb-2 block text-sm font-medium text-gray-700"
                            >
                                Email
                            </label>

                            <input
                                id="email"
                                type="email"
                                placeholder="you@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-gray-400 focus:bg-white focus:ring-2 focus:ring-gray-100"
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="password"
                                className="mb-2 block text-sm font-medium text-gray-700"
                            >
                                Password
                            </label>

                            <input
                                id="password"
                                type="password"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-gray-400 focus:bg-white focus:ring-2 focus:ring-gray-100"
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full rounded-xl bg-black px-4 py-3 font-medium text-white transition hover:bg-gray-800 active:scale-[0.99]"
                        >
                            Login →
                        </button>

                    </form>

                    <p className="mt-6 text-center text-sm text-gray-500">
                        Don't have an account?{" "}
                        <button
                            type="button"
                            onClick={() => navigate("/register")}
                            className="font-medium text-black hover:underline"
                        >
                            Register
                        </button>
                    </p>

                </div>
            </div>
        </div>
    );
}

export default Login;