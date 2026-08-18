function Contact() {
    return (
        <main className="min-h-screen bg-gray-50">

            <div className="mx-auto max-w-5xl px-6 py-20 lg:px-8">

                <div className="max-w-2xl">

                    <p className="text-sm font-semibold uppercase tracking-widest text-blue-600">
                        Get In Touch
                    </p>

                    <h1 className="mt-3 text-4xl font-bold tracking-tight text-gray-900">
                        Contact Me
                    </h1>

                    <p className="mt-5 text-lg leading-8 text-gray-600">
                        Have a question, project idea, or just want to
                        connect? Feel free to reach out.
                    </p>

                </div>


                <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">

                    <a
                        href="mailto:your@email.com"
                        className="rounded-2xl border border-gray-200 bg-white p-6 transition hover:-translate-y-1 hover:shadow-lg"
                    >
                        <div className="text-2xl">
                            ✉️
                        </div>

                        <h2 className="mt-5 font-semibold text-gray-900">
                            Email
                        </h2>

                        <p className="mt-2 text-sm text-gray-500">
                            your@email.com
                        </p>
                    </a>


                    <a
                        href="https://linkedin.com/in/yourusername"
                        target="_blank"
                        rel="noreferrer"
                        className="rounded-2xl border border-gray-200 bg-white p-6 transition hover:-translate-y-1 hover:shadow-lg"
                    >
                        <div className="text-2xl">
                            💼
                        </div>

                        <h2 className="mt-5 font-semibold text-gray-900">
                            LinkedIn
                        </h2>

                        <p className="mt-2 text-sm text-gray-500">
                            Connect with me
                        </p>
                    </a>


                    <a
                        href="https://github.com/yourusername"
                        target="_blank"
                        rel="noreferrer"
                        className="rounded-2xl border border-gray-200 bg-white p-6 transition hover:-translate-y-1 hover:shadow-lg"
                    >
                        <div className="text-2xl">
                            💻
                        </div>

                        <h2 className="mt-5 font-semibold text-gray-900">
                            GitHub
                        </h2>

                        <p className="mt-2 text-sm text-gray-500">
                            Check out my work
                        </p>
                    </a>

                </div>

            </div>

        </main>
    );
}

export default Contact;