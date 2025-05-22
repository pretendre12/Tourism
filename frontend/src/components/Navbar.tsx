import { useLocation, Link } from "react-router-dom";
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const location = useLocation();
  const { user, logout, token } = useAuth();
  const email = user?.email || '';
  const avatarInitial = email.charAt(0).toUpperCase();

  // Filter out the "Login" item if user exists
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
    <nav className="py-4 flex flex-wrap justify-center gap-4 font-semibold">
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

      {/* Show username if user exists, else show Login */}
      {user ? (
        <Link to="/profile">
        <div
            className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-base font-bold shadow-md ${
               'bg-blue-500'
            }`}
          >
            {avatarInitial}
          </div>
          </Link>
      ) : (
        <a
          href="/Login"
          className={`text-gray-700 px-3 py-2 transition-all duration-300 ${
            location.pathname === "/Login"
              ? "bg-gray-300 rounded-full"
              : "hover:bg-gray-300 hover:rounded-full"
          }`}
        >
          Login
        </a>
      )}
    </nav>
  );
};

export default Navbar;
