import { useState } from "react";

export default function Feedback() {
  const [feedback, setFeedback] = useState("");
  const [rating, setRating] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Feedback Submitted:", { feedback, rating });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-sm">
        <div className="relative rounded-2xl bg-white p-6 shadow">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">
              Leave feedback
            </h2>
            <button className="absolute right-5 top-5 text-gray-400 hover:text-gray-600">
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            </button>
          </div>
          <p className="mb-4 text-center text-sm">
            We'd love to hear what went well or how we can improve the product
            experience.
          </p>

          <div>
            <label className="text-lg font-medium">Full Name:</label>
            <input
              type="text"
              name="fullName"
              placeholder="Enter your full name"
              className="w-full p-1 border rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500"
              required
            />
          </div>
          <textarea
            className="mb-3 w-full rounded-lg border border-gray-200 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="4"
            placeholder="Your feedback..."
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
          ></textarea>

          <button
            onClick={handleSubmit}
            className="w-full rounded-lg bg-gray-900 py-2.5 text-sm font-medium text-white transition duration-300 hover:bg-gray-800"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
