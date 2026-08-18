import { Link } from "react-router-dom";

function Hero() {
    return (
        <section className="bg-slate-50">
            <div className="container mx-auto max-w-7xl px-6 py-24 lg:px-8 lg:py-32">

                <div className="grid items-center gap-16 lg:grid-cols-2">

                    {/* Content */}
                    <div>

                        <p className="mb-6 text-sm font-semibold uppercase tracking-[0.25em] text-indigo-600">
                            Digital Experiences
                        </p>

                        <h1 className="text-5xl font-bold tracking-tight text-slate-950 sm:text-6xl lg:text-7xl">
                            Building
                            <span className="block text-slate-400">
                                digital experiences.
                            </span>
                        </h1>

                        <p className="mt-8 max-w-xl text-lg leading-8 text-slate-600">
                            Modern, clean and scalable web experiences
                            built with thoughtful design and powerful
                            technology.
                        </p>

                        <div className="mt-10 flex flex-wrap gap-4">

                            <Link
                                to="/projects"
                                className="rounded-lg bg-slate-950 px-6 py-3 font-medium text-white transition hover:bg-indigo-600"
                            >
                                Explore Projects
                            </Link>

                            <Link
                                to="/contact"
                                className="rounded-lg border border-slate-300 bg-white px-6 py-3 font-medium text-slate-700 transition hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-700"
                            >
                                Get In Touch
                            </Link>

                        </div>

                    </div>


                    {/* Visual */}
                    <div className="relative flex justify-center lg:justify-end">

                        <div className="flex h-80 w-80 items-center justify-center rounded-3xl bg-indigo-100 sm:h-96 sm:w-96">

                            <span className="text-7xl font-bold text-indigo-300">
                                &lt;/&gt;
                            </span>

                        </div>

                    </div>

                </div>

            </div>
        </section>
    );
}

export default Hero;