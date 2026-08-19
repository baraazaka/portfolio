function PortfolioSkills({ skills = [] }) {
    return (
        <section
            id="skills"
            className="border-b border-gray-200 bg-[#FAFAFA]"
        >
            <div className="mx-auto max-w-3xl px-6 py-12 sm:px-10 sm:py-14">

                <div className="mb-8">
                    <p className="text-xs font-medium uppercase tracking-[0.2em] text-gray-400">
                        Skills
                    </p>

                    <h2 className="mt-2 text-2xl font-semibold tracking-tight text-gray-950">
                        What I work with
                    </h2>
                </div>

                {skills.length === 0 ? (
                    <p className="border-t border-gray-200 py-6 text-sm text-gray-400">
                        No skills added yet.
                    </p>
                ) : (
                    <div className="border-t border-gray-200">

                        {skills.map((skill, index) => (
                            <div
                                key={skill.id}
                                className="grid grid-cols-[45px_1fr_auto] items-center gap-4 border-b border-gray-200 py-5"
                            >

                                <span className="text-xs text-gray-300">
                                    {String(index + 1).padStart(2, "0")}
                                </span>

                                <span className="text-base font-medium text-gray-900">
                                    {skill.name}
                                </span>

                                {skill.level && (
                                    <span className="text-xs text-gray-400">
                                        {skill.level}
                                    </span>
                                )}

                            </div>
                        ))}

                    </div>
                )}

            </div>
        </section>
    );
}

export default PortfolioSkills;