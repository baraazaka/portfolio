import { useEffect, useState } from "react";
import api from "../../services/api";
import FeaturedProjectCard from "./FeaturedProjectCard";

function FeaturedProjects() {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");


    useEffect(() => {
        async function loadFeaturedProjects() {
            try {
                setLoading(true);
                setError("");

                const response = await api.get(
                    "/projects/featured"
                );

                setProjects(response.data);

            } catch (error) {
                console.error(
                    "Featured projects error:",
                    error
                );

                setError(
                    "Failed to load featured projects"
                );

            } finally {
                setLoading(false);
            }
        }

        loadFeaturedProjects();
    }, []);


    return (
        <section className="bg-gray-50 py-24">

            <div className="mx-auto max-w-7xl px-6 lg:px-8">

                {/* Header */}
                <div className="mb-12 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">

                    <div>

                        <p className="text-sm font-semibold uppercase tracking-widest text-blue-600">
                            Featured Work
                        </p>

                        <h2 className="mt-3 text-4xl font-bold text-gray-900">
                            Latest Projects
                        </h2>

                        <p className="mt-4 max-w-2xl text-gray-500">
                            Discover the latest projects published by our creators.
                        </p>

                    </div>


                    <a
                        href="/projects"
                        className="text-sm font-semibold text-gray-900 transition hover:text-blue-600"
                    >
                        View all projects →
                    </a>

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
                    <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-sm text-red-600">
                        {error}
                    </div>
                )}


                {/* Empty */}
                {!loading &&
                    !error &&
                    projects.length === 0 && (
                        <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-12 text-center">
                            <h3 className="text-lg font-semibold text-gray-900">
                                No projects yet
                            </h3>

                            <p className="mt-2 text-sm text-gray-500">
                                Published projects will appear here.
                            </p>
                        </div>
                    )}


                {/* Projects */}
                {!loading &&
                    !error &&
                    projects.length > 0 && (
                        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">

                            {projects.map((project) => (
                                <FeaturedProjectCard
                                    key={project.id}
                                    project={project}
                                />
                            ))}

                        </div>
                    )}

            </div>

        </section>
    );
}

export default FeaturedProjects;