import { useEffect, useState } from "react";
import api from "../services/api";

import MessageHeader from "../components/messages/MessageHeader";
import MessageList from "../components/messages/MessageList";

function Messages() {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");


    useEffect(() => {
        async function loadMessages() {
            try {
                const response = await api.get("/messages");

                setMessages(response.data);

            } catch (error) {
                console.error("Messages error:", error);

                setError("Failed to load messages");

            } finally {
                setLoading(false);
            }
        }

        loadMessages();
    }, []);


    async function handleDelete(id) {
        try {
            setError("");

            await api.delete(`/messages/${id}`);

            setMessages((current) =>
                current.filter(
                    (message) => message.id !== id
                )
            );

        } catch (error) {
            console.error("Delete message error:", error);

            setError(
                error.response?.data?.error ||
                "Failed to delete message"
            );
        }
    }


    return (
        <div className="min-h-screen bg-gray-50 px-6 py-12">

            <div className="mx-auto max-w-5xl">

                <MessageHeader />


                {error && (
                    <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-600">
                        {error}
                    </div>
                )}


                {loading ? (
                    <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center">
                        <p className="text-gray-500">
                            Loading messages...
                        </p>
                    </div>
                ) : (
                    <MessageList
                        messages={messages}
                        onDelete={handleDelete}
                    />
                )}

            </div>

        </div>
    );
}

export default Messages;