import EditSkillButton from "./EditSkillButton";
import DeleteSkillButton from "./DeleteSkillButton";

function SkillCard({
    skill,
    onEdit,
    onDelete
}) {
    return (
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:shadow-md">

            {/* Header */}
            <div className="flex items-start justify-between gap-4">

                <div>
                    <h2 className="text-lg font-semibold text-gray-900">
                        {skill.name}
                    </h2>

                    <p className="mt-1 text-sm text-gray-500">
                        {skill.category}
                    </p>
                </div>

                {/* Level */}
                <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600">
                    {skill.level}
                </span>

            </div>


            {/* Actions */}
            <div className="mt-6 flex gap-3 border-t border-gray-100 pt-4">

                <EditSkillButton
                    onEdit={() => onEdit(skill)}
                />

                <DeleteSkillButton
                    onDelete={() => onDelete(skill.id)}
                />

            </div>

        </div>
    );
}

export default SkillCard;