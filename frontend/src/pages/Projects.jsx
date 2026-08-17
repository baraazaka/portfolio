import { useEffect, useState } from "react";
import { getProjects } from "../services/api";

import ProjectHeader from "../components/projects/ProjectHeader";
import ProjectList from "../components/projects/ProjectList";

function Projects() {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        async function loadProjects() {
            try {
                const data = await getProjects();
                setProjects(data);
            } catch (error) {
                console.error("Projects error:", error);
                setError("Failed to load projects");
            } finally {
                setLoading(false);
            }
        }

        loadProjects();
    }, []);

    function handleAddProject() {
        console.log("Add project");
    }

    return (
        <div className="min-h-screen bg-gray-50 px-6 py-12">
            <div className="mx-auto max-w-7xl">

                <ProjectHeader
                    onAddProject={handleAddProject}
                />

                {loading && (
                    <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center">
                        <p className="text-gray-500">
                            Loading projects...
                        </p>
                    </div>
                )}

                {!loading && error && (
                    <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-600">
                        {error}
                    </div>
                )}

                {!loading && !error && (
                    <ProjectList projects={projects} />
                )}

            </div>
        </div>
    );
}

export default Projects;