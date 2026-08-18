function About() {
    return (
        <section className="bg-white">
            <div className="container mx-auto max-w-7xl px-6 py-24 lg:px-8">

                <div className="grid items-center gap-16 lg:grid-cols-2">

                    <div>
                        <p className="text-sm font-semibold uppercase tracking-widest text-blue-600">
                            About
                        </p>

                        <h2 className="mt-3 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                            Turning ideas into digital experiences.
                        </h2>
                    </div>

                    <div>
                        <p className="text-lg leading-8 text-gray-600">
                            I enjoy building web applications that are
                            simple, useful, and easy to maintain.
                            From the frontend experience to the backend
                            architecture, every part matters.
                        </p>

                        <p className="mt-6 text-lg leading-8 text-gray-600">
                            My focus is on creating modern applications
                            using technologies like React, Node.js,
                            Express, and PostgreSQL.
                        </p>
                    </div>

                </div>

            </div>
        </section>
    );
}

export default About;