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
    const [creating, setCreating] = useState(false);

    const [editingProject, setEditingProject] = useState(null);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        async function loadProjects() {
            try {
                const data = await getMyProjects();

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
        setShowForm(true);
        setEditingProject(null);
        setError("");
    }

    function handleCancel() {
        setShowForm(false);
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

    function handleEditProject(project) {
        setEditingProject(project);
        setShowForm(false);
        setError("");
    }

    async function handleUpdateProject(projectData) {
        try {
            setSaving(true);
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
            setSaving(false);
        }
    }

    async function handleDeleteProject(id) {
        try {
            setError("");

            await api.delete(`/projects/${id}`);

            setProjects((currentProjects) =>
                currentProjects.filter(
                    (project) => project.id !== id
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

    return (
        <div className="min-h-screen bg-gray-50 px-6 py-12">
            <div className="mx-auto max-w-7xl">

                <ProjectHeader
                    onAddProject={handleAddProject}
                />

                {showForm && (
                    <ProjectForm
                        onCancel={handleCancel}
                        onSubmit={handleCreateProject}
                        submitting={creating}
                    />
                )}

                {editingProject && (
                    <ProjectForm
                        project={editingProject}
                        onCancel={() =>
                            setEditingProject(null)
                        }
                        onSubmit={handleUpdateProject}
                        submitting={saving}
                    />
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

                {creating && (
                    <div className="mb-6 rounded-xl border border-gray-200 bg-white p-4 text-sm text-gray-500">
                        Creating project...
                    </div>
                )}

                {!loading && (
                    <ProjectList
                        projects={projects}
                        onDelete={handleDeleteProject}
                        onEdit={handleEditProject}
                    />
                )}

            </div>
        </div>
    );
}

export default Projects;