import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="p-4 bg-blue-600 text-white flex justify-between">
      <h1 className="text-2xl font-bold">ExploreWorld</h1>
      <div>
        <Link className="mr-4" to="/">Home</Link>
        <Link to="/destinations">Destinations</Link>
      </div>
    </nav>
  );
};

export default Navbar;
