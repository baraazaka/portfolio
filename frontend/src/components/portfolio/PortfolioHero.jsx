function PortfolioHero({ user }) {
    const displayName = user?.name || "Your Name";
    const username = user?.username || "username";

    const rawProfileImage =
        user?.profile_image_url ||
        user?.profile_image ||
        "";

    const profileImage = rawProfileImage
        ? rawProfileImage.startsWith("http")
            ? rawProfileImage
            : `http://localhost:5000${rawProfileImage}`
        : "";

    const location = user?.location;
    const jobTitle = user?.job_title;

    return (
        <section className="border-b border-gray-200 bg-white">

            <div className="mx-auto max-w-3xl px-6 py-10 sm:px-10 sm:py-12">

                <div className="grid items-center gap-8 sm:grid-cols-[1fr_160px]">

                    {/* Content */}
                    <div>

                        <p className="text-xs font-medium uppercase tracking-[0.2em] text-gray-400">
                            Personal Portfolio
                        </p>

                        <h1 className="mt-3 text-3xl font-semibold leading-tight tracking-tight text-gray-950 sm:text-4xl">
                            Hi, I'm{" "}
                            <span className="text-gray-500">
                                {displayName}
                            </span>
                            .
                        </h1>

                        {/* Job Title */}
                        {jobTitle && (
                            <p className="mt-3 text-base font-medium text-gray-700">
                                {jobTitle}
                            </p>
                        )}

                        {/* Location */}
                        {location && (
                            <div className="mt-3 flex items-center gap-2 text-sm text-gray-500">
                                <span>📍</span>
                                <span>{location}</span>
                            </div>
                        )}

                        <p className="mt-4 max-w-xl text-sm leading-6 text-gray-500 sm:text-base">
                            Welcome to my portfolio. Explore my projects,
                            skills, experience, and the work I'm passionate
                            about.
                        </p>

                        {/* Buttons */}
                        <div className="mt-6 flex flex-wrap gap-3">

                            <a
                                href="#projects"
                                className="rounded-lg bg-gray-950 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800"
                            >
                                View Projects
                            </a>

                            <a
                                href="#contact"
                                className="rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-700 transition hover:border-gray-300 hover:bg-gray-50"
                            >
                                Contact
                            </a>

                        </div>

                        {/* Social Links */}
                        {(user?.website_url ||
                            user?.github_url ||
                            user?.linkedin_url) && (

                            <div className="mt-6 flex flex-wrap items-center gap-4">

                                {user.website_url && (
                                    <a
                                        href={user.website_url}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="text-sm font-medium text-gray-500 transition hover:text-gray-950"
                                    >
                                        Website
                                    </a>
                                )}

                                {user.github_url && (
                                    <a
                                        href={user.github_url}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="text-sm font-medium text-gray-500 transition hover:text-gray-950"
                                    >
                                        GitHub
                                    </a>
                                )}

                                {user.linkedin_url && (
                                    <a
                                        href={user.linkedin_url}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="text-sm font-medium text-gray-500 transition hover:text-gray-950"
                                    >
                                        LinkedIn
                                    </a>
                                )}

                            </div>
                        )}

                    </div>

                    {/* Profile Image */}
                    <div className="flex justify-start sm:justify-end">

                        <div className="relative">

                            <div className="h-36 w-36 overflow-hidden rounded-2xl bg-gray-100 sm:h-40 sm:w-40">

                                {profileImage ? (
                                    <img
                                        src={profileImage}
                                        alt={displayName}
                                        className="h-full w-full object-cover"
                                        onError={() => {
                                            console.error(
                                                "PROFILE IMAGE FAILED:",
                                                profileImage
                                            );
                                        }}
                                    />
                                ) : (
                                    <div className="flex h-full w-full items-center justify-center bg-gray-100">
                                        <span className="text-5xl font-semibold text-gray-300">
                                            {displayName
                                                .charAt(0)
                                                .toUpperCase()}
                                        </span>
                                    </div>
                                )}

                            </div>

                            {/* Username */}
                            <div className="absolute -bottom-3 -right-3 rounded-lg border border-gray-200 bg-white px-3 py-2 shadow-sm">

                                <p className="text-xs text-gray-400">
                                    @{username}
                                </p>

                            </div>

                        </div>

                    </div>

                </div>

                {/* Portfolio Navigation */}
                <nav className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-gray-100 pt-5">

                    <a
                        href="#about"
                        className="text-sm text-gray-500 transition hover:text-gray-950"
                    >
                        About
                    </a>

                    <a
                        href="#skills"
                        className="text-sm text-gray-500 transition hover:text-gray-950"
                    >
                        Skills
                    </a>

                    <a
                        href="#projects"
                        className="text-sm text-gray-500 transition hover:text-gray-950"
                    >
                        Projects
                    </a>

                    <a
                        href="#experience"
                        className="text-sm text-gray-500 transition hover:text-gray-950"
                    >
                        Experience
                    </a>

                    <a
                        href="#contact"
                        className="text-sm text-gray-500 transition hover:text-gray-950"
                    >
                        Contact
                    </a>

                </nav>

            </div>

        </section>
    );
}

export default PortfolioHero;