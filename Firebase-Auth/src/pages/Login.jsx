import { useState } from "react";
import { auth, googleProvider } from "../config/firebase";
import {
    signInWithEmailAndPassword,
    signInWithPopup
} from "firebase/auth";

const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (e) => {

        e.preventDefault();

        try {

            await signInWithEmailAndPassword(auth, email, password);
            alert("Login Successful");

        } catch (error) {
            alert(error.message);
        }

    };

    const handleGoogleLogin = async () => {

        try {

            await signInWithPopup(auth, googleProvider);

        } catch (error) {
            alert(error.message);
        }

    };

    return (
        <div className="flex justify-center items-center h-screen">

            <form
                onSubmit={handleLogin}
                className="bg-white p-6 rounded shadow w-80"
            >

                <h2 className="text-2xl mb-4">Login</h2>

                <input
                    type="email"
                    placeholder="Email"
                    className="border w-full p-2 mb-3"
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="Password"
                    className="border w-full p-2 mb-3"
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button className="bg-blue-500 text-white w-full p-2 mb-3">
                    Login
                </button>

                <button
                    type="button"
                    onClick={handleGoogleLogin}
                    className="bg-red-500 text-white w-full p-2"
                >
                    Login with Google
                </button>

            </form>

        </div>
    );
};

export default Login;