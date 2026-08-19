function PortfolioFooter({ user }) {
    return (
        <footer className="border-t border-stone-800 bg-stone-950">

            <div className="mx-auto flex max-w-6xl flex-col gap-3 px-6 py-7 sm:flex-row sm:items-center sm:justify-between">

                <p className="text-sm text-stone-500">
                    © {new Date().getFullYear()}{" "}
                    <span className="text-stone-300">
                        {user?.name || "Portfolio"}
                    </span>
                </p>

                {user?.username && (
                    <p className="text-sm text-stone-600">
                        @{user.username}
                    </p>
                )}

            </div>

        </footer>
    );
}

export default PortfolioFooter;