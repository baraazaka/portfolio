import { useEffect, useState } from "react";
import api from "../services/api";

function Messages() {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        async function loadMessages() {
            try {
                setLoading(true);
                setError("");

                const response = await api.get("/messages");

                setMessages(response.data);

            } catch (error) {
                console.error(
                    "Messages error:",
                    error
                );

                setError(
                    error.response?.data?.error ||
                    "Failed to load messages"
                );

            } finally {
                setLoading(false);
            }
        }

        loadMessages();
    }, []);


    async function handleDelete(messageId) {
        const confirmed = window.confirm(
            "Are you sure you want to delete this message?"
        );

        if (!confirmed) {
            return;
        }

        try {
            await api.delete(`/messages/${messageId}`);

            setMessages((currentMessages) =>
                currentMessages.filter(
                    (message) => message.id !== messageId
                )
            );

        } catch (error) {
            console.error(
                "Delete message error:",
                error
            );

            setError(
                error.response?.data?.error ||
                "Failed to delete message"
            );
        }
    }


    if (loading) {
        return (
            <div className="rounded-2xl border border-gray-200 bg-white p-10 text-center">
                <p className="text-gray-500">
                    Loading messages...
                </p>
            </div>
        );
    }


    if (error) {
        return (
            <div className="rounded-2xl border border-red-200 bg-red-50 p-6">
                <p className="text-sm text-red-600">
                    {error}
                </p>
            </div>
        );
    }


    return (
        <div>

            <div className="mb-8">

                <p className="text-sm font-semibold uppercase tracking-widest text-blue-600">
                    Inbox
                </p>

                <h1 className="mt-2 text-3xl font-bold text-gray-900">
                    Messages
                </h1>

                <p className="mt-2 text-gray-500">
                    Messages from people interested in your projects.
                </p>

            </div>


            {messages.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-12 text-center">

                    <h2 className="text-lg font-semibold text-gray-900">
                        No messages yet
                    </h2>

                    <p className="mt-2 text-sm text-gray-500">
                        Messages from your project visitors will appear here.
                    </p>

                </div>
            ) : (
                <div className="space-y-5">

                    {messages.map((message) => (
                        <article
                            key={message.id}
                            className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
                        >

                            <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">

                                <div>

                                    <h2 className="text-lg font-semibold text-gray-900">
                                        {message.name}
                                    </h2>

                                    <a
                                        href={`mailto:${message.email}`}
                                        className="mt-1 block text-sm text-blue-600 hover:underline"
                                    >
                                        {message.email}
                                    </a>

                                </div>


                                <p className="text-xs text-gray-400">
                                    {new Date(
                                        message.created_at
                                    ).toLocaleDateString()}
                                </p>

                            </div>


                            {message.project_title && (
                                <div className="mt-5 rounded-xl bg-gray-50 px-4 py-3">

                                    <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                                        Project
                                    </p>

                                    <p className="mt-1 font-medium text-gray-900">
                                        {message.project_title}
                                    </p>

                                </div>
                            )}


                            <div className="mt-5">

                                <p className="whitespace-pre-line text-sm leading-7 text-gray-600">
                                    {message.message}
                                </p>

                            </div>


                            <div className="mt-6 border-t border-gray-100 pt-4">

                                <button
                                    type="button"
                                    onClick={() =>
                                        handleDelete(message.id)
                                    }
                                    className="text-sm font-medium text-red-600 transition hover:text-red-700"
                                >
                                    Delete
                                </button>

                            </div>

                        </article>
                    ))}

                </div>
            )}

        </div>
    );
}

export default Messages;