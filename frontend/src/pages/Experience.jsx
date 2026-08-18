import { useEffect, useState } from "react";
import api, { getMyExperiences } from "../services/api";

import ExperienceHeader from "../components/experience/ExperienceHeader";
import ExperienceList from "../components/experience/ExperienceList";
import ExperienceForm from "../components/experience/ExperienceForm";

function Experience() {
    const [experiences, setExperiences] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [showForm, setShowForm] = useState(false);
    const [editingExperience, setEditingExperience] = useState(null);
    const [submitting, setSubmitting] = useState(false);


    useEffect(() => {
        async function loadExperiences() {
            try {
                const data = await getMyExperiences();

                setExperiences(data);

            } catch (error) {
                console.error("Experiences error:", error);

                setError("Failed to load experiences");

            } finally {
                setLoading(false);
            }
        }

        loadExperiences();
    }, []);


    function handleAddExperience() {
        setEditingExperience(null);
        setShowForm(true);
        setError("");
    }


    function handleEdit(experience) {
        setEditingExperience(experience);
        setShowForm(true);
        setError("");
    }


    function handleCancel() {
        setShowForm(false);
        setEditingExperience(null);
    }


    async function handleSubmit(data) {
        try {
            setSubmitting(true);
            setError("");

            if (editingExperience) {

                const response = await api.put(
                    `/experiences/${editingExperience.id}`,
                    data
                );

                setExperiences((current) =>
                    current.map((experience) =>
                        experience.id === editingExperience.id
                            ? response.data
                            : experience
                    )
                );

            } else {

                const response = await api.post(
                    "/experiences",
                    data
                );

                setExperiences((current) => [
                    response.data,
                    ...current
                ]);
            }

            handleCancel();

        } catch (error) {
            console.error("Save experience error:", error);

            setError(
                error.response?.data?.error ||
                "Failed to save experience"
            );

        } finally {
            setSubmitting(false);
        }
    }


    async function handleDelete(id) {
        const confirmed = window.confirm(
            "Are you sure you want to delete this experience?"
        );

        if (!confirmed) {
            return;
        }

        try {
            setError("");

            await api.delete(`/experiences/${id}`);

            setExperiences((current) =>
                current.filter(
                    (experience) => experience.id !== id
                )
            );

        } catch (error) {
            console.error("Delete experience error:", error);

            setError(
                error.response?.data?.error ||
                "Failed to delete experience"
            );
        }
    }


    return (
        <div className="min-h-screen bg-gray-50 px-6 py-12">

            <div className="mx-auto max-w-7xl">

                <ExperienceHeader
                    onAddExperience={handleAddExperience}
                />


                {showForm && (
                    <ExperienceForm
                        experience={editingExperience}
                        onCancel={handleCancel}
                        onSubmit={handleSubmit}
                        submitting={submitting}
                    />
                )}


                {error && (
                    <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-600">
                        {error}
                    </div>
                )}


                {loading ? (
                    <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center">
                        <p className="text-gray-500">
                            Loading experiences...
                        </p>
                    </div>
                ) : (
                    <ExperienceList
                        experiences={experiences}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                    />
                )}

            </div>

        </div>
    );
}

export default Experience;