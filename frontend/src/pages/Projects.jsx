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


    // Load user's projects
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


    // Add project
    function handleAddProject() {
        setEditingProject(null);
        setShowForm(true);
    }


    // Edit project
    function handleEdit(project) {
        setEditingProject(project);
        setShowForm(true);
    }


    // Cancel form
    function handleCancel() {
        setShowForm(false);
        setEditingProject(null);
    }


    // Create project
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
            console.error(
                "Create project error:",
                error
            );

            setError(
                error.response?.data?.error ||
                "Failed to create project"
            );

        } finally {
            setCreating(false);
        }
    }


    // Update project
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
            console.error(
                "Update project error:",
                error
            );

            setError(
                error.response?.data?.error ||
                "Failed to update project"
            );

        } finally {
            setCreating(false);
        }
    }


    // Create or update
    async function handleSubmitProject(projectData) {
        if (editingProject) {
            await handleUpdateProject(projectData);
        } else {
            await handleCreateProject(projectData);
        }
    }


    // Delete project
    async function handleDelete(projectId) {
        const confirmed = window.confirm(
            "Are you sure you want to delete this project?"
        );

        if (!confirmed) {
            return;
        }

        try {
            setError("");

            await api.delete(
                `/projects/${projectId}`
            );

            setProjects((currentProjects) =>
                currentProjects.filter(
                    (project) =>
                        project.id !== projectId
                )
            );

        } catch (error) {
            console.error(
                "Delete project error:",
                error
            );

            setError(
                error.response?.data?.error ||
                "Failed to delete project"
            );
        }
    }


    // Publish / Unpublish project
    async function handlePublish(projectId) {
        try {
            setError("");

            const response = await api.patch(
                `/projects/${projectId}/publish`
            );

            setProjects((currentProjects) =>
                currentProjects.map((project) =>
                    project.id === projectId
                        ? response.data
                        : project
                )
            );

        } catch (error) {
            console.error(
                "Publish project error:",
                error
            );

            setError(
                error.response?.data?.error ||
                "Failed to update project publishing status"
            );
        }
    }


    return (
        <div className="min-h-screen bg-gray-50 px-6 py-12">

            <div className="mx-auto max-w-7xl">

                {/* Header */}
                <ProjectHeader
                    onAddProject={handleAddProject}
                />


                {/* Form */}
                {showForm && (
                    <ProjectForm
                        project={editingProject}
                        onCancel={handleCancel}
                        onSubmit={handleSubmitProject}
                        submitting={creating}
                    />
                )}


                {/* Saving */}
                {creating && (
                    <div className="mb-6 rounded-xl border border-gray-200 bg-white p-4 text-sm text-gray-500">
                        Saving project...
                    </div>
                )}


                {/* Error */}
                {error && (
                    <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-600">
                        {error}
                    </div>
                )}


                {/* Loading */}
                {loading && (
                    <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center">
                        <p className="text-gray-500">
                            Loading projects...
                        </p>
                    </div>
                )}


                {/* Project list */}
                {!loading && (
                    <ProjectList
                        projects={projects}
                        onDelete={handleDelete}
                        onEdit={handleEdit}
                        onPublish={handlePublish}
                    />
                )}

            </div>

        </div>
    );
}

export default Projects;