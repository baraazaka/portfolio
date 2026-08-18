function formatDate(date) {
    if (!date) return "Present";

    return new Date(date).toLocaleDateString("en-US", {
        month: "short",
        year: "numeric"
    });
}

function ExperienceCard({
    experience,
    onEdit,
    onDelete
}) {
    return (
        <article className="group rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">

            <div className="flex flex-col gap-6 md:flex-row">

                {/* Timeline */}
                <div className="hidden w-1 shrink-0 rounded-full bg-blue-600 md:block" />

                <div className="min-w-0 flex-1">

                    {/* Header */}
                    <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">

                        <div>
                            <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
                                {experience.company}
                            </p>

                            <h2 className="mt-1 text-2xl font-bold text-gray-900">
                                {experience.postion}
                            </h2>
                        </div>

                        {/* Current Badge */}
                        {!experience.end_date && (
                            <span className="w-fit rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-700">
                                Current
                            </span>
                        )}

                    </div>


                    {/* Dates */}
                    <div className="mt-4 flex flex-wrap items-center gap-2 text-sm text-gray-500">

                        <span>
                            {formatDate(experience.start_date)}
                        </span>

                        <span className="text-gray-300">
                            →
                        </span>

                        <span>
                            {formatDate(experience.end_date)}
                        </span>

                    </div>


                    {/* Description */}
                    {experience.description && (
                        <p className="mt-5 max-w-3xl text-sm leading-7 text-gray-600">
                            {experience.description}
                        </p>
                    )}


                    {/* Actions */}
                    <div className="mt-6 flex gap-3 border-t border-gray-100 pt-5">

                        <button
                            type="button"
                            onClick={() => onEdit(experience)}
                            className="rounded-xl border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
                        >
                            Edit
                        </button>

                        <button
                            type="button"
                            onClick={() => onDelete(experience.id)}
                            className="rounded-xl bg-red-50 px-4 py-2 text-sm font-medium text-red-600 transition hover:bg-red-100"
                        >
                            Delete
                        </button>

                    </div>

                </div>

            </div>

        </article>
    );
}

export default ExperienceCard;