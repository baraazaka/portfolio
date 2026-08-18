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
                console.error("Public projects error:", error);

                setError("Failed to load projects");

            } finally {
                setLoading(false);
            }
        }

        loadProjects();
    }, []);

    return (
        <main className="min-h-screen bg-gray-50">

            <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">

                <div className="mb-12">
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


                {loading && (
                    <div className="rounded-2xl border border-gray-200 bg-white p-10 text-center">
                        <p className="text-gray-500">
                            Loading projects...
                        </p>
                    </div>
                )}


                {!loading && error && (
                    <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-red-600">
                        {error}
                    </div>
                )}


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


                {!loading && !error && projects.length > 0 && (
                    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">

                        {projects.map((project) => (
                            <article
                                key={project.id}
                                className="group overflow-hidden rounded-2xl border border-gray-200 bg-white transition duration-300 hover:-translate-y-1 hover:shadow-xl"
                            >

                                <div className="aspect-video overflow-hidden bg-gray-100">

                                    {project.image_url ? (
                                        <img
                                            src={project.image_url}
                                            alt={project.title}
                                            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                                        />
                                    ) : (
                                        <div className="flex h-full items-center justify-center text-sm text-gray-400">
                                            No image
                                        </div>
                                    )}

                                </div>


                                <div className="p-6">

                                    <h2 className="text-xl font-semibold text-gray-900">
                                        {project.title}
                                    </h2>

                                    <p className="mt-3 line-clamp-3 text-sm leading-6 text-gray-600">
                                        {project.description ||
                                            "No description available."}
                                    </p>


                                    <Link
                                        to={`/projects/${project.id}`}
                                        className="mt-6 inline-block rounded-xl bg-black px-5 py-3 text-sm font-medium text-white transition hover:bg-gray-800"
                                    >
                                        View Project
                                    </Link>

                                </div>

                            </article>
                        ))}

                    </div>
                )}

            </div>

        </main>
    );
}

export default PublicProjects;