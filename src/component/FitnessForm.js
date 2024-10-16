import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import FitnessContext from "../contextapi/FitnessProvider"; // Ensure this is the correct path
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function FitnessForm() {
  const navigate = useNavigate();
  const { addWorkoutEntry } = useContext(FitnessContext);

  // State variables for form fields
  const [workoutType, setWorkoutType] = useState("");
  const [duration, setDuration] = useState("");
  const [calories, setCalories] = useState("");
  const [date, setDate] = useState("");
  const [notes, setNotes] = useState("");
  const [weeklyGoals, setWeeklyGoals] = useState("");
  const [progress, setProgress] = useState("");
  const [monthlyGoals, setMonthlyGoals] = useState("");
  const [weight, setWeight] = useState(""); 
  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    if (
      !workoutType ||
      !duration ||
      !calories ||
      !date ||
      !weeklyGoals ||
      !progress ||
      !monthlyGoals ||
      !weight 
    ) {
      setError("Please fill in all fields correctly.");
      toast.error("Please fill in all fields correctly.");
      return;
    }

    setError("");

    const newWorkoutEntry = {
      workoutType,
      duration: Number(duration),
      calories: Number(calories),
      date,
      notes,
      weeklyGoals,
      progress,
      monthlyGoals,
      weight: Number(weight),
    };

    addWorkoutEntry(newWorkoutEntry);
    toast.success("Workout entry created successfully!");
    resetForm();
    navigate("/"); 
  };

  const resetForm = () => {
    setWorkoutType("");
    setDuration("");
    setCalories("");
    setDate("");
    setNotes("");
    setWeeklyGoals("");
    setProgress("");
    setMonthlyGoals("");
    setWeight(""); 
    setError("");
  };

  return (
    <div className="max-w-xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">
        Create a New Workout Entry
      </h1>
      <form onSubmit={handleSubmit}>
        {error && <div className="mb-4 text-red-600">{error}</div>}

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Workout Type:</label>
          <input
            type="text"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            value={workoutType}
            onChange={(e) => setWorkoutType(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Weight (in kg):</label>
          <input
            type="number"
            min="0"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Duration (in minutes):</label>
          <input
            type="number"
            min="0"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Calories Burned:</label>
          <input
            type="number"
            min="0"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            value={calories}
            onChange={(e) => setCalories(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Date:</label>
          <input
            type="date"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Weekly Goals:</label>
          <textarea
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            value={weeklyGoals}
            onChange={(e) => setWeeklyGoals(e.target.value)}
            placeholder="Enter your weekly fitness goals"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Monthly Goals:</label>
          <textarea
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            value={monthlyGoals}
            onChange={(e) => setMonthlyGoals(e.target.value)}
            placeholder="Enter your monthly fitness goals"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Progress:</label>
          <textarea
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            value={progress}
            onChange={(e) => setProgress(e.target.value)}
            placeholder="Track your progress (e.g., weight, distance, etc.)"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Notes:</label>
          <textarea
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Add any notes for this workout"
          />
        </div>

        <button
          type="submit"
          className="w-full p-2 bg-blue-600 text-white font-bold rounded-md hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300"
        >
          Submit
        </button>
      </form>
      <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
    </div>
  );
}
