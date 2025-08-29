import React, { useState } from "react";
import Header from "../components/Layouts/Header";
import Footer from "../components/Layouts/Footer";
const Events = () => {
  const event = {
    title: "Grand Community Festival",
    date: "August 15, 2024",
    time: "10:00 AM - 6:00 PM",
    location: "Central Park, Downtown City",
    progress: 75,
    imageUrl:
      "https://img.freepik.com/premium-photo/cartoon-illustration-street-fair-festival-with-people-tents_36682-221255.jpg?w=2000",
  };

  const [activeTab, setActiveTab] = useState("Overview");

  return (
    <>
    <Header />
    <div className="bg-gray-50 min-h-screen py-18 font-[Manrope]">
      <div className="w-full max-w-7xl px-4 sm:px-6 lg:px-8 mx-auto">
        
        {/* Event Title + Buttons */}
        <div className="flex justify-between items-center mb-4 flex-wrap">
          <div className="text-left">
            <h1 className="font-[Manrope] font-bold text-[20px] pb-3">{event.title}</h1>
            <p className="text-gray-500 text-sm sm:text-base">
              {event.date} | {event.time} | {event.location}
            </p>
          </div>
          <div className="flex space-x-2 mt-2 sm:mt-0 flex-wrap">
            <button className="px-4 py-2 bg-indigo-100 text-black rounded-full text-sm font-medium">
              All Events
            </button>
            <button className="px-4 py-2 bg-green-100 text-green-600 rounded-full text-sm font-medium">
              🏅 Reward Badges
            </button>
          </div>
        </div>

        {/* Event Image */}
        <div className="mb-4 pb-3">
          <img
            src={event.imageUrl}
            alt={event.title}
            className="w-full h-64 sm:h-72 md:h-80 lg:h-96 object-cover rounded-xl shadow-lg"
          />
        </div>

        {/* Tabs */}
        <div className="flex space-x-4 sm:space-x-10 border-b border-gray-200 mb-4 overflow-x-auto">
          {["Overview", "Schedule", "Participants", "Tasks", "Resources", "Polls/RSVP"].map(
            (tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-2 font-[Manrope] font-medium text-[16px] flex-shrink-0 ${
                  activeTab === tab
                    ? "text-purple-500 border-b-2 border-purple-500"
                    : "text-gray-600 hover:text-purple-500"
                }`}
              >
                {tab}
              </button>
            )
          )}
        </div>

        {/* Tab Content */}
        {activeTab === "Overview" && (
          <>
            <div className="bg-indigo-50 p-4 rounded-lg mb-4 text-left">
              <h2 className="font-semibold pb-4 text-gray-800">{event.title}</h2>
              <div className="flex items-center gap-2 text-gray-700 mb-2 flex-wrap">
                <span className="h-5 w-5 text-gray-700">📅</span>
                {event.date} | {event.time}
              </div>
              <div className="flex items-center gap-2 text-gray-700 mb-2 flex-wrap">
                <span className="h-5 w-5 text-gray-700">📍</span>
                {event.location}
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mb-4 text-left">
              <p className="text-gray-700 mb-2 font-medium">Event Progress ({event.progress}%)</p>
              <div className="w-full bg-gray-200 h-3 rounded-full">
                <div
                  className="bg-teal-500 h-3 rounded-full transition-all duration-500"
                  style={{ width: `${event.progress}%` }}
                ></div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-4 mb-6 flex-wrap gap-y-4">
              <button className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 flex-1 min-w-[120px] text-center">
                Edit Event
              </button>
              <button className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 flex-1 min-w-[120px] text-center">
                Invite Participants
              </button>
              <button className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 flex-1 min-w-[120px] text-center">
                Manage Tasks
              </button>
            </div>
          </>
        )}

        {activeTab === "Schedule" && (
          <div className="bg-yellow-50 p-4 rounded-lg text-gray-700">📅 Schedule details will go here...</div>
        )}

        {activeTab === "Participants" && (
          <div className="bg-green-50 p-4 rounded-lg text-gray-700">👥 Participants list will go here...</div>
        )}

        {activeTab === "Tasks" && (
          <div className="bg-blue-50 p-4 rounded-lg text-gray-700">✅ Task management goes here...</div>
        )}

        {activeTab === "Resources" && (
          <div className="bg-pink-50 p-4 rounded-lg text-gray-700">📂 Resources section goes here...</div>
        )}

        {activeTab === "Polls/RSVP" && (
          <div className="bg-purple-50 p-4 rounded-lg text-gray-700">🗳️ Polls / RSVP section goes here...</div>
        )}

        {/* Comments Section */}
        <div className="bg-neutral-100 p-4 rounded-lg shadow text-left mt-6">
          <h3 className="font-semibold mb-2 text-gray-800">Comments & Discussions</h3>
          <p className="text-gray-500">Feel Free to share your thoughts here...Discuss anything</p>
        </div>
      </div>
    </div>
    <Footer />
    </>
  );
};

export default Events;