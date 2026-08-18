import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";

function NotificationBell() {
    const [notifications, setNotifications] = useState([]);
    const [isOpen, setIsOpen] = useState(false);

    async function loadNotifications() {
        try {
            const response = await api.get(
                "/messages/unread"
            );

            setNotifications(response.data);
        } catch (error) {
            console.error(
                "Notifications error:",
                error
            );
        }
    }

    useEffect(() => {
        loadNotifications();

        const interval = setInterval(
            loadNotifications,
            30000
        );

        return () => clearInterval(interval);
    }, []);


    async function handleNotificationClick(id) {
        try {
            await api.patch(
                `/messages/${id}/read`
            );

            setNotifications((current) =>
                current.filter(
                    (notification) =>
                        notification.id !== id
                )
            );

            setIsOpen(false);

            window.location.href =
                "/dashboard/messages";

        } catch (error) {
            console.error(
                "Read notification error:",
                error
            );
        }
    }


    return (
        <div className="relative">

            {/* Bell */}
            <button
                type="button"
                onClick={() =>
                    setIsOpen((current) => !current)
                }
                className="relative flex h-11 w-11 items-center justify-center rounded-full border border-gray-200 bg-white text-lg transition hover:bg-gray-50"
                aria-label="Notifications"
            >
                🔔

                {notifications.length > 0 && (
                    <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold text-white">
                        {notifications.length > 99
                            ? "99+"
                            : notifications.length}
                    </span>
                )}
            </button>


            {/* Dropdown */}
            {isOpen && (
                <div className="absolute right-0 top-14 z-50 w-80 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-xl">

                    <div className="border-b border-gray-100 px-5 py-4">

                        <h3 className="font-semibold text-gray-900">
                            Notifications
                        </h3>

                        <p className="mt-1 text-xs text-gray-500">
                            Your unread messages
                        </p>

                    </div>


                    <div className="max-h-96 overflow-y-auto">

                        {notifications.length === 0 ? (

                            <div className="px-5 py-8 text-center">

                                <p className="text-sm font-medium text-gray-900">
                                    No new notifications
                                </p>

                                <p className="mt-1 text-xs text-gray-500">
                                    You're all caught up.
                                </p>

                            </div>

                        ) : (

                            notifications.map(
                                (notification) => (
                                    <button
                                        key={
                                            notification.id
                                        }
                                        type="button"
                                        onClick={() =>
                                            handleNotificationClick(
                                                notification.id
                                            )
                                        }
                                        className="w-full border-b border-gray-100 px-5 py-4 text-left transition hover:bg-gray-50"
                                    >

                                        <div className="flex gap-3">

                                            <div className="mt-1 h-2 w-2 shrink-0 rounded-full bg-blue-500" />

                                            <div className="min-w-0">

                                                <p className="text-sm font-semibold text-gray-900">
                                                    New message from{" "}
                                                    {
                                                        notification.name
                                                    }
                                                </p>

                                                {notification.project_title && (
                                                    <p className="mt-1 text-xs font-medium text-gray-500">
                                                        {
                                                            notification.project_title
                                                        }
                                                    </p>
                                                )}

                                                <p className="mt-1 truncate text-xs text-gray-400">
                                                    {
                                                        notification.message
                                                    }
                                                </p>

                                            </div>

                                        </div>

                                    </button>
                                )
                            )

                        )}

                    </div>


                    {notifications.length > 0 && (
                        <div className="border-t border-gray-100 px-5 py-3">

                            <Link
                                to="/dashboard/messages"
                                onClick={() =>
                                    setIsOpen(false)
                                }
                                className="text-sm font-medium text-blue-600 hover:text-blue-700"
                            >
                                View all messages →
                            </Link>

                        </div>
                    )}

                </div>
            )}

        </div>
    );
}

export default NotificationBell;