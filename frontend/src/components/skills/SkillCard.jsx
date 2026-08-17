import EditSkillButton from "./EditSkillButton";
import DeleteSkillButton from "./DeleteSkillButton";

function SkillCard({
    skill,
    onEdit,
    onDelete
}) {
    return (
        <div className="group rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">

            {/* Header */}
            <div className="flex items-center justify-between">

                <div>
                    <h2 className="text-lg font-semibold text-gray-900">
                        {skill.name}
                    </h2>

                    <p className="mt-1 text-sm text-gray-500">
                        {skill.category}
                    </p>
                </div>

                <div className="text-right">
                    <span className="text-2xl font-bold text-gray-900">
                        {skill.level}
                    </span>

                    <span className="ml-1 text-sm font-medium text-gray-400">
                        %
                    </span>
                </div>

            </div>


            {/* Progress */}
            <div className="mt-6">

                <div className="mb-2 flex items-center justify-between">
                    <span className="text-xs font-medium uppercase tracking-wider text-gray-400">
                        Proficiency
                    </span>

                    <span className="text-xs font-medium text-gray-500">
                        {skill.level >= 90
                            ? "Expert"
                            : skill.level >= 75
                                ? "Advanced"
                                : skill.level >= 50
                                    ? "Intermediate"
                                    : "Learning"}
                    </span>
                </div>

                <div className="h-2.5 w-full overflow-hidden rounded-full bg-gray-100">

                    <div
                        className="h-full rounded-full bg-black transition-all duration-700 ease-out"
                        style={{
                            width: `${Math.min(
                                Math.max(skill.level, 0),
                                100
                            )}%`
                        }}
                    />

                </div>

            </div>


            {/* Actions */}
            <div className="mt-6 flex gap-3 border-t border-gray-100 pt-4 opacity-70 transition group-hover:opacity-100">

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