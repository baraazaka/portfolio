function PortfolioExperience({ experiences = [] }) {
    return (
        <section
            id="experience"
            className="border-b border-gray-200 bg-[#FAFAFA]"
        >
            <div className="mx-auto max-w-3xl px-6 py-12 sm:px-10 sm:py-14">

                <div className="mb-8">
                    <p className="text-xs font-medium uppercase tracking-[0.2em] text-gray-400">
                        Experience
                    </p>

                    <h2 className="mt-2 text-2xl font-semibold tracking-tight text-gray-950">
                        Where I've worked
                    </h2>
                </div>

                {experiences.length === 0 ? (
                    <p className="border-t border-gray-200 py-6 text-sm text-gray-400">
                        No experience added yet.
                    </p>
                ) : (
                    <div className="border-t border-gray-200">

                        {experiences.map((experience, index) => (
                            <article
                                key={experience.id}
                                className="grid gap-5 border-b border-gray-200 py-7 sm:grid-cols-[110px_1fr]"
                            >

                                {/* Date */}
                                <div>
                                    <p className="text-xs leading-5 text-gray-400">
                                        {experience.start_date
                                            ? new Date(
                                                  experience.start_date
                                              ).toLocaleDateString(
                                                  "en-US",
                                                  {
                                                      month: "short",
                                                      year: "numeric"
                                                  }
                                              )
                                            : "—"}
                                    </p>

                                    <p className="text-xs text-gray-300">
                                        {experience.end_date
                                            ? new Date(
                                                  experience.end_date
                                              ).toLocaleDateString(
                                                  "en-US",
                                                  {
                                                      month: "short",
                                                      year: "numeric"
                                                  }
                                              )
                                            : "Present"}
                                    </p>
                                </div>


                                {/* Content */}
                                <div>

                                    <div className="flex flex-wrap items-baseline justify-between gap-2">

                                        <h3 className="text-lg font-semibold tracking-tight text-gray-950">
                                            {experience.position}
                                        </h3>

                                        <span className="text-xs text-gray-300">
                                            {String(index + 1).padStart(2, "0")}
                                        </span>

                                    </div>

                                    {experience.company && (
                                        <p className="mt-1 text-sm font-medium text-gray-500">
                                            {experience.company}
                                        </p>
                                    )}

                                    {experience.description && (
                                        <p className="mt-3 max-w-xl text-sm leading-6 text-gray-500">
                                            {experience.description}
                                        </p>
                                    )}

                                </div>

                            </article>
                        ))}

                    </div>
                )}

            </div>
        </section>
    );
}

export default PortfolioExperience;