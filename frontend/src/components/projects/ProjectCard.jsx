import DeleteProjectButton from "./DeleteProjectButton";
import EditProjectButton from "./EditProjectButton";

function ProjectCard({ project, onDelete, onEdit }) {
    return (
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">

            {project.image_url ? (
                <img
                    src={project.image_url}
                    alt={project.title}
                    className="h-48 w-full object-cover"
                />
            ) : (
                <div className="flex h-48 items-center justify-center bg-gray-100 text-sm text-gray-400">
                    No image
                </div>
            )}

            <div className="p-5">

                <h2 className="text-lg font-semibold text-gray-900">
                    {project.title}
                </h2>

                <p className="mt-2 line-clamp-3 text-sm text-gray-500">
                    {project.description}
                </p>

                <div className="mt-5 flex flex-wrap gap-3">

                    {project.github_url && (
                        <a
                            href={project.github_url}
                            target="_blank"
                            rel="noreferrer"
                            className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                        >
                            GitHub
                        </a>
                    )}

                    {project.live_url && (
                        <a
                            href={project.live_url}
                            target="_blank"
                            rel="noreferrer"
                            className="rounded-lg bg-black px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
                        >
                            Live Demo
                        </a>
                    )}

                </div>

                <div className="mt-5 flex gap-3 border-t border-gray-100 pt-4">

                    <EditProjectButton
                        onEdit={() => onEdit(project)}
                    />

                    <DeleteProjectButton
                        onDelete={() => onDelete(project.id)}
                    />

                </div>

            </div>
        </div>
    );
}

export default ProjectCard;