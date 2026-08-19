function PortfolioProjects({ projects = [] }) {
    return (
        <section
            id="projects"
            className="border-b border-gray-200 bg-white"
        >
            <div className="mx-auto max-w-3xl px-6 py-12 sm:px-10 sm:py-14">

                <div className="mb-8">
                    <p className="text-xs font-medium uppercase tracking-[0.2em] text-gray-400">
                        Projects
                    </p>

                    <h2 className="mt-2 text-2xl font-semibold tracking-tight text-gray-950">
                        Selected work
                    </h2>
                </div>

                {projects.length === 0 ? (
                    <p className="border-t border-gray-200 py-6 text-sm text-gray-400">
                        No projects added yet.
                    </p>
                ) : (
                    <div className="border-t border-gray-200">

                        {projects.map((project, index) => (
                            <article
                                key={project.id}
                                className="group grid gap-6 border-b border-gray-200 py-7 sm:grid-cols-[1fr_150px]"
                            >

                                {/* Information */}
                                <div className="flex min-w-0 gap-4">

                                    <span className="pt-1 text-xs text-gray-300">
                                        {String(index + 1).padStart(2, "0")}
                                    </span>

                                    <div className="min-w-0">

                                        <h3 className="text-lg font-semibold tracking-tight text-gray-950">
                                            {project.title}
                                        </h3>

                                        {project.description && (
                                            <p className="mt-2 max-w-xl text-sm leading-6 text-gray-500">
                                                {project.description}
                                            </p>
                                        )}

                                        <div className="mt-4 flex flex-wrap gap-4">

                                            {project.live_url && (
                                                <a
                                                    href={project.live_url}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className="text-sm font-medium text-gray-900 underline decoration-gray-300 underline-offset-4 transition hover:decoration-gray-900"
                                                >
                                                    Live Demo →
                                                </a>
                                            )}

                                            {project.github_url && (
                                                <a
                                                    href={project.github_url}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className="text-sm text-gray-500 underline decoration-gray-200 underline-offset-4 transition hover:text-gray-900"
                                                >
                                                    GitHub
                                                </a>
                                            )}

                                        </div>

                                    </div>

                                </div>


                                
                            </article>
                        ))}

                    </div>
                )}

            </div>
        </section>
    );
}

export default PortfolioProjects;