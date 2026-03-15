import { useState } from "react";
import { auth } from "../config/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

const Register = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleRegister = async (e) => {

        e.preventDefault();

        try {

            await createUserWithEmailAndPassword(auth, email, password);
            alert("Account Created");

        } catch (error) {
            alert(error.message);
        }

    };

    return (
        <div className="flex justify-center items-center h-screen">

            <form
                onSubmit={handleRegister}
                className="bg-white p-6 rounded shadow w-80"
            >

                <h2 className="text-2xl mb-4">Register</h2>

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

                <button className="bg-blue-500 text-white w-full p-2">
                    Register
                </button>

            </form>

        </div>
    );
};

export default Register;