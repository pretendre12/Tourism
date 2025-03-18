import { useState } from "react";

const ExamplePage = () => {
  const [count, setCount] = useState(0);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-6">
      {/* Header Section */}
      <header className="w-full max-w-3xl text-center">
        <h1 className="text-4xl font-bold text-blue-400">🌍 Explore Bukidnon</h1>
        <p className="text-gray-300 mt-2">Discover the beauty of nature and adventure!</p>
      </header>

      {/* Image Section */}
      <div className="mt-6">
        <img
          src="https://source.unsplash.com/800x400/?mountains,forest"
          alt="Scenic View"
          className="rounded-xl shadow-lg w-full max-w-2xl"
        />
      </div>

      {/* Interactive Counter */}
      <div className="mt-6 flex flex-col items-center">
        <p className="text-lg text-gray-300">Click the button to explore more:</p>
        <button
          className="mt-4 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition-all"
          onClick={() => setCount(count + 1)}
        >
          Clicked {count} times
        </button>
      </div>
    </div>
  );
};

export default ExamplePage;
