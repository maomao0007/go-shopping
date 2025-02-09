import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { LogOut } from "lucide-react";

export default function Logout({isMobile}) {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };
  return (
    <button
      onClick={handleLogout}
      className={
        isMobile
          ? "flex items-center space-x-3 p-2 hover:bg-gray-50 rounded-lg transition-colors"
          : "relative hover:text-blue-500 transition-colors"
      }
    >
      <LogOut className="h-5 w-5 sm:h-6 sm:w-6" />
      {isMobile && <span className="text-gray-700 ml-2">Log Out</span>}
    </button>
  );
}
