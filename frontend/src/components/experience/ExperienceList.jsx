import ExperienceCard from "./ExperienceCard";

function ExperienceList({
    experiences,
    onEdit,
    onDelete
}) {
    if (experiences.length === 0) {
        return (
            <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-12 text-center">

                <h2 className="text-lg font-semibold text-gray-900">
                    No experience yet
                </h2>

                <p className="mt-2 text-sm text-gray-500">
                    Add your first professional experience.
                </p>

            </div>
        );
    }

    return (
        <div className="space-y-5">

            {experiences.map((experience) => (
                <ExperienceCard
                    key={experience.id}
                    experience={experience}
                    onEdit={onEdit}
                    onDelete={onDelete}
                />
            ))}

        </div>
    );
}

export default ExperienceList;