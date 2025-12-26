import { useState } from "react";

const App = () => {
  const [num, setNum] = useState(0);

  const increaseNum = () => {
    setNum(num + 1);
  };

  const decreaseNum = () => {
    if (num > 0) {
      setNum(num - 1);
    } else {
      alert("Number cannot be less than 0");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 to-purple-600">
      <div className="bg-white p-8 rounded-2xl shadow-2xl text-center w-80">

        <h1 className="text-6xl font-bold text-gray-800 mb-6">
          {num}
        </h1>

        <div className="flex gap-4">
          <button
            onClick={increaseNum}
            className="flex-1 py-3 rounded-xl bg-green-500 text-white font-semibold hover:bg-green-600 transition-all duration-300 active:scale-95"
          >
            Increase
          </button>

          <button
            onClick={decreaseNum}
            className="flex-1 py-3 rounded-xl bg-red-500 text-white font-semibold hover:bg-red-600 transition-all duration-300 active:scale-95"
          >
            Decrease
          </button>
        </div>

      </div>
    </div>
  );
};

export default App;
