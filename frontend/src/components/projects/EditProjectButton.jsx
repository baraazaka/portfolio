function EditProjectButton({ onEdit }) {
    return (
        <button
            type="button"
            onClick={onEdit}
            className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
        >
            Edit
        </button>
    );
}

export default EditProjectButton;