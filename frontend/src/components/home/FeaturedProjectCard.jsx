import { Link } from "react-router-dom";

function FeaturedProjectCard({ project }) {

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

    const profileImage = getImageUrl(
        project.profile_image_url
    );

    const ownerInitial =
        project.user_name?.charAt(0)?.toUpperCase() || "U";

    return (
        <article className="group overflow-hidden rounded-2xl border border-gray-200 bg-white transition duration-300 hover:-translate-y-1 hover:shadow-xl">

            {/* Project Image */}
            <div className="aspect-video overflow-hidden bg-gray-100">

                {project.image_url ? (
                    <img
                        src={getImageUrl(project.image_url)}
                        alt={project.title}
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                ) : (
                    <div className="flex h-full items-center justify-center text-sm text-gray-400">
                        No image
                    </div>
                )}

            </div>


            <div className="p-6">

                {/* Owner */}
                <div className="mb-4 flex items-center gap-3">

                    {profileImage ? (
                        <img
                            src={profileImage}
                            alt={project.user_name || "User"}
                            className="h-10 w-10 rounded-full object-cover border border-gray-200"
                            onError={(e) => {
                                e.currentTarget.style.display = "none";
                                e.currentTarget.nextElementSibling.style.display = "flex";
                            }}
                        />
                    ) : null}

                    {/* Fallback avatar */}
                    <div
                        className={`h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-sm font-semibold text-gray-700 ${
                            profileImage ? "hidden" : "flex"
                        }`}
                    >
                        {ownerInitial}
                    </div>

                    <div>
                        <p className="text-sm font-semibold text-gray-900">
                            {project.user_name || "Unknown user"}
                        </p>

                        <p className="text-xs text-gray-500">
                            Project Owner
                        </p>
                    </div>

                </div>


                {/* Title */}
                <h3 className="text-xl font-semibold text-gray-900">
                    {project.title}
                </h3>


                {/* Description */}
                <p className="mt-3 line-clamp-3 text-sm leading-6 text-gray-600">
                    {project.description || "No description available."}
                </p>


                {/* Actions */}
                <div className="mt-6 flex items-center gap-3">

                    <Link
                        to={`/projects/${project.id}`}
                        className="rounded-xl bg-black px-4 py-2 text-sm font-medium text-white transition hover:bg-gray-800"
                    >
                        View Project
                    </Link>

                    {project.github_url && (
                        <a
                            href={project.github_url}
                            target="_blank"
                            rel="noreferrer"
                            className="rounded-xl border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
                        >
                            GitHub
                        </a>
                    )}

                </div>

            </div>

        </article>
    );
}

export default FeaturedProjectCard;