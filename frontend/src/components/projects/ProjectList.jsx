import ProjectCard from "./ProjectCard";

function ProjectList({ projects }) {
    if (projects.length === 0) {
        return (
            <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-12 text-center">
                <h2 className="text-lg font-semibold text-gray-900">
                    No projects yet
                </h2>

                <p className="mt-2 text-sm text-gray-500">
                    Add your first project to your portfolio.
                </p>
            </div>
        );
    }

    return (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
                <ProjectCard
                    key={project.id}
                    project={project}
                />
            ))}
        </div>
    );
}

export default ProjectList;