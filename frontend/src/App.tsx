import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Destinations from "./pages/Destinations";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import BukidnonMap from "./pages/BukidnonMap";

function App() {
  return (
    <Router>
      <MainLayout />
    </Router>
  );
}

function MainLayout() {
  const location = useLocation();

  return (
    <>
      {/* Show Navbar only if NOT on Home, becuase i dont want it in the top of my home page but in the middle*/}
      {location.pathname !== "/" && location.pathname !== "/destinations" && <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/destinations" element={<Destinations />} />
      </Routes>
      {/*{location.pathname == "/destinations" && <BukidnonMap />} */}
      {location.pathname !== "/" && <Footer />}
    </>
  );
}

export default App;
