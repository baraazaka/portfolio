import { useEffect, useState } from "react";
import api from "../services/api";
import ProjectCard from "./ProjectCard";

function Projects() {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        async function getProjects() {
            try {
                const response = await api.get("/projects");

                setProjects(response.data);
            } catch (error) {
                console.log(error);
            }
        }

        getProjects();
    }, []);

    return (
        <section className="bg-gray-50">
            <div className="container mx-auto max-w-7xl px-6 py-24 lg:px-8">

                <div className="mb-12">
                    <p className="text-sm font-semibold uppercase tracking-widest text-blue-600">
                        My Work
                    </p>

                    <h2 className="mt-3 text-4xl font-bold text-gray-900">
                        Featured Projects
                    </h2>
                </div>

                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {projects.map((project) => (
                        <ProjectCard
                            key={project.id}
                            project={project}
                        />
                    ))}
                </div>

            </div>
        </section>
    );
}

export default Projects;