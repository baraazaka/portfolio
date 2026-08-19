import { useEffect, useState } from "react";
import api from "../../services/api";

function ProfileSettings() {
    const [form, setForm] = useState({
        name: "",
        bio: "",
        location: "",
        job_title: "",
        website_url: "",
        github_url: "",
        linkedin_url: ""
    });

    const [profileImage, setProfileImage] = useState(null);
    const [imagePreview, setImagePreview] = useState("");

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        async function loadProfile() {
            try {
                const response = await api.get("/users/me");

                setForm({
                    name: response.data.name || "",
                    bio: response.data.bio || "",
                    location: response.data.location || "",
                    job_title: response.data.job_title || "",
                    website_url: response.data.website_url || "",
                    github_url: response.data.github_url || "",
                    linkedin_url: response.data.linkedin_url || ""
                });

                if (response.data.profile_image_url) {
                    setImagePreview(
                        `http://localhost:5000${response.data.profile_image_url}`
                    );
                }

            } catch (error) {
                console.error("Profile error:", error);

                setError(
                    error.response?.data?.error ||
                    "Failed to load profile"
                );
            } finally {
                setLoading(false);
            }
        }

        loadProfile();
    }, []);

    function handleChange(e) {
        const { name, value } = e.target;

        setForm((prev) => ({
            ...prev,
            [name]: value
        }));
    }

    function handleImageChange(e) {
        const file = e.target.files?.[0];

        if (!file) return;

        if (!file.type.startsWith("image/")) {
            setError("Please select a valid image.");
            return;
        }

        if (file.size > 5 * 1024 * 1024) {
            setError("Image must be smaller than 5MB.");
            return;
        }

        setError("");
        setMessage("");

        setProfileImage(file);

        const previewUrl = URL.createObjectURL(file);
        setImagePreview(previewUrl);
    }

    async function handleSubmit(e) {
        e.preventDefault();

        setSaving(true);
        setMessage("");
        setError("");

        try {
            const formData = new FormData();

            formData.append("name", form.name);
            formData.append("bio", form.bio);
            formData.append("location", form.location);
            formData.append("job_title", form.job_title);
            formData.append("website_url", form.website_url);
            formData.append("github_url", form.github_url);
            formData.append("linkedin_url", form.linkedin_url);

            if (profileImage) {
                formData.append("profile_image", profileImage);
            }

            const response = await api.put(
                "/users/me",
                formData
            );

            console.log(
                "PROFILE UPDATED:",
                response.data
            );

            if (response.data.profile_image_url) {
                setImagePreview(
                    `http://localhost:5000${response.data.profile_image_url}`
                );
            }

            setProfileImage(null);

            setMessage(
                "Profile updated successfully."
            );

        } catch (error) {
            console.error(
                "Update profile error:",
                error
            );

            setError(
                error.response?.data?.error ||
                "Failed to update profile"
            );
        } finally {
            setSaving(false);
        }
    }

    if (loading) {
        return (
            <div className="rounded-2xl border border-gray-200 bg-white p-6">
                <p className="text-sm text-gray-400">
                    Loading profile...
                </p>
            </div>
        );
    }

    return (
        <div className="mx-auto max-w-3xl">

            {/* Header */}

            <div className="mb-8">

                <h1 className="text-2xl font-semibold tracking-tight text-gray-950">
                    Profile Settings
                </h1>

                <p className="mt-2 text-sm text-gray-500">
                    Manage the information displayed on your public portfolio.
                </p>

            </div>


            {/* Success Message */}

            {message && (
                <div className="mb-6 rounded-xl border border-green-200 bg-green-50 px-4 py-3">
                    <p className="text-sm font-medium text-green-700">
                        ✓ {message}
                    </p>
                </div>
            )}


            {/* Error Message */}

            {error && (
                <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3">
                    <p className="text-sm font-medium text-red-600">
                        {error}
                    </p>
                </div>
            )}


            <form
                onSubmit={handleSubmit}
                className="space-y-6"
            >

                {/* Basic Information */}

                <section className="rounded-2xl border border-gray-200 bg-white p-6">

                    <div className="mb-6">

                        <h2 className="text-base font-semibold text-gray-950">
                            Basic Information
                        </h2>

                        <p className="mt-1 text-sm text-gray-500">
                            This information appears at the top of your portfolio.
                        </p>

                    </div>


                    <div className="space-y-5">

                        {/* Name */}

                        <div>

                            <label className="text-sm font-medium text-gray-700">
                                Name
                            </label>

                            <input
                                type="text"
                                name="name"
                                value={form.name}
                                onChange={handleChange}
                                required
                                className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-gray-500"
                            />

                        </div>


                        {/* Job Title */}

                        <div>

                            <label className="text-sm font-medium text-gray-700">
                                Job Title
                            </label>

                            <input
                                type="text"
                                name="job_title"
                                value={form.job_title}
                                onChange={handleChange}
                                placeholder="Full Stack Developer"
                                className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-gray-500"
                            />

                        </div>


                        {/* Location */}

                        <div>

                            <label className="text-sm font-medium text-gray-700">
                                Location
                            </label>

                            <input
                                type="text"
                                name="location"
                                value={form.location}
                                onChange={handleChange}
                                placeholder="Jenin, Palestine"
                                className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-gray-500"
                            />

                        </div>


                        {/* Profile Image */}

                        <div>

                            <label className="text-sm font-medium text-gray-700">
                                Profile Image
                            </label>

                            <div className="mt-2 flex flex-wrap items-center gap-4">

                                {imagePreview && (
                                    <img
                                        src={imagePreview}
                                        alt="Profile preview"
                                        className="h-20 w-20 rounded-xl object-cover border border-gray-200"
                                    />
                                )}

                                <label className="cursor-pointer rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-50">

                                    Choose Image

                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                        className="hidden"
                                    />

                                </label>

                            </div>

                            <p className="mt-2 text-xs text-gray-400">
                                JPG, PNG or WEBP — maximum 5MB.
                            </p>

                        </div>

                    </div>

                </section>


                {/* About */}

                <section className="rounded-2xl border border-gray-200 bg-white p-6">

                    <div className="mb-6">

                        <h2 className="text-base font-semibold text-gray-950">
                            About Me
                        </h2>

                        <p className="mt-1 text-sm text-gray-500">
                            Tell visitors a little about yourself.
                        </p>

                    </div>

                    <textarea
                        name="bio"
                        value={form.bio}
                        onChange={handleChange}
                        rows={7}
                        maxLength={1000}
                        placeholder="Tell people a little about yourself..."
                        className="w-full resize-none rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-gray-500"
                    />

                    <p className="mt-2 text-right text-xs text-gray-400">
                        {form.bio.length}/1000
                    </p>

                </section>


                {/* Links */}

                <section className="rounded-2xl border border-gray-200 bg-white p-6">

                    <div className="mb-6">

                        <h2 className="text-base font-semibold text-gray-950">
                            Links
                        </h2>

                        <p className="mt-1 text-sm text-gray-500">
                            Add your professional and social links.
                        </p>

                    </div>


                    <div className="space-y-5">

                        {/* Website */}

                        <div>

                            <label className="text-sm font-medium text-gray-700">
                                Website
                            </label>

                            <input
                                type="url"
                                name="website_url"
                                value={form.website_url}
                                onChange={handleChange}
                                placeholder="https://yourwebsite.com"
                                className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-gray-500"
                            />

                        </div>


                        {/* GitHub */}

                        <div>

                            <label className="text-sm font-medium text-gray-700">
                                GitHub
                            </label>

                            <input
                                type="url"
                                name="github_url"
                                value={form.github_url}
                                onChange={handleChange}
                                placeholder="https://github.com/username"
                                className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-gray-500"
                            />

                        </div>


                        {/* LinkedIn */}

                        <div>

                            <label className="text-sm font-medium text-gray-700">
                                LinkedIn
                            </label>

                            <input
                                type="url"
                                name="linkedin_url"
                                value={form.linkedin_url}
                                onChange={handleChange}
                                placeholder="https://linkedin.com/in/username"
                                className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-gray-500"
                            />

                        </div>

                    </div>

                </section>


                {/* Save */}

                <div className="flex justify-end">

                    <button
                        type="submit"
                        disabled={saving}
                        className="rounded-xl bg-gray-950 px-6 py-3 text-sm font-medium text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        {saving
                            ? "Saving..."
                            : "Save Profile"}
                    </button>

                </div>

            </form>

        </div>
    );
}

export default ProfileSettings;