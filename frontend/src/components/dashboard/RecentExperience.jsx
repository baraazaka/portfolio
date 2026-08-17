function RecentExperience({ experiences = [], loading }) {
    return (
        <div className="mt-6 rounded-xl border border-gray-200 bg-white">
            <div className="border-b border-gray-100 px-5 py-4">
                <h2 className="font-semibold text-gray-900">
                    Recent Experience
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                    Your latest work experience.
                </p>
            </div>

            <div className="divide-y divide-gray-100">
                {loading ? (
                    <div className="px-5 py-8 text-center text-sm text-gray-500">
                        Loading experience...
                    </div>
                ) : experiences.length === 0 ? (
                    <div className="px-5 py-8 text-center">
                        <p className="text-sm font-medium text-gray-900">
                            No experience yet
                        </p>

                        <p className="mt-1 text-sm text-gray-500">
                            Your experience will appear here.
                        </p>
                    </div>
                ) : (
                    experiences.map((experience) => (
                        <div
                            key={experience.id}
                            className="px-5 py-5"
                        >
                            <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                                <div>
                                    <h3 className="font-medium text-gray-900">
                                        {experience.position || "Position"}
                                    </h3>

                                    <p className="mt-1 text-sm font-medium text-gray-600">
                                        {experience.company}
                                    </p>
                                </div>

                                <p className="text-sm text-gray-400">
                                    {experience.start_date || "—"}{" "}
                                    -{" "}
                                    {experience.end_date || "Present"}
                                </p>
                            </div>

                            {experience.description && (
                                <p className="mt-3 text-sm leading-6 text-gray-500">
                                    {experience.description}
                                </p>
                            )}
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default RecentExperience;