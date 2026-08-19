function PortfolioAbout({ user }) {
    return (
        <section
            id="about"
            className="border-b border-gray-200 bg-white"
        >
            <div className="mx-auto max-w-3xl px-6 py-12 sm:px-10 sm:py-14">

                <div className="grid gap-8 sm:grid-cols-[140px_1fr]">

                    <div>
                        <p className="text-xs font-medium uppercase tracking-[0.2em] text-gray-400">
                            About
                        </p>
                    </div>

                    <div>
                        <h2 className="text-2xl font-semibold tracking-tight text-gray-950 sm:text-3xl">
                            About me
                        </h2>

                        {user?.bio ? (
                            <p className="mt-4 whitespace-pre-line text-base leading-7 text-gray-500">
                                {user.bio}
                            </p>
                        ) : (
                            <p className="mt-4 text-sm text-gray-400">
                                No bio added yet.
                            </p>
                        )}
                    </div>

                </div>

            </div>
        </section>
    );
}

export default PortfolioAbout;