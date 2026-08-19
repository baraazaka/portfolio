import ProfileSettings from "../components/dashboard/ProfileSettings";

function Profile() {
    return (
        <div className="p-6 md:p-10">

            <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-950">
                    Profile
                </h1>

                <p className="mt-1 text-sm text-gray-500">
                    Manage your profile information.
                </p>
            </div>

            <ProfileSettings />

        </div>
    );
}

export default Profile;