import { useEffect, useState } from "react";

function SkillForm({
    skill,
    onCancel,
    onSubmit,
    submitting
}) {
    const [name, setName] = useState("");
    const [category, setCategory] = useState("");
    const [level, setLevel] = useState("");

    useEffect(() => {
        if (skill) {
            setName(skill.name || "");
            setCategory(skill.category || "");
            setLevel(skill.level ?? "");
        } else {
            setName("");
            setCategory("");
            setLevel("");
        }
    }, [skill]);

    function handleSubmit(e) {
        e.preventDefault();

        onSubmit({
            name,
            category,
            level: Number(level)
        });
    }

    const isEditing = Boolean(skill);

    return (
        <form
            onSubmit={handleSubmit}
            className="mb-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
        >
            <h2 className="text-xl font-semibold text-gray-900">
                {isEditing ? "Edit Skill" : "Add New Skill"}
            </h2>

            <div className="mt-6 grid gap-5">

                {/* Skill Name */}
                <div>
                    <label className="text-sm font-medium text-gray-700">
                        Skill Name
                    </label>

                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. React"
                        required
                        className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-black"
                    />
                </div>


                {/* Category */}
                <div>
                    <label className="text-sm font-medium text-gray-700">
                        Category
                    </label>

                    <input
                        type="text"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        placeholder="e.g. Frontend"
                        required
                        className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-black"
                    />
                </div>


                {/* Skill Level */}
                <div>
                    <label className="text-sm font-medium text-gray-700">
                        Skill Level
                    </label>

                    <div className="mt-2 flex items-center gap-3">
                        <input
                            type="number"
                            min="0"
                            max="100"
                            value={level}
                            onChange={(e) => setLevel(e.target.value)}
                            placeholder="e.g. 85"
                            required
                            className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-black"
                        />

                        <span className="text-lg font-semibold text-gray-600">
                            %
                        </span>
                    </div>

                    <p className="mt-2 text-xs text-gray-500">
                        Enter a value between 0 and 100.
                    </p>
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
                            : "Create Skill"}
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

export default SkillForm;