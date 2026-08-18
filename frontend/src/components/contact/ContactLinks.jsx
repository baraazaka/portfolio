function ContactLinks() {
    return (
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">

            <h2 className="text-xl font-semibold text-gray-900">
                Find me online
            </h2>

            <div className="mt-6 flex flex-col gap-3">

                <a
                    href="https://github.com/"
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-xl border border-gray-200 px-5 py-4 text-sm font-medium text-gray-700 transition hover:bg-gray-50 hover:text-black"
                >
                    GitHub →
                </a>

                <a
                    href="https://linkedin.com/"
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-xl border border-gray-200 px-5 py-4 text-sm font-medium text-gray-700 transition hover:bg-gray-50 hover:text-black"
                >
                    LinkedIn →
                </a>

                <a
                    href="mailto:bara.zaka@gmail.com"
                    className="rounded-xl bg-black px-5 py-4 text-center text-sm font-medium text-white transition hover:bg-gray-800"
                >
                    Send me an email
                </a>

            </div>

        </div>
    );
}

export default ContactLinks;