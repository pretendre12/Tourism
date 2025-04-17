import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa"; // Import user icon
import client from "../service/middleware/client-instance";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState<{ name: string } | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      client
        .get("/api/user-info", { headers: { Authorization: `Bearer ${token}` } })
        .then((response) => {
          setUser(response.data);
        })
        .catch(() => {
          localStorage.removeItem("token"); // Remove invalid token
          setUser(null);
        });
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  };

  const navItems = [
    { name: "HOMEPAGE", path: "/" },
    { name: "DESTINATIONS", path: "/destinations" },
    { name: "NATURE ESCAPES", path: "/nature" },
    { name: "THRILLING ADVENTURES", path: "/thrilling-adventures" },
    { name: "CULTURE", path: "/culture" },
    { name: "DINING SPOTS", path: "/dining" },
    { name: "LOCAL DELICACIES", path: "/delicacies" },
    { name: "PLACE TO STAY", path: "/stay" },
  ];

  return (
    <nav className="py-4 flex flex-col items-center gap-4 font-semibold relative">
      <div className="flex flex-wrap justify-center gap-4">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;

          return (
            <a
              key={item.name}
              href={item.path}
              className={`text-gray-700 px-3 py-2 transition-all duration-300 ${
                isActive
                  ? "bg-gray-300 rounded-full"
                  : "hover:bg-gray-300 hover:rounded-full"
              }`}
            >
              {item.name}
            </a>
          );
        })}
      </div>

      {/* User Login/Icon at the Bottom */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 flex flex-col items-center">
        {!user ? (
          <a
            href="/login"
            className="text-gray-700 px-3 py-2 transition-all duration-300"
          >
            Login
          </a>
        ) : (
          <div className="relative flex flex-col items-center">
            <button className="flex flex-col items-center">
              <FaUserCircle className="text-3xl" />
              <span className="mt-1 text-gray-700">{user.name}</span>
            </button>
            {/* Dropdown for Logout */}
            <div className="absolute left-0 mt-2 w-32 bg-white border rounded shadow-lg opacity-0 hover:opacity-100 transition-opacity duration-300">
              <button
                onClick={handleLogout}
                className="block w-full px-4 py-2 text-left hover:bg-gray-100"
              >
                Logout
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;