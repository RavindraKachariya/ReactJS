import { useState } from "react";

const ModalPopup = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            {/* Open Modal Button */}
            <button
                onClick={() => setIsOpen(true)}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
            >
                Open Modal
            </button>

            {/* Modal */}
            {isOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-xl w-96 shadow-lg">
                        <h2 className="text-2xl font-bold mb-4">Modal Title</h2>
                        <p className="text-gray-600 mb-6">
                            This is a modal popup using click events.
                        </p>

                        <button
                            onClick={() => setIsOpen(false)}
                            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ModalPopup;
