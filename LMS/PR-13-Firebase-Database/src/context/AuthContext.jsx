import { createContext, useContext, useState, useEffect } from "react";
import { auth, googleProvider } from "../firebase/config";
import {
    signInWithPopup,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
    onAuthStateChanged
} from "firebase/auth";
import { toast } from "react-toastify";

export const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    const loginWithGoogle = async () => {
        try {
            const result = await signInWithPopup(auth, googleProvider);
            toast.success(`Welcome, ${result.user.displayName}!`);
            return result.user;
        } catch (error) {
            console.error("Error signing in:", error);
            toast.error("Failed to sign in");
            throw error;
        }
    };

    const loginWithEmail = async (email, password) => {
        try {
            const result = await signInWithEmailAndPassword(auth, email, password);
            toast.success("Welcome back!");
            return result.user;
        } catch (error) {
            console.error("Error signing in:", error);
            toast.error("Invalid email or password");
            throw error;
        }
    };

    const registerWithEmail = async (email, password) => {
        try {
            const result = await createUserWithEmailAndPassword(auth, email, password);
            toast.success("Account created successfully!");
            return result.user;
        } catch (error) {
            console.error("Error registering:", error);
            toast.error("Failed to create account");
            throw error;
        }
    };

    const logout = async () => {
        try {
            await signOut(auth);
            toast.info("Logged out");
        } catch (error) {
            console.error("Error signing out:", error);
            toast.error("Failed to sign out");
        }
    };

    const value = {
        user,
        loading,
        loginWithGoogle,
        loginWithEmail,
        registerWithEmail,
        logout
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export default AuthContextProvider;
export { AuthContextProvider as AuthProvider };
