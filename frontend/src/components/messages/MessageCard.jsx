function MessageCard({
    message,
    onDelete
}) {
    function handleDelete() {
        const confirmed = window.confirm(
            "Are you sure you want to delete this message?"
        );

        if (confirmed) {
            onDelete(message.id);
        }
    }

    function formatDate(date) {
        return new Date(date).toLocaleDateString(
            "en-US",
            {
                month: "short",
                day: "numeric",
                year: "numeric"
            }
        );
    }

    return (
        <article className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:shadow-md">

            <div className="flex flex-col justify-between gap-4 sm:flex-row">

                <div>
                    <h2 className="text-lg font-semibold text-gray-900">
                        {message.name}
                    </h2>

                    <a
                        href={`mailto:${message.email}`}
                        className="mt-1 block text-sm text-blue-600 hover:underline"
                    >
                        {message.email}
                    </a>
                </div>

                <p className="text-sm text-gray-400">
                    {formatDate(message.created_at)}
                </p>

            </div>


            <div className="mt-5 rounded-xl bg-gray-50 p-4">
                <p className="whitespace-pre-wrap text-sm leading-7 text-gray-700">
                    {message.message}
                </p>
            </div>


            <div className="mt-5 flex justify-end border-t border-gray-100 pt-4">

                <button
                    type="button"
                    onClick={handleDelete}
                    className="rounded-xl bg-red-50 px-4 py-2 text-sm font-medium text-red-600 transition hover:bg-red-100"
                >
                    Delete
                </button>

            </div>

        </article>
    );
}

export default MessageCard;