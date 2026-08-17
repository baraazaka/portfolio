import EditProjectButton from "./EditProjectButton";
import DeleteProjectButton from "./DeleteProjectButton";

function ProjectCard({
    project,
    onEdit,
    onDelete
}) {
    return (
        <div className="group overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">

            {/* Image */}
            {project.image_url ? (
                <div className="h-48 overflow-hidden bg-gray-100">
                    <img
                        src={project.image_url}
                        alt={project.title}
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                </div>
            ) : (
                <div className="flex h-48 items-center justify-center bg-gray-100 text-sm text-gray-400">
                    No image
                </div>
            )}


            {/* Content */}
            <div className="p-6">

                {/* Title */}
                <h2 className="text-xl font-semibold text-gray-900">
                    {project.title}
                </h2>


                {/* Description */}
                {project.description && (
                    <p className="mt-2 line-clamp-3 text-sm leading-6 text-gray-500">
                        {project.description}
                    </p>
                )}


                {/* Skills */}
                {project.skills?.length > 0 && (
                    <div className="mt-5">

                        <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-gray-400">
                            Technologies
                        </p>

                        <div className="flex flex-wrap gap-2">

                            {project.skills.map((skill) => (
                                <span
                                    key={skill.id}
                                    className="rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-700 transition hover:bg-gray-200"
                                >
                                    {skill.name}
                                </span>
                            ))}

                        </div>

                    </div>
                )}


                {/* Links */}
                <div className="mt-6 flex flex-wrap gap-3">

                    {project.github_url && (
                        <a
                            href={project.github_url}
                            target="_blank"
                            rel="noreferrer"
                            className="rounded-xl border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
                        >
                            GitHub
                        </a>
                    )}

                    {project.live_url && (
                        <a
                            href={project.live_url}
                            target="_blank"
                            rel="noreferrer"
                            className="rounded-xl bg-black px-4 py-2 text-sm font-medium text-white transition hover:bg-gray-800"
                        >
                            Live Demo
                        </a>
                    )}

                </div>


                {/* Actions */}
                <div className="mt-6 flex gap-3 border-t border-gray-100 pt-4 opacity-70 transition group-hover:opacity-100">

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