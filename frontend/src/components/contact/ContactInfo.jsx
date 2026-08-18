function ContactInfo() {
    return (
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">

            <p className="text-sm font-semibold uppercase tracking-widest text-blue-600">
                Get in touch
            </p>

            <h2 className="mt-3 text-2xl font-bold text-gray-900">
                Baraa Zakarneh
            </h2>

            <p className="mt-2 text-gray-500">
                Full-Stack Developer
            </p>

            <p className="mt-6 text-sm leading-7 text-gray-600">
                I'm a developer interested in building modern,
                useful, and well-designed web applications.
            </p>

            <div className="mt-8">

                <p className="text-sm font-medium text-gray-500">
                    Email
                </p>

                <a
                    href="mailto:bara.zaka@gmail.com"
                    className="mt-2 inline-block text-sm font-medium text-gray-900 transition hover:text-blue-600"
                >
                    bara.zaka@gmail.com
                </a>

            </div>

        </div>
    );
}

export default ContactInfo;