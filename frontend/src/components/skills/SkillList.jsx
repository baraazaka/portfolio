import SkillCard from "./SkillCard";

function SkillList({
    skills,
    onEdit,
    onDelete
}) {
    if (skills.length === 0) {
        return (
            <div className="rounded-2xl border border-gray-200 bg-white p-10 text-center">
                <h2 className="text-lg font-semibold text-gray-900">
                    No skills yet
                </h2>

                <p className="mt-2 text-sm text-gray-500">
                    Add your first skill to get started.
                </p>
            </div>
        );
    }

    return (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

            {skills.map((skill) => (
                <SkillCard
                    key={skill.id}
                    skill={skill}
                    onEdit={onEdit}
                    onDelete={onDelete}
                />
            ))}

        </div>
    );
}

export default SkillList;