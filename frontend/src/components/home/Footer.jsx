function Footer() {
    return (
        <footer className="border-t border-gray-200 bg-white">
            <div className="container mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-8 sm:flex-row lg:px-8">

                <p className="text-sm text-gray-500">
                    © 2026 Bara. All rights reserved.
                </p>

                <div className="flex items-center gap-6">
                    <a
                        href="#"
                        className="text-sm text-gray-500 transition hover:text-black"
                    >
                        GitHub
                    </a>

                    <a
                        href="#"
                        className="text-sm text-gray-500 transition hover:text-black"
                    >
                        LinkedIn
                    </a>
                </div>

            </div>
        </footer>
    );
}

export default Footer;