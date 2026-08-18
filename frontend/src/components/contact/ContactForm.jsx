import { useState } from "react";
import api from "../../services/api";

function ContactForm() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const [sending, setSending] = useState(false);
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");


    async function handleSubmit(e) {
        e.preventDefault();

        setSending(true);
        setSuccess("");
        setError("");

        try {
            await api.post("/messages", {
                name,
                email,
                message
            });

            setName("");
            setEmail("");
            setMessage("");

            setSuccess(
                "Your message has been sent successfully!"
            );

        } catch (error) {
            console.error("Send message error:", error);

            setError(
                error.response?.data?.error ||
                "Failed to send message"
            );

        } finally {
            setSending(false);
        }
    }


    return (
        <section className="py-20">

            <div className="mx-auto max-w-3xl">

                <div className="mb-10 text-center">

                    <p className="text-sm font-semibold uppercase tracking-widest text-blue-600">
                        Contact
                    </p>

                    <h2 className="mt-2 text-3xl font-bold text-gray-900">
                        Let's Work Together
                    </h2>

                    <p className="mt-3 text-gray-500">
                        Have a project or opportunity?
                        Send me a message.
                    </p>

                </div>


                <form
                    onSubmit={handleSubmit}
                    className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8"
                >

                    <div className="grid gap-5 sm:grid-cols-2">

                        <div>
                            <label className="text-sm font-medium text-gray-700">
                                Name
                            </label>

                            <input
                                type="text"
                                value={name}
                                onChange={(e) =>
                                    setName(e.target.value)
                                }
                                required
                                className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-black"
                                placeholder="Your name"
                            />
                        </div>


                        <div>
                            <label className="text-sm font-medium text-gray-700">
                                Email
                            </label>

                            <input
                                type="email"
                                value={email}
                                onChange={(e) =>
                                    setEmail(e.target.value)
                                }
                                required
                                className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-black"
                                placeholder="you@example.com"
                            />
                        </div>

                    </div>


                    <div className="mt-5">

                        <label className="text-sm font-medium text-gray-700">
                            Message
                        </label>

                        <textarea
                            value={message}
                            onChange={(e) =>
                                setMessage(e.target.value)
                            }
                            required
                            rows="6"
                            className="mt-2 w-full resize-none rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-black"
                            placeholder="Tell me about your project..."
                        />

                    </div>


                    {success && (
                        <div className="mt-5 rounded-xl border border-green-200 bg-green-50 p-4 text-sm text-green-700">
                            {success}
                        </div>
                    )}


                    {error && (
                        <div className="mt-5 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-600">
                            {error}
                        </div>
                    )}


                    <button
                        type="submit"
                        disabled={sending}
                        className="mt-6 w-full rounded-xl bg-black px-5 py-3 text-sm font-medium text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        {sending
                            ? "Sending..."
                            : "Send Message"}
                    </button>

                </form>

            </div>

        </section>
    );
}

export default ContactForm;