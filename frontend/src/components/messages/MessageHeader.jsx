function MessageHeader() {
    return (
        <div className="mb-8">
            <p className="text-sm font-semibold uppercase tracking-widest text-blue-600">
                Inbox
            </p>

            <h1 className="mt-2 text-3xl font-bold text-gray-900">
                Messages
            </h1>

            <p className="mt-2 text-sm text-gray-500">
                Messages received from visitors.
            </p>
        </div>
    );
}

export default MessageHeader;