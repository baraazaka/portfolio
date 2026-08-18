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

                const response = await api.get(
                    `/projects/${id}`
                );

                setProject(response.data);

            } catch (error) {
                console.error(
                    "Project details error:",
                    error
                );

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
                project_id: project.id,
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
            console.error(
                "Send message error:",
                error
            );

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
            <div className="min-h-screen bg-gray-50 px-6 py-24">
                <div className="mx-auto max-w-5xl rounded-2xl border border-gray-200 bg-white p-10 text-center">
                    <p className="text-gray-500">
                        Loading project...
                    </p>
                </div>
            </div>
        );
    }


    if (error) {
        return (
            <div className="min-h-screen bg-gray-50 px-6 py-24">
                <div className="mx-auto max-w-5xl">

                    <div className="rounded-2xl border border-red-200 bg-red-50 p-8 text-center">

                        <p className="text-red-600">
                            {error}
                        </p>

                        <Link
                            to="/projects"
                            className="mt-5 inline-block rounded-xl bg-black px-5 py-3 text-sm font-medium text-white"
                        >
                            Back to Projects
                        </Link>

                    </div>

                </div>
            </div>
        );
    }


    if (!project) {
        return null;
    }


    return (
        <main className="min-h-screen bg-gray-50">

            <div className="mx-auto max-w-6xl px-6 py-16 lg:px-8">

                {/* Back */}
                <Link
                    to="/projects"
                    className="inline-flex items-center text-sm font-medium text-gray-500 transition hover:text-black"
                >
                    ← Back to Projects
                </Link>


                {/* Project */}
                <article className="mt-8 overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm">

                    {/* Image */}
                    <div className="aspect-video overflow-hidden bg-gray-100">

                        {project.image_url ? (
                            <img
                                src={project.image_url}
                                alt={project.title}
                                className="h-full w-full object-cover"
                            />
                        ) : (
                            <div className="flex h-full items-center justify-center text-gray-400">
                                No image
                            </div>
                        )}

                    </div>


                    <div className="p-8 lg:p-12">

                        {/* Owner */}
                        <div className="flex items-center gap-4">

                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 text-lg font-semibold text-gray-700">
                                {project.user_name
                                    ?.charAt(0)
                                    .toUpperCase()}
                            </div>

                            <div>

                                <p className="font-semibold text-gray-900">
                                    {project.user_name || "Unknown user"}
                                </p>

                                <p className="text-sm text-gray-500">
                                    Project Owner
                                </p>

                            </div>

                        </div>


                        {/* Title */}
                        <h1 className="mt-8 text-4xl font-bold tracking-tight text-gray-900 lg:text-5xl">
                            {project.title}
                        </h1>


                        {/* Description */}
                        <div className="mt-8">

                            <h2 className="text-lg font-semibold text-gray-900">
                                About this project
                            </h2>

                            <p className="mt-3 whitespace-pre-line text-base leading-8 text-gray-600">
                                {project.description ||
                                    "No description available."}
                            </p>

                        </div>


                        {/* Technologies */}
                        {project.skills?.length > 0 && (
                            <div className="mt-10">

                                <h2 className="text-lg font-semibold text-gray-900">
                                    Technologies
                                </h2>

                                <div className="mt-4 flex flex-wrap gap-3">

                                    {project.skills.map((skill) => (
                                        <span
                                            key={skill.id}
                                            className="rounded-full border border-gray-200 bg-gray-50 px-4 py-2 text-sm font-medium text-gray-700"
                                        >
                                            {skill.name}
                                        </span>
                                    ))}

                                </div>

                            </div>
                        )}


                        {/* Links */}
                        <div className="mt-10 flex flex-wrap gap-3">

                            {project.github_url && (
                                <a
                                    href={project.github_url}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="rounded-xl border border-gray-300 px-5 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
                                >
                                    View on GitHub
                                </a>
                            )}

                            {project.live_url && (
                                <a
                                    href={project.live_url}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="rounded-xl bg-black px-5 py-3 text-sm font-medium text-white transition hover:bg-gray-800"
                                >
                                    Live Demo
                                </a>
                            )}

                        </div>


                        {/* Contact Owner */}
                        <div className="mt-12 border-t border-gray-200 pt-10">

                            <h2 className="text-2xl font-semibold text-gray-900">
                                Interested in this project?
                            </h2>

                            <p className="mt-2 text-sm text-gray-500">
                                Send a message directly to the project owner.
                            </p>


                            {!showMessageForm && (
                                <button
                                    type="button"
                                    onClick={() => {
                                        setShowMessageForm(true);
                                        setMessageError("");
                                        setMessageSuccess("");
                                    }}
                                    className="mt-6 rounded-xl bg-black px-5 py-3 text-sm font-medium text-white transition hover:bg-gray-800"
                                >
                                    Contact Project Owner
                                </button>
                            )}


                            {showMessageForm && (
                                <form
                                    onSubmit={handleSendMessage}
                                    className="mt-6 max-w-2xl space-y-5"
                                >

                                    <div>

                                        <label className="text-sm font-medium text-gray-700">
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
                                            className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-black"
                                            placeholder="Your name"
                                        />

                                    </div>


                                    <div>

                                        <label className="text-sm font-medium text-gray-700">
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
                                            className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-black"
                                            placeholder="you@example.com"
                                        />

                                    </div>


                                    <div>

                                        <label className="text-sm font-medium text-gray-700">
                                            Message
                                        </label>

                                        <textarea
                                            rows="5"
                                            value={messageData.message}
                                            onChange={(e) =>
                                                setMessageData({
                                                    ...messageData,
                                                    message: e.target.value
                                                })
                                            }
                                            required
                                            className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-black"
                                            placeholder="Tell the project owner what you think..."
                                        />

                                    </div>


                                    {messageError && (
                                        <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-600">
                                            {messageError}
                                        </div>
                                    )}


                                    {messageSuccess && (
                                        <div className="rounded-xl border border-green-200 bg-green-50 p-4 text-sm text-green-600">
                                            {messageSuccess}
                                        </div>
                                    )}


                                    <div className="flex flex-wrap gap-3">

                                        <button
                                            type="submit"
                                            disabled={sendingMessage}
                                            className="rounded-xl bg-black px-5 py-3 text-sm font-medium text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
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
                                            className="rounded-xl border border-gray-300 px-5 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
                                        >
                                            Cancel
                                        </button>

                                    </div>

                                </form>
                            )}

                        </div>

                    </div>

                </article>

            </div>

        </main>
    );
}

export default ProjectDetails;