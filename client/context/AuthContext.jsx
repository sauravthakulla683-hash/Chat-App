import React, { useEffect, useState, createContext } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import io from "socket.io-client";

export const AuthContext = createContext();

// ✅ Set backend base URL from .env
const backendurl = import.meta.env.VITE_BACKEND_URL;
axios.defaults.baseURL = backendurl;

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [authuser, setAuthuser] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [socket, setSocket] = useState(null);

  // ✅ Check user authentication when token exists
  const checkAuth = async () => {
    try {
      const { data } = await axios.get("/api/auth/check");
      if (data.success) {
        setAuthuser(data.user);
      }
    } catch (err) {
      toast.error(err.message || "Auth check failed");
    }
  };

  // ✅ Login / Signup (dynamic based on 'state' = 'login' or 'signin')
  const login = async (state, credentials) => {
    try {
      const { data } = await axios.post(`/api/auth/${state}`, credentials);

      if (data.success) {
        setToken(data.token);
        localStorage.setItem("token", data.token);
        axios.defaults.headers.common["token"] = data.token;
        setAuthuser(data.user);
        toast.success(data.message || "Login successful");
        connectSocket(data.user);
      } else {
        toast.error(data.message || "Login failed");
      }
    } catch (err) {
      toast.error(err.message || "Network error");
    }
  };

  // ✅ Logout user
  const logout = () => {
    localStorage.removeItem("token");
    setAuthuser(null);
    setToken(null);
    setOnlineUsers([]);
    axios.defaults.headers.common["token"] = null;

    if (socket) {
      socket.disconnect();
      setSocket(null);
    }

    toast.success("Logged out successfully");
  };

  // ✅ Update user profile
  const updateProfile = async (body) => {
    try {
      const { data } = await axios.put("/api/auth/updateprofile", body);
      if (data.success) {
        setAuthuser(data.user);
        toast.success("Profile updated successfully");
      } else {
        toast.error(data.message || "Update failed");
      }
    } catch (err) {
      toast.error(err.message || "Profile update failed");
    }
  };

  // ✅ Connect Socket.IO (only if not already connected)
  const connectSocket = (userdata) => {
    if (!userdata || socket?.connected) return;

    const newSocket = io(backendurl, {
      query: { userId: userdata._id },
    });

    setSocket(newSocket);

    // Listen for list of online users from backend
    newSocket.on("get-online-users", (userIds) => {
      setOnlineUsers(userIds);
    });

    // Optional: cleanup on disconnect
    newSocket.on("disconnect", () => {
      console.log("Socket disconnected");
    });
  };

  // ✅ Setup token + check authentication when component mounts
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["token"] = token;
      checkAuth();
    }
  }, [token]);

  const value = {
    axios,
    authuser,
    onlineUsers,
    socket,
    login,
    logout,
    updateProfile,
  };

  // ✅ Correct context provider with value
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
