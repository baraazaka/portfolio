import MessageCard from "./MessageCard";

function MessageList({
    messages,
    onDelete
}) {
    if (messages.length === 0) {
        return (
            <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-12 text-center">

                <h2 className="text-lg font-semibold text-gray-900">
                    No messages yet
                </h2>

                <p className="mt-2 text-sm text-gray-500">
                    Messages from your visitors will appear here.
                </p>

            </div>
        );
    }

    return (
        <div className="space-y-5">

            {messages.map((message) => (
                <MessageCard
                    key={message.id}
                    message={message}
                    onDelete={onDelete}
                />
            ))}

        </div>
    );
}

export default MessageList;