import React, { useContext } from "react";
import FitnessContext from "../contextapi/FitnessProvider";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,  
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function Dashboard() {
  const { workoutEntries } = useContext(FitnessContext);

  const getWeeklyMonthlyData = () => {
    const weeklyData = {};
    const monthlyData = {};

    workoutEntries.forEach((entry) => {
      const date = new Date(entry.date);
      const weekNumber = getWeekNumber(date);
      const month = date.toLocaleString("default", { month: "long" });

      if (!weeklyData[weekNumber]) {
        weeklyData[weekNumber] = { calories: 0, workouts: 0 };
      }
      weeklyData[weekNumber].calories += entry.calories;
      weeklyData[weekNumber].workouts += 1;

      if (!monthlyData[month]) {
        monthlyData[month] = { calories: 0, workouts: 0 };
      }
      monthlyData[month].calories += entry.calories;
      monthlyData[month].workouts += 1;
    });

    return { weeklyData, monthlyData };
  };

  const getWeekNumber = (date) => {
    const startDate = new Date(date.getFullYear(), 0, 1);
    const weekNumber =
      Math.ceil(
        (date - startDate) / 1000 / 60 / 60 / 24 + startDate.getDay() + 1
      ) / 7;
    return weekNumber;
  };

  const { weeklyData, monthlyData } = getWeeklyMonthlyData();

  const chartData = {
    labels: Object.keys(weeklyData),
    datasets: [
      {
        label: "Weekly Calories Burned",
        data: Object.values(weeklyData).map((data) => data.calories),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
      {
        label: "Weekly Workouts",
        data: Object.values(weeklyData).map((data) => data.workouts),
        backgroundColor: "rgba(153, 102, 255, 0.6)",
      },
      {
        label: "Monthly Calories Burned",
        data: Object.values(monthlyData).map((data) => data.calories),
        backgroundColor: "rgba(255, 99, 132, 0.6)",
      },
      {
        label: "Monthly Workouts",
        data: Object.values(monthlyData).map((data) => data.workouts),
        backgroundColor: "rgba(255, 205, 86, 0.6)",
      },
    ],
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="max-w-4xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4 text-gray-800">
          Workout Dashboard
        </h1>

        {workoutEntries.length === 0 ? (
          <p className="text-gray-600">No workout entries found.</p>
        ) : (
          <>
            <div>
              <Bar data={chartData} options={{ responsive: true }} />
            </div>
          </>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {workoutEntries.map((entry, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-lg p-6 flex flex-col"
          >
            <h2 className="font-bold text-xl text-gray-800 mb-2">
              {entry.workoutType}
            </h2>
            <div className="flex-grow">
              <p className="text-gray-700">
                <span className="font-semibold">Weight:</span> {entry.weight} kg
              </p>
              <p className="text-gray-700">
                <span className="font-semibold">Duration:</span> {entry.duration} min
              </p>
              <p className="text-gray-700">
                <span className="font-semibold">Calories Burned:</span> {entry.calories}
              </p>
              <p className="text-gray-700">
                <span className="font-semibold">Date:</span> {entry.date}
              </p>
              <p className="text-gray-700">
                <span className="font-semibold">Weekly Goals:</span> {entry.weeklyGoals}
              </p>
              <p className="text-gray-700">
                <span className="font-semibold">Progress:</span> {entry.progress}
              </p>
              <p className="text-gray-700">
                <span className="font-semibold">Monthly Goals:</span> {entry.monthlyGoals}
              </p>
              <p className="text-gray-700">
                <span className="font-semibold">Notes:</span> {entry.notes}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
