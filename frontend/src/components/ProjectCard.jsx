function ProjectCard({ project }) {
    return (
        <article className="group overflow-hidden rounded-2xl border border-gray-200 bg-white transition hover:-translate-y-1 hover:shadow-xl">

            <div className="aspect-video overflow-hidden bg-gray-100">
                <img
                    src={project.image_url}
                    alt={project.title}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />
            </div>

            <div className="p-6">

                <h3 className="text-xl font-semibold text-gray-900">
                    {project.title}
                </h3>

                <p className="mt-3 line-clamp-2 text-sm leading-6 text-gray-600">
                    {project.description}
                </p>

                <div className="mt-6 flex items-center gap-3">

                    {project.github_url && (
                        <a
                            href={project.github_url}
                            target="_blank"
                            rel="noreferrer"
                            className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium transition hover:bg-gray-100"
                        >
                            GitHub
                        </a>
                    )}

                    {project.live_url && (
                        <a
                            href={project.live_url}
                            target="_blank"
                            rel="noreferrer"
                            className="rounded-lg bg-black px-4 py-2 text-sm font-medium text-white transition hover:bg-gray-800"
                        >
                            Live Demo
                        </a>
                    )}

                </div>

            </div>

        </article>
    );
}

export default ProjectCard;