import React, { useState } from "react";
import { Users, Calendar, Clock, MapPin, Search } from "lucide-react";
import "../../App.css";

// Dummy Events Data
const eventsData = [
  {
    id: 1,
    title: "Annual Team Building Retreat",
    type: "Event",
    organizer: "Marketing Titans",
    date: "September 15, 2025",
    time: "9:00 AM",
    location: "Mountain View Resort, Lake Tahoe",
    rsvp: "Attending",
  },
  {
    id: 2,
    title: "Q3 Project Kick-off Meeting",
    type: "Event",
    organizer: "Product Innovators",
    date: "October 1, 2025",
    time: "10:00 AM",
    location: "Virtual (Zoom)",
    rsvp: "Invited",
  },
  {
    id: 3,
    title: "Charity Fun Run",
    type: "Game",
    organizer: "Company Wide",
    date: "November 10, 2025",
    time: "8:00 AM",
    location: "Central Park, New York",
    rsvp: "Maybe",
  },
  {
    id: 4,
    title: "Holiday Gala Dinner",
    type: "Event",
    organizer: "Executive Board",
    date: "December 15, 2025",
    time: "7:00 PM",
    location: "Grand Ballroom, City Hotel",
    rsvp: "Attending",
  },
  {
    id: 5,
    title: "Soccer League Match",
    type: "Game",
    organizer: "HR Department",
    date: "October 20, 2025",
    time: "9:30 AM",
    location: "Office Conference Room A",
    rsvp: "Invited",
  },
];

export default function Events() {
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("");
  const [step, setStep] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("All");
  const [formData, setFormData] = useState({
    sport: "",
    type: "",
    age: "",
    location: "",
    name: "",
  });

  const stepsTotal = 5;

  const openModal = (type) => {
    setModalType(type);
    setShowModal(true);
    setStep(1);
    setFormData({ sport: "", type: "", age: "", location: "", name: "" });
  };

  const closeModal = () => {
    setShowModal(false);
    setModalType("");
    setStep(1);
  };

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  // Filtered events
  const filteredEvents = eventsData.filter((event) => {
    const matchesSearch =
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.organizer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.location.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter = filter === "All" || event.type === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      {/* Page Title */}
      <h1 className="font-manrope font-bold text-[24px] leading-6 text-black mb-4">
        Events
      </h1>
      <p className="font-manrope font-medium text-[16px] leading-6 text-black mb-4">
        Manage your teams and events in one place.
      </p>

      {/* Create Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        <div className="border rounded-lg p-6 text-center shadow-sm bg-white text-[#DEE1E6]">
          <img src="./team.png" alt="Create Team" className="mx-auto mb-4" />
          <h2 className="font-manrope text-lg font-semibold mb-2 text-black text-[24px]">
            Create Team
          </h2>
          <p className="text-gray-500 text-sm mb-4">
            Set up a new team, invite members, and organize your groups
            efficiently.
          </p>
          <button
            onClick={() => openModal("team")}
            className="font-manrope px-4 py-2 bg-indigo-400 text-white rounded-md hover:bg-indigo-500"
          >
            Go to Create Team
          </button>
        </div>

        <div className="border rounded-lg p-6 text-center shadow-sm bg-white text-[#DEE1E6]">
          <img src="./event.png" alt="Create Event" className="mx-auto mb-4" />
          <h2 className="font-manrope text-lg font-semibold mb-2 text-black text-[24px]">
            Create Event
          </h2>
          <p className="font-manrope text-gray-500 text-sm mb-4">
            Plan new events, set dates, locations, and manage RSVPs seamlessly.
          </p>
          <button
            onClick={() => openModal("event")}
            className="font-manrope px-4 py-2 bg-indigo-400 text-white rounded-md hover:bg-indigo-500"
          >
            Go to Create Event
          </button>
        </div>
      </div>

      {/* Upcoming Events */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <h2 className="font-manrope text-[30px] font-bold">Upcoming Events</h2>

        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          {/* Search Bar */}
          <div className="relative flex-1 sm:flex-initial">
            <input
              type="text"
              placeholder="Search events..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full sm:w-64 border border-gray-300 rounded-lg px-4 py-2 pl-10 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
            <Search className="absolute left-3 top-2.5 text-gray-400 w-4 h-4" />
          </div>

          {/* Dropdown Filter */}
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          >
            <option value="All">All</option>
            <option value="Game">Games</option>
            <option value="Event">Events</option>
          </select>
        </div>
      </div>

      {/* Events List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEvents.length > 0 ? (
          filteredEvents.map((event) => (
            <div
              key={event.id}
              className="bg-white rounded-[10px] border border-[#DEE1E6] shadow-[0px_0px_1px_#171a1f12,0px_0px_2px_#171a1f1F] p-5 flex flex-col justify-between"
            >
              <h3 className="font-bold text-lg">{event.title}</h3>
              <p className="text-sm text-gray-500 mb-2">
                Organized by {event.organizer}
              </p>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Calendar size={14} /> {event.date}
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Clock size={14} /> {event.time}
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <MapPin size={14} /> {event.location}
              </div>
              <p className="mt-2 text-sm">
                RSVP:{" "}
                <span
                  className={`font-semibold ${
                    event.rsvp === "Attending"
                      ? "text-green-600"
                      : event.rsvp === "Invited"
                      ? "text-red-600"
                      : "text-yellow-600"
                  }`}
                >
                  {event.rsvp}
                </span>
              </p>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No events found.</p>
        )}
      </div>

      {/* Team Modal */}
      {showModal && modalType === "team" && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-lg">
            <h2 className="text-[25px] leading-[28px] font-manrope font-bold text-[#35373D] mb-2 text-center">
              Create Team
            </h2>

            {/* Progress bar */}
            <div className="w-full h-1 bg-gray-200 rounded mb-4">
              <div
                className="h-1 bg-indigo-500 rounded"
                style={{ width: `${(step / stepsTotal) * 100}%` }}
              ></div>
            </div>

            {/* Step 1 - Sport */}
            {step === 1 && (
              <div>
                <h3 className="font-medium mb-4">Select your team sport</h3>
                <div className="grid grid-cols-2 gap-3">
                  {["Baseball", "Basketball", "Soccer", "Hockey"].map((s) => (
                    <button
                      key={s}
                      onClick={() => setFormData({ ...formData, sport: s })}
                      className={`border rounded p-3 hover:border-indigo-500 ${
                        formData.sport === s ? "border-indigo-600" : ""
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 2 - Type */}
            {step === 2 && (
              <div>
                <h3 className="font-medium mb-4">Select your team type</h3>
                {["Travel", "Local League", "School"].map((t) => (
                  <button
                    key={t}
                    onClick={() => setFormData({ ...formData, type: t })}
                    className={`w-full mb-2 border rounded p-2 hover:border-indigo-500 ${
                      formData.type === t ? "border-indigo-600" : ""
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            )}

            {/* Step 3 - Age */}
            {step === 3 && (
              <div>
                <h3 className="font-medium mb-4">Player Age Group</h3>
                <div className="flex flex-wrap gap-2">
                  {["8U", "9U", "10U", "11U", "12U"].map((a) => (
                    <button
                      key={a}
                      onClick={() => setFormData({ ...formData, age: a })}
                      className={`border rounded px-4 py-2 hover:border-indigo-500 ${
                        formData.age === a ? "border-indigo-600" : ""
                      }`}
                    >
                      {a}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 4 - Location */}
            {step === 4 && (
              <div>
                <h3 className="font-medium mb-4">Team Location</h3>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) =>
                    setFormData({ ...formData, location: e.target.value })
                  }
                  placeholder="Enter City / Town"
                  className="w-full border rounded p-2"
                />
              </div>
            )}

            {/* Step 5 - Team Name */}
            {step === 5 && (
              <div>
                <h3 className="font-medium mb-4">Team Name</h3>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder="Ex. Tigers United"
                  className="w-full border rounded p-2"
                />
              </div>
            )}

            {/* Footer */}
            <div className="flex justify-between mt-6">
              <button
                onClick={step === 1 ? closeModal : prevStep}
                className="px-4 py-2 border rounded hover:bg-gray-100"
              >
                {step === 1 ? "Cancel" : "Back"}
              </button>

              {step < stepsTotal ? (
                <button
                  onClick={nextStep}
                  disabled={
                    (step === 1 && !formData.sport) ||
                    (step === 2 && !formData.type) ||
                    (step === 3 && !formData.age) ||
                    (step === 4 && !formData.location)
                  }
                  className="px-4 py-2 bg-indigo-600 text-white rounded disabled:opacity-50"
                >
                  Next
                </button>
              ) : (
                <button
                  onClick={() => {
                    console.log("Created Team:", formData);
                    closeModal();
                  }}
                  className="px-4 py-2 bg-green-600 text-white rounded"
                >
                  Finish
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Create Event Modal */}
      {showModal && modalType === "event" && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-lg font-semibold mb-4">Create Event</h2>
            <p className="text-gray-500">Event creation flow coming soon...</p>
            <div className="flex justify-end mt-4">
              <button
                onClick={closeModal}
                className="px-4 py-2 border rounded hover:bg-gray-100"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
