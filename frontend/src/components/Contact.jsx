function Contact() {
    return (
        <section className="bg-gray-50">
            <div className="container mx-auto max-w-7xl px-6 py-24 lg:px-8">

                <div className="mx-auto max-w-2xl text-center">

                    <p className="text-sm font-semibold uppercase tracking-widest text-blue-600">
                        Contact
                    </p>

                    <h2 className="mt-3 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                        Let's build something together.
                    </h2>

                    <p className="mt-6 text-lg leading-8 text-gray-600">
                        Have a project in mind or want to get in touch?
                        I'd love to hear from you.
                    </p>

                    <a
                        href="mailto:your-email@example.com"
                        className="mt-8 inline-flex rounded-full bg-black px-7 py-3 font-medium text-white transition hover:bg-gray-800"
                    >
                        Get In Touch →
                    </a>

                </div>

            </div>
        </section>
    );
}

export default Contact;