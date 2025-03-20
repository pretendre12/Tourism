import { useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();

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
    </nav>
  );
};

export default Navbar;
