import { Link } from "react-router-dom";

function PortfolioCard({ portfolio }) {

    function getImageUrl(imageUrl) {
        if (!imageUrl) {
            return "";
        }

        if (
            imageUrl.startsWith("http://") ||
            imageUrl.startsWith("https://")
        ) {
            return imageUrl;
        }

        return `http://localhost:5000${imageUrl}`;
    }

    const imageUrl = getImageUrl(
        portfolio.profile_image_url
    );

    const initial =
        portfolio.name?.charAt(0)?.toUpperCase() || "U";

    return (
        <Link
            to={`/portfolio/${portfolio.username}`}
            className="group block"
        >
            <article className="overflow-hidden rounded-2xl border border-gray-200 bg-white transition duration-300 hover:-translate-y-1 hover:border-gray-300 hover:shadow-xl">

                {/* Profile Image */}
                <div className="flex justify-center bg-gray-50 px-6 pt-8">

                    {imageUrl ? (
                        <img
                            src={imageUrl}
                            alt={portfolio.name}
                            className="h-24 w-24 rounded-full object-cover border-4 border-white shadow-md"
                            onError={(e) => {
                                e.currentTarget.style.display =
                                    "none";
                            }}
                        />
                    ) : (
                        <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gray-950 text-2xl font-bold text-white shadow-md">
                            {initial}
                        </div>
                    )}

                </div>


                {/* Content */}
                <div className="p-6 text-center">

                    <h2 className="text-xl font-semibold text-gray-950">
                        {portfolio.name}
                    </h2>

                    {portfolio.job_title && (
                        <p className="mt-1 text-sm font-medium text-blue-600">
                            {portfolio.job_title}
                        </p>
                    )}

                    {portfolio.location && (
                        <p className="mt-2 text-xs text-gray-400">
                            {portfolio.location}
                        </p>
                    )}

                    <p className="mt-4 line-clamp-3 text-sm leading-6 text-gray-500">
                        {portfolio.bio ||
                            "Welcome to my portfolio."}
                    </p>


                    {/* Button */}
                    <div className="mt-6">

                        <span className="inline-flex rounded-xl bg-black px-5 py-2.5 text-sm font-medium text-white transition group-hover:bg-gray-800">
                            View Portfolio
                        </span>

                    </div>

                </div>

            </article>
        </Link>
    );
}

export default PortfolioCard;