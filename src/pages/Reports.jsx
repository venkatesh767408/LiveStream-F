import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import Header from "../components/Layouts/Header";
import Footer from "../components/Layouts/Footer";

const Reports = () => {
  // ✅ Dummy Data
  const dashboardData = {
    matchesPlayed: 25,
    wins: 18,
    losses: 7,
    avgScore: 3.5,
    attendanceRate: "85%",
    aiSummary:
      "This report highlights significant trends in team performance and expense management. Key victories and optimal spending patterns are evident, with opportunities for further debt simplification and improved attendance.",
    performanceTrend: [
      { month: "Jan", value: 4500 },
      { month: "Feb", value: 3000 },
      { month: "Mar", value: 2500 },
      { month: "Apr", value: 3200 },
      { month: "May", value: 2900 },
      { month: "Jun", value: 4000 },
      { month: "Jul", value: 4200 },
      { month: "Aug", value: 4600 },
      { month: "Sep", value: 4300 },
    ],
    leaderboard: [
      { rank: 1, name: "Alice Smith", score: 150, status: "Healthy" },
      { rank: 2, name: "Bob Johnson", score: 145, status: "Injured" },
      { rank: 3, name: "Charlie Brown", score: 130, status: "Available" },
      { rank: 4, name: "Diana Prince", score: 128, status: "Healthy" },
      { rank: 5, name: "Eve Adams", score: 120, status: "Available" },
    ],
    matches: [
      {
        match: "Match 1",
        opponent: "Eagles",
        result: "Win",
        score: "3-1",
        date: "2023-10-26",
      },
      {
        match: "Match 2",
        opponent: "Wolves",
        result: "Loss",
        score: "1-2",
        date: "2023-10-29",
      },
      {
        match: "Match 3",
        opponent: "Sharks",
        result: "Win",
        score: "4-0",
        date: "2023-11-03",
      },
      {
        match: "Match 4",
        opponent: "Bears",
        result: "Draw",
        score: "2-2",
        date: "2023-11-06",
      },
      {
        match: "Match 5",
        opponent: "Lions",
        result: "Win",
        score: "2-1",
        date: "2023-11-10",
      },
    ],
    playerStats: [
      {
        name: "Alice Smith",
        position: "Forward",
        stats: "15 Goals, 5 Assists",
      },
      {
        name: "Bob Johnson",
        position: "Midfielder",
        stats: "12 Goals, 7 Assists",
      },
      {
        name: "Charlie Brown",
        position: "Defender",
        stats: "10 Goals, 4 Assists",
      },
      {
        name: "Diana Prince",
        position: "Midfielder",
        stats: "8 Goals, 9 Assists",
      },
      { name: "Eve Adams", position: "Defender", stats: "5 Goals, 12 Assists" },
    ],
  };

  return (
    <>
      <Header />
      <div className="p-6 min-h-screen bg-gray-50 pt-16">
        {/* Header */}
        <h1 className="text-2xl font-bold mb-6">Sports Performance Overview</h1>

        {/* Top Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-4 rounded-xl shadow">
            <p className="text-sm text-gray-500">Matches Played</p>
            <h2 className="text-xl font-semibold">
              {dashboardData.matchesPlayed}
            </h2>
          </div>
          <div className="bg-white p-4 rounded-xl shadow">
            <p className="text-sm text-gray-500">Wins/Losses</p>
            <h2 className="text-xl font-semibold">
              {dashboardData.wins}-{dashboardData.losses}
            </h2>
          </div>
          <div className="bg-white p-4 rounded-xl shadow">
            <p className="text-sm text-gray-500">Avg. Score</p>
            <h2 className="text-xl font-semibold">{dashboardData.avgScore}</h2>
          </div>
          <div className="bg-white p-4 rounded-xl shadow">
            <p className="text-sm text-gray-500">Attendance Rate</p>
            <h2 className="text-xl font-semibold">
              {dashboardData.attendanceRate}
            </h2>
          </div>
        </div>

        {/* AI Summary */}
        <div className="bg-green-50 p-4 rounded-xl mb-6 text-gray-700">
          <h3 className="font-semibold mb-2">AI Summary</h3>
          <p className="text-sm">{dashboardData.aiSummary}</p>
        </div>

        {/* Performance Chart & Leaderboard */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Chart */}
          <div className="bg-white p-4 rounded-xl shadow">
            <h3 className="font-semibold mb-4">Team Performance Trend</h3>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={dashboardData.performanceTrend}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#22c55e"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Leaderboard */}
          <div className="bg-white p-4 rounded-xl shadow">
            <h3 className="font-semibold mb-4">Player Leaderboard</h3>
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-100 text-gray-700 text-left">
                  <th className="px-4 py-2 font-semibold">Rank</th>
                  <th className="px-4 py-2 font-semibold">Name</th>
                  <th className="px-4 py-2 font-semibold">Score</th>
                  <th className="px-4 py-2 font-semibold sm:pl-8">Status</th>
                </tr>
              </thead>
              <tbody>
                {dashboardData.leaderboard.map((p) => (
                  <tr
                    key={p.rank}
                    className="border-t hover:bg-gray-50 transition"
                  >
                    <td className="px-4 py-2">{p.rank}</td>
                    <td className="px-4 py-2 font-medium">{p.name}</td>
                    <td className="px-4 py-2">{p.score}</td>
                    <td className="px-4 py-2 pl-2 sm:pl-10">
                      <span
                        className={`inline-flex items-center justify-center px-3 py-1 rounded-full text-xs sm:text-sm md:text-base font-medium whitespace-nowrap 
    pl-2 sm:pl-0
    ${
      p.status === "Healthy"
        ? "bg-green-100 text-green-700"
        : p.status === "Injured"
        ? "bg-red-100 text-red-700"
        : "bg-blue-100 text-blue-700"
    }`}
                      >
                        {p.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Match Summary & Player Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Match Summary */}
          <div className="bg-white p-4 rounded-xl shadow">
            <h3 className="font-semibold mb-4">Match Summary</h3>
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-gray-500">
                  <th>Match</th>
                  <th>Opponent</th>
                  <th>Result</th>
                  <th>Score</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {dashboardData.matches.map((m, i) => (
                  <tr key={i} className="border-t">
                    <td>{m.match}</td>
                    <td>{m.opponent}</td>
                    <td>{m.result}</td>
                    <td>{m.score}</td>
                    <td>{m.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Player Stats */}
          <div className="bg-white p-4 rounded-xl shadow">
            <h3 className="font-semibold mb-4">Player Stats</h3>
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-gray-500">
                  <th>Player</th>
                  <th>Position</th>
                  <th>Stats</th>
                </tr>
              </thead>
              <tbody>
                {dashboardData.playerStats.map((p, i) => (
                  <tr key={i} className="border-t">
                    <td>{p.name}</td>
                    <td>{p.position}</td>
                    <td>{p.stats}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Highlight Reel */}
        <div className="bg-white p-4 rounded-xl shadow">
          <h3 className="font-semibold mb-4">Highlight Reel Preview</h3>
          <div className="w-full h-48 bg-gray-200 flex items-center justify-center rounded-lg">
            <p className="text-gray-500">
              Video Placeholder: Dynamic Sports Highlights
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Reports;
