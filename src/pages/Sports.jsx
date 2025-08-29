import React, { useState, useEffect, useRef } from "react";
import {
  Calendar,
  Users,
  Trophy,
  Video,
  Home,
  UserCheck,
  ChevronDown,
  X,
} from "lucide-react";
import Header from "../components/Layouts/Header";
import Footer from "../components/Layouts/Footer";
import io from "socket.io-client";

const socket = io("http://3.109.150.69:5000");

const Sports = () => {
  const [active, setActive] = useState("Overview");
  const [isMobile, setIsMobile] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [roomId, setRoomId] = useState("");
  const [streaming, setStreaming] = useState(false);
  const [micOn, setMicOn] = useState(true);
  const [cameraOn, setCameraOn] = useState(true);
  const [role, setRole] = useState(null); // Track host or viewer role

  const videoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const localStream = useRef(null);
  const peerConnections = useRef(new Map()); // Map of viewerId -> RTCPeerConnection for host

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);

    return () => {
      window.removeEventListener("resize", checkIsMobile);
    };
  }, []);

  useEffect(() => {
    socket.on("room-joined", ({ roomId }) => {
      console.log("Confirmed room joined:", roomId);
    });

    socket.on("new-viewer", ({ viewerId }) => {
      if (role === "host") {
        console.log(`New viewer joined: ${viewerId}`);
        createOfferForViewer(viewerId);
      }
    });

    socket.on("offer", async ({ offer, hostId }) => {
      if (role !== "viewer") return;
      console.log("Viewer received offer from host:", hostId);
      try {
        const pc = new RTCPeerConnection({
          iceServers: [
            { urls: "stun:stun.l.google.com:19302" },
            {
              urls: "turn:openrelay.metered.ca:80",
              username: "openrelayproject",
              credential: "openrelayproject",
            },
          ],
        });

        peerConnections.current.set(hostId, pc);

        pc.onicecandidate = (event) => {
          if (event.candidate) {
            console.log("Viewer sending ICE candidate to host:", hostId);
            socket.emit("ice-candidate", {
              roomId,
              candidate: event.candidate,
              to: hostId,
            });
          }
        };

        pc.ontrack = (event) => {
          console.log("Viewer received track:", event.streams[0]);
          if (remoteVideoRef.current) {
            remoteVideoRef.current.srcObject = event.streams[0];
            console.log("Assigned stream to remoteVideoRef");
          }
        };

        pc.oniceconnectionstatechange = () => {
          console.log("Viewer ICE connection state:", pc.iceConnectionState);
          if (pc.iceConnectionState === "failed") {
            console.error("Viewer ICE connection failed");
            alert("Failed to connect to host. Please try again.");
            stopStream();
          }
        };

        await pc.setRemoteDescription(new RTCSessionDescription(offer));
        console.log("Viewer set remote description for offer");
        const answer = await pc.createAnswer();
        await pc.setLocalDescription(answer);
        console.log("Viewer sending answer to host:", hostId);
        socket.emit("answer", { roomId, answer, hostId });
      } catch (err) {
        console.error("Error handling offer:", err);
      }
    });

    socket.on("answer", async ({ answer, viewerId }) => {
      if (role !== "host") return;
      console.log("Host received answer from viewer:", viewerId);
      const pc = peerConnections.current.get(viewerId);
      if (!pc) {
        console.error("No peer connection for viewer:", viewerId);
        return;
      }
      try {
        await pc.setRemoteDescription(new RTCSessionDescription(answer));
        console.log("Host set remote description for answer from:", viewerId);
      } catch (err) {
        console.error("Error handling answer:", err);
      }
    });

    socket.on("ice-candidate", async ({ candidate, from }) => {
      console.log("Received ICE candidate from:", from);
      const pc = peerConnections.current.get(from);
      if (pc) {
        try {
          await pc.addIceCandidate(new RTCIceCandidate(candidate));
          console.log("Added ICE candidate from:", from);
        } catch (err) {
          console.error("Error adding ICE candidate:", err);
        }
      }
    });

    socket.on("host-disconnected", () => {
      console.log("Host disconnected");
      alert("Host has disconnected. Stream ended.");
      stopStream();
    });

    socket.on("viewer-disconnected", ({ viewerId }) => {
      if (role === "host") {
        console.log(`Viewer disconnected: ${viewerId}`);
        const pc = peerConnections.current.get(viewerId);
        if (pc) {
          pc.close();
          peerConnections.current.delete(viewerId);
        }
      }
    });

    socket.on("error", ({ message }) => {
      console.log("Server error:", message);
      alert(message);
      stopStream();
    });

    return () => {
      socket.off("offer");
      socket.off("answer");
      socket.off("ice-candidate");
      socket.off("host-disconnected");
      socket.off("viewer-disconnected");
      socket.off("error");
      socket.off("room-joined");
      socket.off("new-viewer");
    };
  }, [roomId, role]);

  const createOfferForViewer = async (viewerId) => {
    try {
      const pc = new RTCPeerConnection({
        iceServers: [
          { urls: "stun:stun.l.google.com:19302" },
          {
            urls: "turn:openrelay.metered.ca:80",
            username: "openrelayproject",
            credential: "openrelayproject",
          },
        ],
      });

      peerConnections.current.set(viewerId, pc);

      localStream.current.getTracks().forEach((track) => {
        console.log("Host adding track for viewer:", viewerId);
        pc.addTrack(track, localStream.current);
      });

      pc.onicecandidate = (event) => {
        if (event.candidate) {
          console.log("Host sending ICE candidate to viewer:", viewerId);
          socket.emit("ice-candidate", {
            roomId,
            candidate: event.candidate,
            to: viewerId,
          });
        }
      };

      pc.ontrack = (event) => {
        console.log("Host received track from viewer:", viewerId);
        // Optionally display viewer streams if two-way video is needed
      };

      pc.oniceconnectionstatechange = () => {
        console.log(`Host ICE connection state for viewer ${viewerId}:`, pc.iceConnectionState);
        if (pc.iceConnectionState === "failed") {
          console.error(`Host ICE connection failed for viewer ${viewerId}`);
          pc.close();
          peerConnections.current.delete(viewerId);
        }
      };

      const offer = await pc.createOffer();
      await pc.setLocalDescription(offer);
      console.log("Host sending offer to viewer:", viewerId);
      socket.emit("offer", { roomId, offer, viewerId });
    } catch (err) {
      console.error(`Error creating offer for viewer ${viewerId}:`, err);
    }
  };

  const startLiveStream = async () => {
    if (!roomId) {
      alert("Enter a Room ID first");
      return;
    }

    try {
      console.log("Starting live stream for room:", roomId);
      localStream.current = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      console.log("Got local stream:", localStream.current);
      if (videoRef.current) videoRef.current.srcObject = localStream.current;

      socket.emit("join-room", roomId, "host");
      console.log("Joined room as host:", roomId);
      setRole("host");
      setStreaming(true);
    } catch (err) {
      console.error("Error starting live stream:", err);
      alert("Failed to start live stream. Please check camera/microphone permissions.");
    }
  };

  const joinLiveStream = async () => {
    if (!roomId) {
      alert("Enter a Room ID first");
      return;
    }

    try {
      console.log("Joining live stream for room:", roomId);
      socket.emit("join-room", roomId, "viewer");
      console.log("Joined room as viewer:", roomId);
      setRole("viewer");
      setStreaming(true);
    } catch (err) {
      console.error("Error joining live stream:", err);
      alert("Failed to join live stream.");
    }
  };

  const stopStream = () => {
    console.log("Stopping stream, reason: manual stop");
    if (localStream.current) {
      localStream.current.getTracks().forEach((track) => track.stop());
    }
    peerConnections.current.forEach((pc, viewerId) => {
      pc.close();
      console.log(`Closed peer connection for viewer ${viewerId}`);
    });
    peerConnections.current.clear();
    if (videoRef.current) videoRef.current.srcObject = null;
    if (remoteVideoRef.current) remoteVideoRef.current.srcObject = null;
    setStreaming(false);
    setMicOn(true);
    setCameraOn(true);
    setRole(null);
  };

  const toggleMic = () => {
    if (localStream.current) {
      localStream.current.getAudioTracks().forEach((track) => {
        track.enabled = !track.enabled;
        setMicOn(track.enabled);
        console.log("Mic toggled:", track.enabled ? "on" : "off");
      });
    }
  };

  const toggleCamera = () => {
    if (localStream.current) {
      localStream.current.getVideoTracks().forEach((track) => {
        track.enabled = !track.enabled;
        setCameraOn(track.enabled);
        console.log("Camera toggled:", track.enabled ? "on" : "off");
      });
    }
  };

  const tabs = [
    { label: "Overview", icon: <Home className="w-4 h-4" /> },
    { label: "Schedule", icon: <Calendar className="w-4 h-4" /> },
    { label: "Team Members", icon: <Users className="w-4 h-4" /> },
    { label: "Opponents", icon: <UserCheck className="w-4 h-4" /> },
    { label: "Scoreboard", icon: <Trophy className="w-4 h-4" /> },
    { label: "Live Streaming", icon: <Video className="w-4 h-4" /> },
  ];

  const game = {
    team: "Falcons",
    date: "Saturday, April 20",
    time: "7:00 PM",
    location: "Central Arena",
  };
  const score = {
    home: "Team Hub",
    homeScore: 85,
    away: "Wildcats",
    awayScore: 72,
    mvp: "Sarah Lee",
    points: 25,
  };
  const practice = {
    day: "Tomorrow",
    time: "6:00 PM",
    location: "Gym A - Drills & Scrimmage",
  };
  const players = 18;

  const renderContent = () => {
    switch (active) {
      case "Overview":
        return (
          <div className="mt-8 bg-white rounded-lg p-6 shadow border">
            <h2 className="text-lg font-bold mb-4">Overview</h2>
            <p className="text-sm text-gray-600">
              Welcome to the Team Hub! Here you can check scores, schedules,
              practices, and more.
            </p>
          </div>
        );

      case "Schedule":
        return (
          <div className="mt-8 bg-white rounded-lg p-6 shadow border">
            <h2 className="text-lg font-bold mb-4">Upcoming Schedule</h2>
            <ul className="space-y-3 text-sm">
              <li>
                📅 {game.date} - {game.time} @ {game.location} (vs {game.team})
              </li>
              <li>📅 April 25 - 6:00 PM @ Gym A (Practice)</li>
              <li>📅 April 30 - 7:00 PM @ Central Arena (vs Hawks)</li>
            </ul>
          </div>
        );

      case "Team Members":
        return (
          <div className="mt-8 bg-white rounded-lg p-6 shadow border">
            <h2 className="text-lg font-bold mb-4">
              Active Players ({players})
            </h2>
            <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 text-sm">
              <li>Sarah Lee (Captain)</li>
              <li>John Kim</li>
              <li>David Chen</li>
              <li>Maria Garcia</li>
              <li>James Brown</li>
              <li>Lisa Wong</li>
            </ul>
          </div>
        );

      case "Opponents":
        return (
          <div className="mt-8 bg-white rounded-lg p-6 shadow border">
            <h2 className="text-lg font-bold mb-4">Upcoming Opponents</h2>
            <ul className="space-y-3 text-sm">
              <li>Falcons - April 20</li>
              <li>Hawks - April 30</li>
              <li>Lions - May 5</li>
            </ul>
          </div>
        );

      case "Scoreboard":
        return (
          <div className="mt-8 bg-white rounded-lg p-6 shadow border">
            <h2 className="text-lg font-bold mb-4">Scoreboard</h2>
            <p className="text-sm">
              {score.home} {score.homeScore} - {score.awayScore} {score.away}
            </p>
            <p className="text-sm mt-2">
              MVP: {score.mvp} ({score.points} pts)
            </p>
          </div>
        );

      case "Live Streaming":
        return (
          <div className="mt-8 bg-white rounded-lg p-6 shadow border text-center">
            <h2 className="text-lg font-bold mb-4">Live Streaming</h2>
            <input
              type="text"
              placeholder="Enter Room ID"
              value={roomId}
              onChange={(e) => setRoomId(e.target.value)}
              className="border p-2 rounded mb-4 w-64"
            />
            <div className="flex justify-center gap-4 mb-4 flex-wrap">
              <button
                onClick={startLiveStream}
                disabled={streaming}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                {streaming ? "Live..." : "Start Live Stream"}
              </button>
              <button
                onClick={joinLiveStream}
                disabled={streaming}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Join Live Stream
              </button>
              {streaming && (
                <>
                  <button
                    onClick={stopStream}
                    className="bg-gray-700 text-white px-4 py-2 rounded"
                  >
                    Stop Stream
                  </button>
                  <button
                    onClick={toggleMic}
                    className="bg-green-500 text-white px-4 py-2 rounded"
                  >
                    {micOn ? "Mute Mic" : "Unmute Mic"}
                  </button>
                  <button
                    onClick={toggleCamera}
                    className="bg-purple-500 text-white px-4 py-2 rounded"
                  >
                    {cameraOn ? "Turn Off Camera" : "Turn On Camera"}
                  </button>
                </>
              )}
            </div>
            <div className="flex justify-center gap-4">
              <div>
                <p className="text-sm mb-2">Local Video (Host)</p>
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className="w-72 rounded-lg shadow"
                />
              </div>
              <div>
                <p className="text-sm mb-2">Remote Video (Viewer)</p>
                <video
                  ref={remoteVideoRef}
                  autoPlay
                  playsInline
                  className="w-72 rounded-lg shadow"
                />
              </div>
            </div>
            <p className="text-sm mt-4">
              🎥 Next game will be streamed here on April 20 @ 7:00 PM
            </p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-white text-[#19191F] overflow-x-hidden">
        <div className="flex justify-center w-full px-4 py-20">
          <div className="w-full max-w-7xl">
            {!isMobile ? (
              <div className="flex items-center justify-start rounded-2xl p-2 gap-2 overflow-x-auto bg-[#565E6CFF] w-[80%]">
                {tabs.map((tab, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActive(tab.label)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all
                    ${
                      active === tab.label
                        ? "bg-[#0A0D42] text-white"
                        : "text-white hover:bg-gray-600"
                    }`}
                  >
                    {tab.icon}
                    <span>{tab.label}</span>
                  </button>
                ))}
              </div>
            ) : (
              <div className="relative">
                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="w-full flex items-center justify-between bg-[#565E6CFF] text-white px-4 py-3 rounded-2xl"
                >
                  <div className="flex items-center gap-2">
                    {tabs.find((tab) => tab.label === active)?.icon}
                    <span>{active}</span>
                  </div>
                  {mobileMenuOpen ? <X size={20} /> : <ChevronDown size={20} />}
                </button>
                {mobileMenuOpen && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-[#565E6CFF] rounded-lg shadow-lg z-10">
                    {tabs.map((tab, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          setActive(tab.label);
                          setMobileMenuOpen(false);
                        }}
                        className={`w-full flex items-center gap-2 px-4 py-3 text-sm font-medium transition-all
                        ${
                          active === tab.label
                            ? "bg-[#0A0D42] text-white"
                            : "text-white hover:bg-gray-600"
                        } ${idx === 0 ? "rounded-t-lg" : ""} ${
                          idx === tabs.length - 1 ? "rounded-b-lg" : ""
                        }`}
                      >
                        {tab.icon}
                        <span>{tab.label}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
        <div className="mx-auto px-4 w-full max-w-7xl">
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <div className="bg-[#F0F9FF] rounded-lg p-6 relative">
              <h3 className="font-semibold text-lg">Upcoming Game</h3>
              <p className="mt-4 text-2xl font-bold leading-tight">
                VS {game.team}
              </p>
              <p className="mt-3 text-sm">{game.date}</p>
              <p className="text-sm">
                {game.time} - {game.location}
              </p>
              <div className="absolute bottom-4 right-4 w-14 h-14 flex items-center justify-center bg-white rounded-full shadow mb-10">
                <img
                  src="/upcoming.png"
                  alt="Upcoming Game"
                  className="w-12 h-16 object-contain"
                />
              </div>
            </div>
            <div className="bg-[#D0F6DE] rounded-lg p-6 relative">
              <h3 className="font-semibold text-lg">Recent Score</h3>
              <p className="mt-4 text-2xl font-bold leading-tight">
                {score.home} {score.homeScore} - {score.awayScore} {score.away}
              </p>
              <p className="mt-4 text-sm">Win - Last Game</p>
              <p className="text-sm">
                MVP: {score.mvp} ({score.points} pts)
              </p>
              <div className="absolute bottom-4 right-4 w-14 h-14 flex items-center justify-center bg-white rounded-full shadow mb-10">
                <img
                  src="/score.png"
                  alt="Recent Score"
                  className="w-12 h-16 object-contain"
                />
              </div>
            </div>
            <div className="bg-[#DEE1E6] rounded-lg p-6">
              <h3 className="font-semibold text-lg">Number of Players</h3>
              <p className="mt-8 text-4xl font-bold">{players}</p>
              <p className="mt-2 text-sm text-gray-600">Active Roster</p>
            </div>
            <div className="bg-[#E6E6FA] rounded-lg p-6">
              <h3 className="font-semibold text-lg">Next Practice</h3>
              <p className="mt-6 text-2xl font-bold">
                {practice.day}, {practice.time}
              </p>
              <p className="mt-3 text-sm text-gray-600">{practice.location}</p>
            </div>
          </div>
          {renderContent()}
          <div className="mt-8 bg-white rounded-lg p-6 shadow border">
            <h2 className="text-lg font-bold mb-4">Coach Announcements</h2>
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-start gap-3">
                <span className="border border-blue-600 text-blue-600 text-xs font-semibold px-3 py-1 rounded-full self-start">
                  NEW
                </span>
                <div className="flex-1">
                  <p className="font-semibold">
                    Mandatory Team Meeting - April 19th
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    All players must attend a short meeting after practice on
                    Friday to discuss team strategies for the upcoming
                    championship.
                  </p>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-start gap-3">
                <span className="border border-green-600 text-green-600 text-xs font-semibold px-3 py-1 rounded-full self-start">
                  UPDATE
                </span>
                <div className="flex-1">
                  <p className="font-semibold">
                    Travel Itinerary for Away Game
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    The bus departure time for the away game against the Eagles
                    has been moved to 3:00 PM. Please be at the school by 2:45
                    PM.
                  </p>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-start gap-3">
                <span className="border border-gray-600 text-gray-600 text-xs font-semibold px-3 py-1 rounded-full self-start">
                  REMINDER
                </span>
                <div className="flex-1">
                  <p className="font-semibold">
                    Equipment Check and Maintenance
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    Remember to check your gear regularly. Report any damaged
                    equipment to Coach Smith by end of week.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Sports;