import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../services/api";

function ProjectDetails() {
    const { id } = useParams();

    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [showMessageForm, setShowMessageForm] = useState(false);

    const [messageData, setMessageData] = useState({
        name: "",
        email: "",
        message: ""
    });

    const [sendingMessage, setSendingMessage] = useState(false);
    const [messageSuccess, setMessageSuccess] = useState("");
    const [messageError, setMessageError] = useState("");

    useEffect(() => {
        async function loadProject() {
            try {
                setLoading(true);
                setError("");

                const response = await api.get(`/projects/${id}`);

                setProject(response.data);

            } catch (error) {
                console.error("Project details error:", error);

                setError(
                    error.response?.data?.error ||
                    "Failed to load project"
                );

            } finally {
                setLoading(false);
            }
        }

        loadProject();
    }, [id]);


    function getImageUrl(imageUrl) {
        if (!imageUrl) {
            return "";
        }

        if (
            imageUrl.startsWith("http://") ||
            imageUrl.startsWith("https://")
        ) {
            return imageUrl;
        }

        return `http://localhost:5000${imageUrl}`;
    }


    async function handleSendMessage(e) {
        e.preventDefault();

        try {
            setSendingMessage(true);
            setMessageError("");
            setMessageSuccess("");

            await api.post("/messages", {
                name: messageData.name,
                email: messageData.email,
                message: messageData.message,
                project_id: project.id
            });

            setMessageData({
                name: "",
                email: "",
                message: ""
            });

            setMessageSuccess(
                "Your message has been sent successfully."
            );

        } catch (error) {
            console.error("Send message error:", error);

            setMessageError(
                error.response?.data?.error ||
                "Failed to send message"
            );

        } finally {
            setSendingMessage(false);
        }
    }


    if (loading) {
        return (
            <main className="min-h-screen bg-gray-50 px-4 py-12 sm:px-6">

                <div className="mx-auto max-w-4xl">

                    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">

                        <div className="aspect-[16/7] animate-pulse bg-gray-100" />

                        <div className="space-y-4 p-6">
                            <div className="h-4 w-32 animate-pulse rounded bg-gray-100" />
                            <div className="h-9 w-2/3 animate-pulse rounded bg-gray-100" />
                            <div className="h-20 w-full animate-pulse rounded bg-gray-100" />
                        </div>

                    </div>

                </div>

            </main>
        );
    }


    if (error) {
        return (
            <main className="min-h-screen bg-gray-50 px-4 py-12 sm:px-6">

                <div className="mx-auto max-w-4xl">

                    <div className="rounded-2xl border border-red-200 bg-white p-8 text-center shadow-sm">

                        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-50 text-lg">
                            !
                        </div>

                        <h1 className="mt-4 text-xl font-semibold text-gray-900">
                            Project unavailable
                        </h1>

                        <p className="mt-2 text-sm text-red-600">
                            {error}
                        </p>

                        <Link
                            to="/projects"
                            className="mt-5 inline-flex rounded-xl bg-gray-950 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800"
                        >
                            ← Back to Projects
                        </Link>

                    </div>

                </div>

            </main>
        );
    }


    if (!project) {
        return null;
    }


    const imageUrl = getImageUrl(project.image_url);

    const ownerInitial =
        project.user_name?.charAt(0)?.toUpperCase() || "U";


    return (
        <main className="min-h-screen bg-gray-50">

            <div className="mx-auto max-w-4xl px-4 py-7 sm:px-6 sm:py-10">

                {/* Back */}
                <Link
                    to="/projects"
                    className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition hover:text-gray-950"
                >
                    <span className="text-base">←</span>
                    Back to Projects
                </Link>


                {/* Main Project Card */}
                <article className="mt-5 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">

                    {/* Project Image */}
                    <div className="relative aspect-[16/7] overflow-hidden bg-gray-100">

                        {imageUrl ? (
                            <img
                                src={imageUrl}
                                alt={project.title}
                                className="h-full w-full object-cover"
                                onError={(e) => {
                                    console.error(
                                        "PROJECT IMAGE FAILED:",
                                        imageUrl
                                    );

                                    e.currentTarget.style.display = "none";
                                }}
                            />
                        ) : (
                            <div className="flex h-full items-center justify-center">

                                <div className="text-center">

                                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-white text-xl shadow-sm">
                                        🖼️
                                    </div>

                                    <p className="mt-3 text-sm text-gray-400">
                                        No project image
                                    </p>

                                </div>

                            </div>
                        )}


                        {/* Published badge */}
                        <div className="absolute left-4 top-4">

                            <span className="rounded-full border border-white/30 bg-black/70 px-3 py-1.5 text-[11px] font-semibold text-white backdrop-blur">
                                Published Project
                            </span>

                        </div>

                    </div>


                    <div className="p-5 sm:p-6 lg:p-7">

                        {/* Owner */}
                      <div className="flex items-center gap-3">

    <div className="h-10 w-10 overflow-hidden rounded-full bg-gray-950">
        {project.user_profile_image_url ? (
            <img
                src={project.user_profile_image_url}
                alt={project.user_name || "Project Owner"}
                className="h-full w-full object-cover"
                onError={(e) => {
                    e.currentTarget.style.display = "none";
                }}
            />
        ) : (
            <div className="flex h-full w-full items-center justify-center text-sm font-semibold text-white">
                {ownerInitial}
            </div>
        )}
    </div>

    <div>
        <p className="text-sm font-semibold text-gray-900">
            {project.user_name || "Unknown user"}
        </p>

        <p className="mt-0.5 text-xs text-gray-500">
            Project Owner
        </p>
    </div>

</div>

                        {/* Title */}
                        <h1 className="mt-5 max-w-3xl text-3xl font-bold tracking-tight text-gray-950 sm:text-4xl">
                            {project.title}
                        </h1>


                        {/* Description */}
                        <section className="mt-7">

                            <div className="flex items-center gap-2">

                                <div className="h-5 w-1 rounded-full bg-gray-950" />

                                <h2 className="text-base font-semibold text-gray-950">
                                    About this project
                                </h2>

                            </div>

                            <p className="mt-3 max-w-3xl whitespace-pre-line text-sm leading-7 text-gray-600">
                                {project.description ||
                                    "No description available."}
                            </p>

                        </section>


                        {/* Technologies */}
                        {project.skills?.length > 0 && (
                            <section className="mt-7">

                                <div className="flex items-center gap-2">

                                    <div className="h-5 w-1 rounded-full bg-gray-950" />

                                    <h2 className="text-base font-semibold text-gray-950">
                                        Technologies
                                    </h2>

                                </div>


                                <div className="mt-4 flex flex-wrap gap-1.5">

                                    {project.skills.map((skill) => (
                                        <span
                                            key={skill.id}
                                            className="rounded-full border border-gray-200 bg-gray-50 px-3 py-1.5 text-xs font-medium text-gray-700 transition hover:border-gray-300 hover:bg-white"
                                        >
                                            {skill.name}
                                        </span>
                                    ))}

                                </div>

                            </section>
                        )}


                        {/* Links */}
                        {(project.github_url || project.live_url) && (
                            <section className="mt-7">

                                <div className="flex flex-wrap gap-2">

                                    {project.github_url && (
                                        <a
                                            href={project.github_url}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-xs font-medium text-gray-700 transition hover:border-gray-950 hover:bg-gray-50"
                                        >
                                            <span>GitHub</span>
                                            <span>↗</span>
                                        </a>
                                    )}

                                    {project.live_url && (
                                        <a
                                            href={project.live_url}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="inline-flex items-center gap-2 rounded-lg bg-gray-950 px-4 py-2.5 text-xs font-medium text-white transition hover:bg-gray-800"
                                        >
                                            <span>Live Demo</span>
                                            <span>↗</span>
                                        </a>
                                    )}

                                </div>

                            </section>
                        )}


                        {/* Contact */}
                        <section className="mt-9 border-t border-gray-100 pt-7">

                            <div className="rounded-xl bg-gray-50 p-5 sm:p-6">

                                <div className="max-w-xl">

                                    <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gray-400">
                                        Get in touch
                                    </p>

                                    <h2 className="mt-2 text-xl font-semibold text-gray-950">
                                        Interested in this project?
                                    </h2>

                                    <p className="mt-1.5 text-sm leading-6 text-gray-500">
                                        Send a message directly to the project owner.
                                    </p>

                                </div>


                                {!showMessageForm && (
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setShowMessageForm(true);
                                            setMessageError("");
                                            setMessageSuccess("");
                                        }}
                                        className="mt-5 rounded-lg bg-gray-950 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800"
                                    >
                                        Contact Project Owner
                                    </button>
                                )}


                                {showMessageForm && (
                                    <form
                                        onSubmit={handleSendMessage}
                                        className="mt-6 max-w-xl space-y-4"
                                    >

                                        {/* Name */}
                                        <div>

                                            <label className="text-xs font-medium text-gray-700">
                                                Your Name
                                            </label>

                                            <input
                                                type="text"
                                                value={messageData.name}
                                                onChange={(e) =>
                                                    setMessageData({
                                                        ...messageData,
                                                        name: e.target.value
                                                    })
                                                }
                                                required
                                                placeholder="Your name"
                                                className="mt-1.5 w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-gray-950 focus:ring-2 focus:ring-gray-100"
                                            />

                                        </div>


                                        {/* Email */}
                                        <div>

                                            <label className="text-xs font-medium text-gray-700">
                                                Your Email
                                            </label>

                                            <input
                                                type="email"
                                                value={messageData.email}
                                                onChange={(e) =>
                                                    setMessageData({
                                                        ...messageData,
                                                        email: e.target.value
                                                    })
                                                }
                                                required
                                                placeholder="you@example.com"
                                                className="mt-1.5 w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-gray-950 focus:ring-2 focus:ring-gray-100"
                                            />

                                        </div>


                                        {/* Message */}
                                        <div>

                                            <label className="text-xs font-medium text-gray-700">
                                                Message
                                            </label>

                                            <textarea
                                                rows="4"
                                                value={messageData.message}
                                                onChange={(e) =>
                                                    setMessageData({
                                                        ...messageData,
                                                        message: e.target.value
                                                    })
                                                }
                                                required
                                                placeholder="Tell the project owner what you think..."
                                                className="mt-1.5 w-full resize-none rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-gray-950 focus:ring-2 focus:ring-gray-100"
                                            />

                                        </div>


                                        {/* Error */}
                                        {messageError && (
                                            <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-600">
                                                {messageError}
                                            </div>
                                        )}


                                        {/* Success */}
                                        {messageSuccess && (
                                            <div className="rounded-lg border border-green-200 bg-green-50 p-3 text-sm text-green-600">
                                                ✓ {messageSuccess}
                                            </div>
                                        )}


                                        {/* Buttons */}
                                        <div className="flex flex-wrap gap-2">

                                            <button
                                                type="submit"
                                                disabled={sendingMessage}
                                                className="rounded-lg bg-gray-950 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
                                            >
                                                {sendingMessage
                                                    ? "Sending..."
                                                    : "Send Message"}
                                            </button>

                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setShowMessageForm(false);
                                                    setMessageError("");
                                                }}
                                                className="rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
                                            >
                                                Cancel
                                            </button>

                                        </div>

                                    </form>
                                )}

                            </div>

                        </section>

                    </div>

                </article>

            </div>

        </main>
    );
}

export default ProjectDetails;