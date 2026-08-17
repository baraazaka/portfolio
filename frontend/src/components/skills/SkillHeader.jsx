function SkillHeader({ onAddSkill }) {
    return (
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

            <div>
                <p className="text-sm font-semibold uppercase tracking-widest text-blue-600">
                    My Skills
                </p>

                <h1 className="mt-2 text-3xl font-bold text-gray-900">
                    Skills
                </h1>

                <p className="mt-2 text-sm text-gray-500">
                    Manage your skills and expertise.
                </p>
            </div>

            <button
                type="button"
                onClick={onAddSkill}
                className="rounded-xl bg-black px-5 py-3 text-sm font-medium text-white transition hover:bg-gray-800"
            >
                + Add Skill
            </button>

        </div>
    );
}

export default SkillHeader;