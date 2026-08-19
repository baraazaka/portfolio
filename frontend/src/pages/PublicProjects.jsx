import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

function PublicProjects() {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        async function loadProjects() {
            try {
                const response = await api.get("/projects");

                setProjects(response.data);

            } catch (error) {
                console.error(
                    "Public projects error:",
                    error
                );

                setError("Failed to load projects");

            } finally {
                setLoading(false);
            }
        }

        loadProjects();
    }, []);

    function getImageUrl(imageUrl) {
        if (!imageUrl) {
            return "";
        }

        if (
            imageUrl.startsWith("http://") ||
            imageUrl.startsWith("https://")
        ) {
            return imageUrl;
        }

        return `http://localhost:5000${imageUrl}`;
    }

    return (
        <main className="min-h-screen bg-gray-50">

            <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">

                {/* Header */}
                <div className="mb-10">

                    <p className="text-sm font-semibold uppercase tracking-widest text-blue-600">
                        Discover
                    </p>

                    <h1 className="mt-3 text-4xl font-bold text-gray-900">
                        All Projects
                    </h1>

                    <p className="mt-4 max-w-2xl text-gray-500">
                        Explore projects published by our creators.
                    </p>

                </div>


                {/* Loading */}
                {loading && (
                    <div className="rounded-2xl border border-gray-200 bg-white p-10 text-center">
                        <p className="text-gray-500">
                            Loading projects...
                        </p>
                    </div>
                )}


                {/* Error */}
                {!loading && error && (
                    <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-red-600">
                        {error}
                    </div>
                )}


                {/* Empty */}
                {!loading && !error && projects.length === 0 && (
                    <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-12 text-center">

                        <h2 className="text-lg font-semibold text-gray-900">
                            No projects published yet
                        </h2>

                        <p className="mt-2 text-sm text-gray-500">
                            Published projects will appear here.
                        </p>

                    </div>
                )}


                {/* Projects */}
                {!loading && !error && projects.length > 0 && (
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

                        {projects.map((project) => {

                            const projectImageUrl = getImageUrl(
                                project.image_url
                            );

                            const profileImageUrl = getImageUrl(
                                project.profile_image_url
                            );

                            const ownerInitial =
                                project.user_name
                                    ?.charAt(0)
                                    ?.toUpperCase() || "U";

                            return (
                                <article
                                    key={project.id}
                                    className="group overflow-hidden rounded-2xl border border-gray-200 bg-white transition duration-300 hover:-translate-y-1 hover:shadow-lg"
                                >

                                    {/* Project Image */}
                                    <div className="aspect-video overflow-hidden bg-gray-100">

                                        {projectImageUrl ? (
                                            <img
                                                src={projectImageUrl}
                                                alt={project.title}
                                                className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                                                onError={(e) => {
                                                    console.error(
                                                        "PUBLIC PROJECT IMAGE FAILED:",
                                                        projectImageUrl
                                                    );

                                                    e.currentTarget.style.display =
                                                        "none";
                                                }}
                                            />
                                        ) : (
                                            <div className="flex h-full items-center justify-center text-sm text-gray-400">
                                                No image
                                            </div>
                                        )}

                                    </div>


                                    <div className="p-5">

                                        {/* User */}
                                        <div className="mb-4 flex items-center gap-3">

                                            {profileImageUrl ? (
                                                <img
                                                    src={profileImageUrl}
                                                    alt={
                                                        project.user_name ||
                                                        "User"
                                                    }
                                                    className="h-9 w-9 rounded-full border border-gray-200 object-cover"
                                                    onError={(e) => {
                                                        e.currentTarget.style.display =
                                                            "none";
                                                    }}
                                                />
                                            ) : (
                                                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gray-950 text-xs font-semibold text-white">
                                                    {ownerInitial}
                                                </div>
                                            )}

                                            <div className="min-w-0">

                                                <p className="truncate text-sm font-semibold text-gray-900">
                                                    {project.user_name ||
                                                        "Unknown user"}
                                                </p>

                                                <p className="text-xs text-gray-500">
                                                    Project Owner
                                                </p>

                                            </div>

                                        </div>


                                        {/* Title */}
                                        <h2 className="text-lg font-semibold text-gray-900">
                                            {project.title}
                                        </h2>


                                        {/* Description */}
                                        <p className="mt-2 line-clamp-3 text-sm leading-6 text-gray-600">
                                            {project.description ||
                                                "No description available."}
                                        </p>


                                        {/* Skills */}
                                        {project.skills?.length > 0 && (
                                            <div className="mt-4 flex flex-wrap gap-2">

                                                {project.skills.map(
                                                    (skill) => (
                                                        <span
                                                            key={skill.id}
                                                            className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700"
                                                        >
                                                            {skill.name}
                                                        </span>
                                                    )
                                                )}

                                            </div>
                                        )}


                                        {/* View */}
                                        <Link
                                            to={`/projects/${project.id}`}
                                            className="mt-5 inline-flex rounded-xl bg-black px-4 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800"
                                        >
                                            View Project
                                        </Link>

                                    </div>

                                </article>
                            );
                        })}

                    </div>
                )}

            </div>

        </main>
    );
}

export default PublicProjects;