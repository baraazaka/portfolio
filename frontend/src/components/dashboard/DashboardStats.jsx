function DashboardStats({ stats, loading }) {
    const cards = [
        {
            title: "Total Projects",
            value: stats?.projectsCount ?? 0,
        },
        {
            title: "Total Skills",
            value: stats?.skillsCount ?? 0,
        },
        {
            title: "Experience",
            value: stats?.experiencesCount ?? 0,
        },
        {
            title: "Messages",
            value: stats?.messagesCount ?? 0,
        },
    ];

    return (
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {cards.map((card) => (
                <div
                    key={card.title}
                    className="rounded-xl border border-gray-200 bg-white p-5"
                >
                    <p className="text-sm font-medium text-gray-500">
                        {card.title}
                    </p>

                    <p className="mt-3 text-3xl font-bold text-gray-900">
                        {loading ? "..." : card.value}
                    </p>
                </div>
            ))}
        </div>
    );
}

export default DashboardStats;