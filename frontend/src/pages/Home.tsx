import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="text-center p-10">
      <h1 className="text-4xl font-bold">Welcome to ExploreWorld</h1>
      <p className="mt-4 text-lg">Discover the most beautiful destinations around the globe.</p>
      <Link to="/destinations" className="mt-6 inline-block px-6 py-2 bg-blue-600 text-white rounded">
        Explore Destinations
      </Link>
    </div>
  );
};

export default Home;
