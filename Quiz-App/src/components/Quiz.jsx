import { useState } from "react";
import questions from "./Questions";

const Quiz = () => {
    const [current, setCurrent] = useState(0);
    const [score, setScore] = useState(0);
    const [showResult, setShowResult] = useState(false);

    const handleOptionClick = (option) => {
        if (option === questions[current].answer) {
            setScore(score + 1);
        }

        if (current + 1 < questions.length) {
            setCurrent(current + 1);
        } else {
            setShowResult(true);
        }
    };

    const QuizRestart = () => {
        setCurrent(0);
        setScore(0);
        setShowResult(false);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-xl">

                {showResult ? (
                    <div className="text-center">
                        <h2 className="text-3xl font-bold mb-4 text-green-600">
                            Your Score
                        </h2>
                        <p className="text-xl mb-6">
                            {score} / {questions.length}
                        </p>
                        <button
                            onClick={QuizRestart}
                            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition"
                        >
                            Restart Quiz
                        </button>
                    </div>
                ) : (
                    <>
                        {/* Question */}
                        <h3 className="text-2xl font-semibold mb-6 text-gray-800">
                            {questions[current].question}
                        </h3>

                        {/* Options */}
                        <div className="grid grid-cols-1 gap-4">
                            {questions[current].options.map((opt, index) => (
                                <button
                                    key={index}
                                    onClick={() => handleOptionClick(opt)}
                                    className="border border-gray-300 px-4 py-2 rounded-lg hover:bg-blue-500 hover:text-white transition"
                                >
                                    {opt}
                                </button>
                            ))}
                        </div>

                        {/* Question Progress */}
                        <div className="mt-6 text-center text-gray-600 font-medium">
                            Question {current + 1} / {questions.length}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default Quiz;
