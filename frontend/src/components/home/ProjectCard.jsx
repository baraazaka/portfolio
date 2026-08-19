function ProjectCard({ project }) {
    return (
        <article className="group overflow-hidden rounded-2xl border border-gray-200 bg-white transition hover:-translate-y-1 hover:shadow-xl">

            {/* Image */}
            <div className="aspect-video overflow-hidden bg-gray-100">
                {project.image_url ? (
                    <img
                        src={project.image_url}
                        alt={project.title}
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                ) : (
                    <div className="flex h-full items-center justify-center text-sm text-gray-400">
                        No image
                    </div>
                )}
            </div>


            {/* Content */}
            <div className="p-6">

                {/* Title */}
                <h3 className="text-xl font-semibold text-gray-900">
                    {project.title}
                </h3>


                {/* Description */}
                {project.description && (
                    <p className="mt-3 line-clamp-2 text-sm leading-6 text-gray-600">
                        {project.description}
                    </p>
                )}
              

                {/* Technologies */}
                {project.skills?.length > 0 && (
                    <div className="mt-5">

                        <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-gray-400">
                            Technologies
                        </p>

                        <div className="flex flex-wrap gap-2">
                            {project.skills.map((skill) => (
                                <span
                                    key={skill.id}
                                    className="rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-700 transition group-hover:bg-gray-200"
                                >
                                    {skill.name}
                                </span>
                            ))}
                        </div>

                    </div>
                )}


                {/* Links */}
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