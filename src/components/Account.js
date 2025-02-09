import React from "react";
import { useAuth } from "../contexts/AuthContext";
import { User, Mail } from "lucide-react";

export default function Account() {
  const { user } = useAuth();

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">My Account</h1>
      <div className="space-y-4">
        <div className="flex justify-center space-x-2">
          <User size={24} color="#3B82F6" fill="#3B82F6" />
          <span>{user.username}</span>
        </div>
        <div className="flex justify-center space-x-2">
          <Mail size={24} color="#3B82F6" />
          <span>{user.email}</span>
        </div>
      </div>
    </div>
  );
}
