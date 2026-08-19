import { useState } from "react";
import { Link } from "react-router-dom";
import { publishPortfolio } from "../../services/api";

function PortfolioPublishCard({ user }) {
    const [publishing, setPublishing] = useState(false);
    const [published, setPublished] = useState(
        user?.portfolio_published ?? false
    );
    const [error, setError] = useState("");

    async function handlePublish() {
        if (!user?.id) {
            setError("User information not found");
            return;
        }

        try {
            setPublishing(true);
            setError("");

            const data = await publishPortfolio(user.id);

            setPublished(
                data.user?.portfolio_published ?? true
            );

        } catch (error) {
            console.error(
                "Publish portfolio error:",
                error
            );

            setError(
                error.response?.data?.error ||
                "Failed to publish portfolio"
            );

        } finally {
            setPublishing(false);
        }
    }

    return (
        <div className="mt-8 rounded-2xl border border-gray-200 bg-white p-6">

            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

                <div>
                    <p className="text-sm font-semibold uppercase tracking-wide text-gray-400">
                        Your Portfolio
                    </p>

                    <h2 className="mt-1 text-xl font-bold text-gray-900">
                        {published
                            ? "Your portfolio is live"
                            : "Your portfolio is ready"}
                    </h2>

                    <p className="mt-2 max-w-xl text-sm leading-6 text-gray-500">
                        {published
                            ? "Your portfolio is now available for others to view."
                            : "Publish your portfolio and share your work with others."}
                    </p>
                </div>

                <div className="flex flex-wrap gap-3">

                    {published && user?.username ? (
                        <Link
                            to={`/portfolio/${user.username}`}
                            className="rounded-xl bg-black px-5 py-3 text-sm font-medium text-white transition hover:bg-gray-800"
                        >
                            View Portfolio
                        </Link>
                    ) : (
                        <button
                            type="button"
                            onClick={handlePublish}
                            disabled={publishing}
                            className="rounded-xl bg-black px-5 py-3 text-sm font-medium text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            {publishing
                                ? "Publishing..."
                                : "Publish Portfolio"}
                        </button>
                    )}

                </div>
            </div>

            {error && (
                <div className="mt-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                    {error}
                </div>
            )}

        </div>
    );
}

export default PortfolioPublishCard;