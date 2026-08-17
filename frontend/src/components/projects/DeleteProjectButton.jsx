function DeleteProjectButton({ onDelete }) {
    function handleClick() {
        const confirmed = window.confirm(
            "Are you sure you want to delete this project?"
        );

        if (confirmed) {
            onDelete();
        }
    }

    return (
        <button
            type="button"
            onClick={handleClick}
            className="rounded-lg border border-red-200 px-4 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50"
        >
            Delete
        </button>
    );
}

export default DeleteProjectButton;