import { useAuth } from "../context/AuthContext";

const Profile = () => {

    const { user } = useAuth();

    if (!user) {
        return (
            <h1 className="text-center mt-10 text-xl">
                Please Login First
            </h1>
        );
    }

    return (
        <div className="flex justify-center mt-10">

            <div className="bg-white shadow p-6 rounded">

                <h2 className="text-2xl mb-4">User Profile</h2>

                <p><b>Email:</b> {user.email}</p>

                {user.photoURL && (
                    <img
                        src={user.photoURL}
                        className="w-20 rounded-full mt-4"
                    />
                )}

            </div>

        </div>
    );
};

export default Profile;