import { useEffect, useState } from "react";
import api from "../services/api";

import PortfolioCard from "../components/portfolio/PortfolioCard";

function AllPortfolios() {
    const [portfolios, setPortfolios] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        async function loadPortfolios() {
            try {
                setLoading(true);
                setError("");

                const response = await api.get(
                    "/users/portfolios"
                );

                setPortfolios(response.data);

            } catch (error) {
                console.error(
                    "All portfolios error:",
                    error
                );

                setError(
                    error.response?.data?.error ||
                    "Failed to load portfolios"
                );

            } finally {
                setLoading(false);
            }
        }

        loadPortfolios();
    }, []);

    return (
        <main className="min-h-screen bg-gray-50">

            <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">

                {/* Header */}
                <div className="mb-12">

                    <p className="text-sm font-semibold uppercase tracking-widest text-blue-600">
                        Community
                    </p>

                    <h1 className="mt-3 text-4xl font-bold tracking-tight text-gray-950">
                        All Portfolios
                    </h1>

                    <p className="mt-4 max-w-2xl text-gray-500">
                        Discover portfolios created and published by our community.
                    </p>

                </div>


                {/* Loading */}
                {loading && (
                    <div className="rounded-2xl border border-gray-200 bg-white p-10 text-center">
                        <p className="text-sm text-gray-500">
                            Loading portfolios...
                        </p>
                    </div>
                )}


                {/* Error */}
                {!loading && error && (
                    <div className="rounded-2xl border border-red-200 bg-red-50 p-6">
                        <p className="text-sm text-red-600">
                            {error}
                        </p>
                    </div>
                )}


                {/* Empty */}
                {!loading &&
                    !error &&
                    portfolios.length === 0 && (
                        <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-12 text-center">

                            <h2 className="text-lg font-semibold text-gray-950">
                                No portfolios published yet
                            </h2>

                            <p className="mt-2 text-sm text-gray-500">
                                Published portfolios will appear here.
                            </p>

                        </div>
                    )}


                {/* Portfolios */}
                {!loading &&
                    !error &&
                    portfolios.length > 0 && (
                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

                            {portfolios.map((portfolio) => (
                                <PortfolioCard
                                    key={portfolio.id}
                                    portfolio={portfolio}
                                />
                            ))}

                        </div>
                    )}

            </div>

        </main>
    );
}

export default AllPortfolios;