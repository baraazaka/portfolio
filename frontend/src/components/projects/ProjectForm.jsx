import { useEffect, useState } from "react";
import { getMySkills } from "../../services/api";

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

    const [skills, setSkills] = useState([]);
    const [selectedSkills, setSelectedSkills] = useState([]);

    const [loadingSkills, setLoadingSkills] = useState(true);

    useEffect(() => {
        async function loadSkills() {
            try {
                const data = await getMySkills();
                setSkills(data);
            } catch (error) {
                console.error("Failed to load skills:", error);
            } finally {
                setLoadingSkills(false);
            }
        }

        loadSkills();
    }, []);

    useEffect(() => {
        if (project) {
            setTitle(project.title || "");
            setDescription(project.description || "");
            setImageUrl(project.image_url || "");
            setGithubUrl(project.github_url || "");
            setLiveUrl(project.live_url || "");

            // Skills الموجودة مسبقًا في المشروع
            setSelectedSkills(
                Array.isArray(project.skills)
                    ? project.skills.map((skill) =>
                        Number(skill.id ?? skill)
                    )
                    : []
            );
        } else {
            setTitle("");
            setDescription("");
            setImageUrl("");
            setGithubUrl("");
            setLiveUrl("");
            setSelectedSkills([]);
        }
    }, [project]);

    function handleSkillToggle(skillId) {
        setSelectedSkills((currentSkills) => {
            if (currentSkills.includes(skillId)) {
                return currentSkills.filter(
                    (id) => id !== skillId
                );
            }

            return [...currentSkills, skillId];
        });
    }

    function handleSubmit(e) {
        e.preventDefault();

        onSubmit({
            title,
            description,
            image_url,
            github_url,
            live_url,
            skills: selectedSkills
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

                {/* Title */}
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


                {/* Description */}
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


                {/* Image */}
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


                {/* GitHub */}
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


                {/* Live URL */}
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


                {/* Skills */}
                <div>
                    <div className="flex items-center justify-between">
                        <label className="text-sm font-medium text-gray-700">
                            Technologies & Skills
                        </label>

                        {selectedSkills.length > 0 && (
                            <span className="text-xs text-gray-500">
                                {selectedSkills.length} selected
                            </span>
                        )}
                    </div>

                    {loadingSkills ? (
                        <div className="mt-3 rounded-xl border border-gray-200 bg-gray-50 p-4 text-sm text-gray-500">
                            Loading skills...
                        </div>
                    ) : skills.length === 0 ? (
                        <div className="mt-3 rounded-xl border border-yellow-200 bg-yellow-50 p-4 text-sm text-yellow-700">
                            You don't have any skills yet.
                            Add some skills first.
                        </div>
                    ) : (
                        <div className="mt-3 grid gap-3 sm:grid-cols-2">

                            {skills.map((skill) => {
                                const isSelected =
                                    selectedSkills.includes(
                                        Number(skill.id)
                                    );

                                return (
                                    <button
                                        key={skill.id}
                                        type="button"
                                        onClick={() =>
                                            handleSkillToggle(
                                                Number(skill.id)
                                            )
                                        }
                                        className={`flex items-center justify-between rounded-xl border p-4 text-left transition ${
                                            isSelected
                                                ? "border-black bg-black text-white"
                                                : "border-gray-200 bg-white text-gray-700 hover:border-gray-400 hover:bg-gray-50"
                                        }`}
                                    >
                                        <div>
                                            <p className="font-medium">
                                                {skill.name}
                                            </p>

                                            <p
                                                className={`mt-1 text-xs ${
                                                    isSelected
                                                        ? "text-gray-300"
                                                        : "text-gray-400"
                                                }`}
                                            >
                                                {skill.category}
                                            </p>
                                        </div>

                                        <div
                                            className={`flex h-6 w-6 items-center justify-center rounded-full border text-xs ${
                                                isSelected
                                                    ? "border-white bg-white text-black"
                                                    : "border-gray-300"
                                            }`}
                                        >
                                            {isSelected ? "✓" : ""}
                                        </div>
                                    </button>
                                );
                            })}

                        </div>
                    )}
                </div>

            </div>


            {/* Buttons */}
            <div className="mt-6 flex gap-3">

                <button
                    type="submit"
                    disabled={submitting}
                    className="rounded-xl bg-black px-5 py-3 text-sm font-medium text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
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
                    className="rounded-xl border border-gray-300 px-5 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
                >
                    Cancel
                </button>

            </div>

        </form>
    );
}

export default ProjectForm;