import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";

function LatestPortfolios() {
    const [portfolios, setPortfolios] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadFeaturedPortfolios() {
            try {
                const response = await api.get(
                    "/users/featured"
                );

                setPortfolios(response.data);

            } catch (error) {
                console.error(
                    "Featured portfolios error:",
                    error
                );
            } finally {
                setLoading(false);
            }
        }

        loadFeaturedPortfolios();
    }, []);

    if (loading) {
        return (
            <section className="bg-white py-16">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">

                    <div className="mb-8">
                        <div className="h-4 w-28 animate-pulse rounded bg-gray-100" />

                        <div className="mt-3 h-8 w-64 animate-pulse rounded bg-gray-100" />
                    </div>

                    <div className="grid gap-6 md:grid-cols-3">
                        {[1, 2, 3].map((item) => (
                            <div
                                key={item}
                                className="rounded-2xl border border-gray-200 bg-white p-6"
                            >
                                <div className="h-14 w-14 animate-pulse rounded-full bg-gray-100" />

                                <div className="mt-5 h-5 w-40 animate-pulse rounded bg-gray-100" />

                                <div className="mt-3 h-12 w-full animate-pulse rounded bg-gray-100" />
                            </div>
                        ))}
                    </div>

                </div>
            </section>
        );
    }

    if (portfolios.length === 0) {
        return null;
    }

    return (
        <section className="bg-white py-16">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">

                {/* Header */}
                <div className="mb-8 flex items-end justify-between gap-4">

                    <div>
                        <p className="text-sm font-semibold uppercase tracking-widest text-blue-600">
                            Community
                        </p>

                        <h2 className="mt-2 text-3xl font-bold tracking-tight text-gray-950">
                            Latest Portfolios
                        </h2>

                        <p className="mt-2 max-w-xl text-sm leading-6 text-gray-500">
                            Discover the latest portfolios published by our creators.
                        </p>
                    </div>

                    <Link
                        to="/portfolios"
                        className="hidden rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50 sm:inline-flex"
                    >
                        View All
                    </Link>

                </div>


                {/* Cards */}
                <div className="grid gap-6 md:grid-cols-3">

                    {portfolios.map((portfolio) => {

                        const initial =
                            portfolio.name
                                ?.charAt(0)
                                ?.toUpperCase() || "U";

                        return (
                            <Link
                                key={portfolio.id}
                                to={`/portfolio/${portfolio.username}`}
                                className="group rounded-2xl border border-gray-200 bg-white p-6 transition duration-300 hover:-translate-y-1 hover:border-gray-300 hover:shadow-lg"
                            >

                                {/* User */}
                                <div className="flex items-center gap-3">

                                    {portfolio.profile_image_url ? (
                                        <img
                                            src={
                                                portfolio.profile_image_url
                                            }
                                            alt={portfolio.name}
                                            className="h-12 w-12 rounded-full object-cover ring-2 ring-gray-100"
                                        />
                                    ) : (
                                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-950 text-sm font-semibold text-white">
                                            {initial}
                                        </div>
                                    )}

                                    <div className="min-w-0">

                                        <h3 className="truncate text-base font-semibold text-gray-950">
                                            {portfolio.name}
                                        </h3>

                                        <p className="truncate text-xs text-gray-500">
                                            @{portfolio.username}
                                        </p>

                                    </div>

                                </div>


                                {/* Job */}
                                {portfolio.job_title && (
                                    <p className="mt-5 text-sm font-medium text-gray-700">
                                        {portfolio.job_title}
                                    </p>
                                )}


                                {/* Bio */}
                                <p className="mt-2 line-clamp-3 text-sm leading-6 text-gray-500">
                                    {portfolio.bio ||
                                        "Portfolio creator"}
                                </p>


                                {/* Footer */}
                                <div className="mt-6 flex items-center justify-between border-t border-gray-100 pt-4">

                                    <span className="text-xs font-medium text-green-600">
                                        ● Published
                                    </span>

                                    <span className="text-sm font-medium text-gray-400 transition group-hover:text-gray-950">
                                        View Portfolio →
                                    </span>

                                </div>

                            </Link>
                        );
                    })}

                </div>


                {/* Mobile View All */}
                <div className="mt-6 sm:hidden">

                    <Link
                        to="/portfolios"
                        className="flex w-full items-center justify-center rounded-xl border border-gray-200 px-4 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
                    >
                        View All Portfolios
                    </Link>

                </div>

            </div>
        </section>
    );
}

export default LatestPortfolios;