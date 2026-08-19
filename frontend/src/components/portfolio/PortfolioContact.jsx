import { useState } from "react";
import api from "../../services/api";

function PortfolioContact() {
    const [form, setForm] = useState({
        name: "",
        email: "",
        message: ""
    });

    const [sending, setSending] = useState(false);
    const [status, setStatus] = useState({
        type: "",
        message: ""
    });

    function handleChange(e) {
        const { name, value } = e.target;

        setForm((prev) => ({
            ...prev,
            [name]: value
        }));
    }

    async function handleSubmit(e) {
        e.preventDefault();

        setSending(true);
        setStatus({
            type: "",
            message: ""
        });

        try {
            await api.post("/messages", form);

            setForm({
                name: "",
                email: "",
                message: ""
            });

            setStatus({
                type: "success",
                message: "Your message has been sent successfully."
            });

        } catch (error) {
            console.error("Contact error:", error);

            setStatus({
                type: "error",
                message:
                    error.response?.data?.error ||
                    "Failed to send your message."
            });

        } finally {
            setSending(false);
        }
    }

    return (
        <section
            id="contact"
            className="bg-white"
        >
            <div className="mx-auto max-w-3xl px-6 py-12 sm:px-10 sm:py-14">

                <div className="grid gap-10 sm:grid-cols-[180px_1fr]">

                    {/* Intro */}
                    <div>
                        <p className="text-xs font-medium uppercase tracking-[0.2em] text-gray-400">
                            Contact
                        </p>

                        <h2 className="mt-2 text-2xl font-semibold tracking-tight text-gray-950">
                            Let's talk
                        </h2>
                    </div>


                    {/* Form */}
                    <div>

                        <p className="text-sm leading-6 text-gray-500">
                            Have a project, opportunity, or just want to say
                            hello? Send me a message.
                        </p>

                        <form
                            onSubmit={handleSubmit}
                            className="mt-7"
                        >

                            <div className="grid gap-5 sm:grid-cols-2">

                                <div>
                                    <label
                                        htmlFor="contact-name"
                                        className="text-xs font-medium text-gray-500"
                                    >
                                        Name
                                    </label>

                                    <input
                                        id="contact-name"
                                        name="name"
                                        type="text"
                                        value={form.name}
                                        onChange={handleChange}
                                        placeholder="Your name"
                                        required
                                        className="mt-2 w-full border-b border-gray-200 bg-transparent px-0 py-2.5 text-sm text-gray-900 outline-none transition placeholder:text-gray-300 focus:border-gray-900"
                                    />
                                </div>

                                <div>
                                    <label
                                        htmlFor="contact-email"
                                        className="text-xs font-medium text-gray-500"
                                    >
                                        Email
                                    </label>

                                    <input
                                        id="contact-email"
                                        name="email"
                                        type="email"
                                        value={form.email}
                                        onChange={handleChange}
                                        placeholder="you@example.com"
                                        required
                                        className="mt-2 w-full border-b border-gray-200 bg-transparent px-0 py-2.5 text-sm text-gray-900 outline-none transition placeholder:text-gray-300 focus:border-gray-900"
                                    />
                                </div>

                            </div>


                            <div className="mt-6">
                                <label
                                    htmlFor="contact-message"
                                    className="text-xs font-medium text-gray-500"
                                >
                                    Message
                                </label>

                                <textarea
                                    id="contact-message"
                                    name="message"
                                    value={form.message}
                                    onChange={handleChange}
                                    placeholder="Tell me about your project..."
                                    required
                                    rows={4}
                                    className="mt-2 w-full resize-none border-b border-gray-200 bg-transparent px-0 py-2.5 text-sm text-gray-900 outline-none transition placeholder:text-gray-300 focus:border-gray-900"
                                />
                            </div>


                            {status.message && (
                                <div
                                    className={`mt-5 text-sm ${
                                        status.type === "success"
                                            ? "text-gray-700"
                                            : "text-red-500"
                                    }`}
                                >
                                    {status.message}
                                </div>
                            )}


                            <button
                                type="submit"
                                disabled={sending}
                                className="mt-7 inline-flex items-center rounded-lg bg-gray-950 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                {sending
                                    ? "Sending..."
                                    : "Send Message →"}
                            </button>

                        </form>

                    </div>

                </div>

            </div>
        </section>
    );
}

export default PortfolioContact;