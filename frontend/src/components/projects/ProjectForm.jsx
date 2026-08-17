import { useEffect, useState } from "react";

function ProjectForm({
    project,
    onCancel,
    onSubmit,
    submitting
}) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [image_url, setImageUrl] = useState("");
    const [github_url, setGithubUrl] = useState("");
    const [live_url, setLiveUrl] = useState("");

    useEffect(() => {
        if (project) {
            setTitle(project.title || "");
            setDescription(project.description || "");
            setImageUrl(project.image_url || "");
            setGithubUrl(project.github_url || "");
            setLiveUrl(project.live_url || "");
        } else {
            setTitle("");
            setDescription("");
            setImageUrl("");
            setGithubUrl("");
            setLiveUrl("");
        }
    }, [project]);

    function handleSubmit(e) {
        e.preventDefault();

        onSubmit({
            title,
            description,
            image_url,
            github_url,
            live_url
        });
    }

    const isEditing = Boolean(project);

    return (
        <form
            onSubmit={handleSubmit}
            className="mb-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
        >
            <h2 className="text-xl font-semibold text-gray-900">
                {isEditing ? "Edit Project" : "Add New Project"}
            </h2>

            <div className="mt-6 grid gap-5">

                <div>
                    <label className="text-sm font-medium text-gray-700">
                        Title
                    </label>

                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-black"
                    />
                </div>

                <div>
                    <label className="text-sm font-medium text-gray-700">
                        Description
                    </label>

                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        rows="4"
                        className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-black"
                    />
                </div>

                <div>
                    <label className="text-sm font-medium text-gray-700">
                        Image URL
                    </label>

                    <input
                        type="url"
                        value={image_url}
                        onChange={(e) => setImageUrl(e.target.value)}
                        className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-black"
                    />
                </div>

                <div>
                    <label className="text-sm font-medium text-gray-700">
                        GitHub URL
                    </label>

                    <input
                        type="url"
                        value={github_url}
                        onChange={(e) => setGithubUrl(e.target.value)}
                        className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-black"
                    />
                </div>

                <div>
                    <label className="text-sm font-medium text-gray-700">
                        Live URL
                    </label>

                    <input
                        type="url"
                        value={live_url}
                        onChange={(e) => setLiveUrl(e.target.value)}
                        className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-black"
                    />
                </div>

            </div>

            <div className="mt-6 flex gap-3">

                <button
                    type="submit"
                    disabled={submitting}
                    className="rounded-xl bg-black px-5 py-3 text-sm font-medium text-white hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
                >
                    {submitting
                        ? "Saving..."
                        : isEditing
                            ? "Save Changes"
                            : "Create Project"}
                </button>

                <button
                    type="button"
                    onClick={onCancel}
                    className="rounded-xl border border-gray-300 px-5 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                    Cancel
                </button>

            </div>
        </form>
    );
}

export default ProjectForm;