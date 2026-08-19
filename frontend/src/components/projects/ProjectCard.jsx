function ProjectCard({
    project,
    onDelete,
    onEdit,
    onPublish
}) {
    const getImageUrl = (imageUrl) => {
        if (!imageUrl) return "";

        // إذا الرابط كامل
        if (
            imageUrl.startsWith("http://") ||
            imageUrl.startsWith("https://")
        ) {
            return imageUrl;
        }

        // إذا المسار يبدأ بـ /
        return `http://localhost:5000${imageUrl}`;
    };

    const imageUrl = getImageUrl(project.image_url);

    return (
        <article className="group overflow-hidden rounded-2xl border border-gray-200 bg-white transition hover:-translate-y-1 hover:shadow-xl">

            {/* Image */}
            <div className="aspect-video overflow-hidden bg-gray-100">

                {imageUrl ? (
                    <img
                        src={imageUrl}
                        alt={project.title}
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                        onError={(e) => {
                            console.error(
                                "PROJECT IMAGE FAILED:",
                                imageUrl
                            );

                            e.currentTarget.style.display = "none";
                        }}
                    />
                ) : (
                    <div className="flex h-full items-center justify-center text-sm text-gray-400">
                        No image
                    </div>
                )}

            </div>


            <div className="p-6">

                {/* Header */}
                <div className="flex items-start justify-between gap-4">

                    <h3 className="text-xl font-semibold text-gray-900">
                        {project.title}
                    </h3>

                    {project.is_published ? (
                        <span className="shrink-0 rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-700">
                            Published
                        </span>
                    ) : (
                        <span className="shrink-0 rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-500">
                            Draft
                        </span>
                    )}

                </div>


                {/* Description */}
                <p className="mt-3 line-clamp-3 text-sm leading-6 text-gray-600">
                    {project.description || "No description"}
                </p>


                {/* Skills */}
                {project.skills &&
                    project.skills.length > 0 && (

                    <div className="mt-4 flex flex-wrap gap-2">

                        {project.skills.map((skill) => (

                            <span
                                key={skill.id}
                                className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700"
                            >
                                {skill.name}
                            </span>

                        ))}

                    </div>

                )}


                {/* Links */}
                <div className="mt-5 flex flex-wrap gap-2">

                    {project.github_url && (
                        <a
                            href={project.github_url}
                            target="_blank"
                            rel="noreferrer"
                            className="rounded-lg border border-gray-300 px-3 py-2 text-xs font-medium text-gray-700 transition hover:bg-gray-50"
                        >
                            GitHub
                        </a>
                    )}

                    {project.live_url && (
                        <a
                            href={project.live_url}
                            target="_blank"
                            rel="noreferrer"
                            className="rounded-lg border border-gray-300 px-3 py-2 text-xs font-medium text-gray-700 transition hover:bg-gray-50"
                        >
                            Live Demo
                        </a>
                    )}

                </div>


                {/* Actions */}
                <div className="mt-6 flex flex-wrap gap-2 border-t border-gray-100 pt-5">

                    <button
                        type="button"
                        onClick={() => onEdit(project)}
                        className="rounded-xl border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
                    >
                        Edit
                    </button>


                    <button
                        type="button"
                        onClick={() => onPublish(project.id)}
                        className={`rounded-xl px-4 py-2 text-sm font-medium transition ${
                            project.is_published
                                ? "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                : "bg-green-600 text-white hover:bg-green-700"
                        }`}
                    >
                        {project.is_published
                            ? "Unpublish"
                            : "Publish"}
                    </button>


                    <button
                        type="button"
                        onClick={() => onDelete(project.id)}
                        className="rounded-xl bg-red-50 px-4 py-2 text-sm font-medium text-red-600 transition hover:bg-red-100"
                    >
                        Delete
                    </button>

                </div>

            </div>

        </article>
    );
}

export default ProjectCard;