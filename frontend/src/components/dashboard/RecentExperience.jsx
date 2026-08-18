function RecentExperience({ experiences = [], loading }) {

    function formatDate(date) {
        if (!date) {
            return null;
        }

        const formattedDate = new Date(date);

        if (Number.isNaN(formattedDate.getTime())) {
            return date;
        }

        return formattedDate.toLocaleDateString("en-US", {
            month: "short",
            year: "numeric"
        });
    }


    return (
        <div className="mt-8 overflow-hidden rounded-2xl border border-gray-200 bg-white">

            {/* Header */}
            <div className="border-b border-gray-100 px-6 py-5">

                <h2 className="text-lg font-semibold text-gray-900">
                    Recent Experience
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                    Your latest professional experience.
                </p>

            </div>


            {/* Content */}
            <div className="divide-y divide-gray-100">

                {loading ? (

                    <div className="px-6 py-10 text-center text-sm text-gray-500">
                        Loading experience...
                    </div>

                ) : experiences.length === 0 ? (

                    <div className="px-6 py-10 text-center">

                        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 text-xl">
                            💼
                        </div>

                        <h3 className="mt-4 text-sm font-semibold text-gray-900">
                            No experience yet
                        </h3>

                        <p className="mt-1 text-sm text-gray-500">
                            Add your work experience to display it here.
                        </p>

                    </div>

                ) : (

                    experiences.map((experience) => (

                        <div
                            key={experience.id}
                            className="px-6 py-6 transition hover:bg-gray-50"
                        >

                            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">

                                {/* Position + Company */}
                                <div className="min-w-0">

                                    <h3 className="text-base font-semibold text-gray-900">
                                        {experience.postion ||
                                            experience.position ||
                                            "Position"}
                                    </h3>

                                    <p className="mt-1 text-sm font-medium text-gray-600">
                                        {experience.company ||
                                            "Company"}
                                    </p>

                                </div>


                                {/* Date */}
                                <div className="shrink-0">

                                    <span className="inline-flex rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600">

                                        {formatDate(
                                            experience.start_date
                                        ) || "Unknown"}

                                        <span className="mx-1">
                                            —
                                        </span>

                                        {experience.end_date
                                            ? formatDate(
                                                experience.end_date
                                            )
                                            : "Present"}

                                    </span>

                                </div>

                            </div>


                            {/* Description */}
                            {experience.description && (
                                <p className="mt-4 max-w-3xl text-sm leading-7 text-gray-500">
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