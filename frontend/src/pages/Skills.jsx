import { useEffect, useState } from "react";

import api from "../services/api";
import SkillHeader from "../components/skills/SkillHeader";
import SkillList from "../components/skills/SkillList";
import SkillForm from "../components/skills/SkillForm";

function Skills() {
    const [skills, setSkills] = useState([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [showForm, setShowForm] = useState(false);
    const [editingSkill, setEditingSkill] = useState(null);

    const [saving, setSaving] = useState(false);

    // Load user's skills
    useEffect(() => {
        async function loadSkills() {
            try {
                const response = await api.get("/skills/my");

                setSkills(response.data);

            } catch (error) {
                console.error("Skills error:", error);

                setError("Failed to load skills");

            } finally {
                setLoading(false);
            }
        }

        loadSkills();
    }, []);


    // Add
    function handleAddSkill() {
        setEditingSkill(null);
        setShowForm(true);
        setError("");
    }


    // Edit
    function handleEditSkill(skill) {
        setEditingSkill(skill);
        setShowForm(true);
        setError("");
    }


    // Cancel
    function handleCancel() {
        setShowForm(false);
        setEditingSkill(null);
    }


    // Create / Update
    async function handleSubmitSkill(skillData) {
        try {
            setSaving(true);
            setError("");

            let response;

            if (editingSkill) {

                // Update
                response = await api.put(
                    `/skills/${editingSkill.id}`,
                    skillData
                );

                setSkills((currentSkills) =>
                    currentSkills.map((skill) =>
                        skill.id === editingSkill.id
                            ? response.data
                            : skill
                    )
                );

            } else {

                // Create
                response = await api.post(
                    "/skills",
                    skillData
                );

                setSkills((currentSkills) => [
                    response.data,
                    ...currentSkills
                ]);
            }

            handleCancel();

        } catch (error) {
            console.error(
                "Save skill error:",
                error
            );

            setError(
                error.response?.data?.error ||
                "Failed to save skill"
            );

        } finally {
            setSaving(false);
        }
    }


    // Delete
    async function handleDeleteSkill(id) {
        try {
            setError("");

            await api.delete(`/skills/${id}`);

            setSkills((currentSkills) =>
                currentSkills.filter(
                    (skill) => skill.id !== id
                )
            );

        } catch (error) {
            console.error(
                "Delete skill error:",
                error
            );

            setError(
                error.response?.data?.error ||
                "Failed to delete skill"
            );
        }
    }


    return (
        <div className="min-h-screen bg-gray-50">

            <div className="mx-auto max-w-7xl">

                {/* Header */}
                <SkillHeader
                    onAddSkill={handleAddSkill}
                />


                {/* Form */}
                {showForm && (
                    <SkillForm
                        skill={editingSkill}
                        onCancel={handleCancel}
                        onSubmit={handleSubmitSkill}
                        submitting={saving}
                    />
                )}


                {/* Error */}
                {error && (
                    <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-600">
                        {error}
                    </div>
                )}


                {/* Loading */}
                {loading ? (
                    <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center">
                        <p className="text-gray-500">
                            Loading skills...
                        </p>
                    </div>
                ) : (
                    <SkillList
                        skills={skills}
                        onEdit={handleEditSkill}
                        onDelete={handleDeleteSkill}
                    />
                )}

            </div>

        </div>
    );
}

export default Skills;