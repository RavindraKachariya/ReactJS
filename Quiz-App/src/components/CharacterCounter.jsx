import { useState } from "react";

const CharacterCounter = () => {
    const [text, setText] = useState("");
    const maxLength = 100;

    return (
        <div className="min-h-screen flex justify-center items-center bg-gray-100">
            <div className="bg-white p-6 rounded-xl shadow-lg w-96">
                <h2 className="text-2xl font-bold mb-4">Character Counter</h2>

                <textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    maxLength={maxLength}
                    placeholder="Type something..."
                    className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows="4"
                />

                <p className="mt-2 text-gray-600 text-right">
                    {text.length} / {maxLength} characters
                </p>
            </div>
        </div>
    );
};

export default CharacterCounter;
