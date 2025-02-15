import React, { useState, useEffect } from "react";
import { User, Mail } from "lucide-react";
import api from "../api";

export default function Account() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      
      try {
        const response = await api.get("/api/auth/profile");
        setProfile(response.data.user);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching profile:", error);
        setError(error.response?.data?.message || "Error fetching profile");
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  if (loading) {
   return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="p-4 text-lg">Loading...</div>
    </div>
  );
  }

  if (error) {
    return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="p-4 text-red-500 text-lg bg-red-50 rounded-lg">
        {error}
      </div>
    </div>
  );
}

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">My Account</h1>
      <div className="space-y-4">
        <div className="flex justify-center space-x-2">
          <User size={24} color="#3B82F6" fill="#3B82F6" />
          <span>{profile.username}</span>
        </div>
        <div className="flex justify-center space-x-2">
          <Mail size={24} color="#3B82F6" />
          <span>{profile.email}</span>
        </div>
      </div>
    </div>
  );
}
