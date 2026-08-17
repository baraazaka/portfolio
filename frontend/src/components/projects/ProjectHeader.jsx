function ProjectHeader({ onAddProject }) {
    return (
        <div className="mb-8 flex items-center justify-between">

            <div>
                <p className="text-sm font-semibold uppercase tracking-widest text-blue-600">
                    Dashboard
                </p>

                <h1 className="mt-2 text-3xl font-bold text-gray-900">
                    Projects
                </h1>

                <p className="mt-2 text-gray-500">
                    Manage your portfolio projects.
                </p>
            </div>

            <button
                type="button"
                onClick={onAddProject}
                className="rounded-xl bg-black px-5 py-3 text-sm font-medium text-white transition hover:bg-gray-800"
            >
                + Add Project
            </button>

        </div>
    );
}

export default ProjectHeader;