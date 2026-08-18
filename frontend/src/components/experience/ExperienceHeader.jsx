function ExperienceHeader({ onAddExperience }) {
    return (
        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">

            <div>
                <p className="text-sm font-semibold uppercase tracking-widest text-blue-600">
                    Career
                </p>

                <h1 className="mt-2 text-3xl font-bold text-gray-900">
                    Experience
                </h1>

                <p className="mt-2 text-sm text-gray-500">
                    Manage your professional experience.
                </p>
            </div>

            <button
                type="button"
                onClick={onAddExperience}
                className="rounded-xl bg-black px-5 py-3 text-sm font-medium text-white transition hover:bg-gray-800"
            >
                + Add Experience
            </button>

        </div>
    );
}

export default ExperienceHeader;