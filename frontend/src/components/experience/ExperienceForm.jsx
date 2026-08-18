import { useEffect, useState } from "react";

function ExperienceForm({
    experience,
    onCancel,
    onSubmit,
    submitting
}) {
    const [company, setCompany] = useState("");
    const [position, setPosition] = useState("");
    const [description, setDescription] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    useEffect(() => {
        if (experience) {
            setCompany(experience.company || "");
            setPosition(experience.position || "");
            setDescription(experience.description || "");

            setStartDate(
                experience.start_date
                    ? experience.start_date.slice(0, 10)
                    : ""
            );

            setEndDate(
                experience.end_date
                    ? experience.end_date.slice(0, 10)
                    : ""
            );

        } else {
            setCompany("");
            setPosition("");
            setDescription("");
            setStartDate("");
            setEndDate("");
        }
    }, [experience]);


    function handleSubmit(e) {
        e.preventDefault();

       onSubmit({
    company,
    postion: position,
    description,
    start_date: startDate,
    end_date: endDate || null
});
    }


    const isEditing = Boolean(experience);


    return (
        <form
            onSubmit={handleSubmit}
            className="mb-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
        >

            <h2 className="text-xl font-semibold text-gray-900">
                {isEditing
                    ? "Edit Experience"
                    : "Add Experience"}
            </h2>


            <div className="mt-6 grid gap-5 md:grid-cols-2">

                <div>
                    <label className="text-sm font-medium text-gray-700">
                        Company
                    </label>

                    <input
                        type="text"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        required
                        className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-black"
                        placeholder="Company name"
                    />
                </div>


                <div>
                    <label className="text-sm font-medium text-gray-700">
                        Position
                    </label>

                    <input
                        type="text"
                        value={position}
                        onChange={(e) => setPosition(e.target.value)}
                        required
                        className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-black"
                        placeholder="e.g. Full Stack Developer"
                    />
                </div>


                <div>
                    <label className="text-sm font-medium text-gray-700">
                        Start Date
                    </label>

                    <input
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        required
                        className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-black"
                    />
                </div>


                <div>
                    <label className="text-sm font-medium text-gray-700">
                        End Date
                    </label>

                    <input
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-black"
                    />

                    <p className="mt-1 text-xs text-gray-400">
                        Leave empty if this is your current position.
                    </p>
                </div>


                <div className="md:col-span-2">
                    <label className="text-sm font-medium text-gray-700">
                        Description
                    </label>

                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        rows="5"
                        className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-black"
                        placeholder="Describe your responsibilities and achievements..."
                    />
                </div>

            </div>


            <div className="mt-6 flex gap-3">

                <button
                    type="submit"
                    disabled={submitting}
                    className="rounded-xl bg-black px-5 py-3 text-sm font-medium text-white hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
                >
                    {submitting
                        ? "Saving..."
                        : isEditing
                            ? "Save Changes"
                            : "Add Experience"}
                </button>


                <button
                    type="button"
                    onClick={onCancel}
                    className="rounded-xl border border-gray-300 px-5 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                    Cancel
                </button>

            </div>

        </form>
    );
}

export default ExperienceForm;