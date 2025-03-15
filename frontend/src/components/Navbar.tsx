import { useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();  // Get the current route

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
    <nav className=" py-4 flex flex-col md:flex-row justify-center space-x-4 font-semibold">
      {navItems.map((item) => {
        // Check if the current location is the same as the path
        const isActive = location.pathname === item.path;

        return (
          <a
            key={item.name}
            href={item.path}
            className={`text-gray-700 px-3 py-2 transition-all duration-300 ${
              isActive ? "bg-gray-300 rounded-full" : "hover:bg-gray-300 hover:rounded-full"
            }`}
          >
            {item.name}
          </a>
        );
      })}
    </nav>
  );
};

export default Navbar;
