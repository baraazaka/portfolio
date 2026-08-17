import { useEffect, useState } from "react";
import { getMyProjects } from "../services/api";
import api from "../services/api";

import ProjectHeader from "../components/projects/ProjectHeader";
import ProjectList from "../components/projects/ProjectList";
import ProjectForm from "../components/projects/ProjectForm";

function Projects() {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [showForm, setShowForm] = useState(false);
    const [editingProject, setEditingProject] = useState(null);
    const [creating, setCreating] = useState(false);

    useEffect(() => {
        async function loadProjects() {
            try {
                const data = await getMyProjects();

                console.log("MY PROJECTS:", data);

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
        setEditingProject(null);
        setShowForm(true);
    }


    function handleEdit(project) {
        setEditingProject(project);
        setShowForm(true);
    }


    function handleCancel() {
        setShowForm(false);
        setEditingProject(null);
    }


    async function handleCreateProject(projectData) {
        try {
            setCreating(true);
            setError("");

            const response = await api.post(
                "/projects",
                projectData
            );

            setProjects((currentProjects) => [
                response.data,
                ...currentProjects
            ]);

            setShowForm(false);
            setEditingProject(null);

        } catch (error) {
            console.error("Create project error:", error);

            if (error.response) {
                setError(
                    error.response.data.error ||
                    "Failed to create project"
                );
            } else {
                setError("Failed to create project");
            }

        } finally {
            setCreating(false);
        }
    }


    async function handleUpdateProject(projectData) {
        try {
            setCreating(true);
            setError("");

            const response = await api.put(
                `/projects/${editingProject.id}`,
                projectData
            );

            setProjects((currentProjects) =>
                currentProjects.map((project) =>
                    project.id === editingProject.id
                        ? response.data
                        : project
                )
            );

            setShowForm(false);
            setEditingProject(null);

        } catch (error) {
            console.error("Update project error:", error);

            if (error.response) {
                setError(
                    error.response.data.error ||
                    "Failed to update project"
                );
            } else {
                setError("Failed to update project");
            }

        } finally {
            setCreating(false);
        }
    }


    async function handleSubmitProject(projectData) {
        if (editingProject) {
            await handleUpdateProject(projectData);
        } else {
            await handleCreateProject(projectData);
        }
    }


    async function handleDelete(projectId) {
        const confirmed = window.confirm(
            "Are you sure you want to delete this project?"
        );

        if (!confirmed) {
            return;
        }

        try {
            await api.delete(`/projects/${projectId}`);

            setProjects((currentProjects) =>
                currentProjects.filter(
                    (project) => project.id !== projectId
                )
            );

        } catch (error) {
            console.error("Delete project error:", error);

            if (error.response) {
                setError(
                    error.response.data.error ||
                    "Failed to delete project"
                );
            } else {
                setError("Failed to delete project");
            }
        }
    }


    return (
        <div className="min-h-screen bg-gray-50 px-6 py-12">
            <div className="mx-auto max-w-7xl">

                <ProjectHeader
                    onAddProject={handleAddProject}
                />


                {showForm && (
                    <ProjectForm
                        project={editingProject}
                        onCancel={handleCancel}
                        onSubmit={handleSubmitProject}
                        submitting={creating}
                    />
                )}


                {creating && (
                    <div className="mb-6 rounded-xl border border-gray-200 bg-white p-4 text-sm text-gray-500">
                        Saving project...
                    </div>
                )}


                {loading && (
                    <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center">
                        <p className="text-gray-500">
                            Loading projects...
                        </p>
                    </div>
                )}


                {!loading && error && (
                    <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-600">
                        {error}
                    </div>
                )}


                {!loading && !error && (
                    <ProjectList
                        projects={projects}
                        onDelete={handleDelete}
                        onEdit={handleEdit}
                    />
                )}

            </div>
        </div>
    );
}

export default Projects;