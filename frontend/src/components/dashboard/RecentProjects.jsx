import { Link } from "react-router-dom";

function RecentProjects({ projects = [], loading }) {
    return (
        <div className="mt-8 rounded-xl border border-gray-200 bg-white">
            <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
                <div>
                    <h2 className="font-semibold text-gray-900">
                        Recent Projects
                    </h2>

                    <p className="mt-1 text-sm text-gray-500">
                        Your latest projects.
                    </p>
                </div>

                <Link
                    to="/dashboard/projects"
                    className="text-sm font-medium text-gray-900 hover:underline"
                >
                    View all
                </Link>
            </div>

            <div className="divide-y divide-gray-100">
                {loading ? (
                    <div className="px-5 py-8 text-center text-sm text-gray-500">
                        Loading projects...
                    </div>
                ) : projects.length === 0 ? (
                    <div className="px-5 py-8 text-center">
                        <p className="text-sm font-medium text-gray-900">
                            No projects yet
                        </p>

                        <p className="mt-1 text-sm text-gray-500">
                            Your recent projects will appear here.
                        </p>
                    </div>
                ) : (
                    projects.map((project) => (
                        <div
                            key={project.id}
                            className="flex flex-col gap-4 px-5 py-4 sm:flex-row sm:items-center sm:justify-between"
                        >
                            <div className="flex items-center gap-4">
                                <div className="h-12 w-12 shrink-0 overflow-hidden rounded-lg bg-gray-100">
                                    {project.image_url ? (
                                        <img
                                            src={project.image_url}
                                            alt={project.title}
                                            className="h-full w-full object-cover"
                                        />
                                    ) : (
                                        <div className="flex h-full w-full items-center justify-center text-xs text-gray-400">
                                            No image
                                        </div>
                                    )}
                                </div>

                                <div>
                                    <h3 className="font-medium text-gray-900">
                                        {project.title}
                                    </h3>

                                    <p className="mt-1 line-clamp-1 text-sm text-gray-500">
                                        {project.description || "No description"}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                {project.github_url && (
                                    <a
                                        href={project.github_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-sm font-medium text-gray-600 hover:text-gray-900"
                                    >
                                        GitHub
                                    </a>
                                )}

                                {project.live_url && (
                                    <a
                                        href={project.live_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-sm font-medium text-gray-600 hover:text-gray-900"
                                    >
                                        Live
                                    </a>
                                )}
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default RecentProjects;