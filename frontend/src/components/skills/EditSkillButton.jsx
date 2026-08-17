function EditSkillButton({ onEdit }) {
    return (
        <button
            type="button"
            onClick={onEdit}
            className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100"
        >
            Edit
        </button>
    );
}

export default EditSkillButton;