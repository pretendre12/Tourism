import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Destinations from "./pages/Destinations";
import TouristSpots from "./pages/TouristSpots";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ThrillingAdventures from "./pages/ThrillingAdventures";
import Culture from "./pages/Culture";
import Articrafts from "./pages/Articracfts";
import Festival from "./pages/Festival";
import Delicacies from "./pages/Delicacies";
import Stay from "./pages/Stay";
import Dining from "./pages/Dining";
import NotFound from "./pages/404";
import Nature from "./pages/Nature";
import About from "./pages/About";
import Facts from "./pages/Facts"
import Ex from "./pages/Ex"
import "./index.css";



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
      {location.pathname !== "/" && 
      location.pathname !== "/thrilling-adventures" &&
      location.pathname !== "/culture" &&
      location.pathname !== "/articrafts" &&
      location.pathname !== "/festival" &&
      location.pathname !== "/delicacies" &&
      location.pathname !== "/stay" &&
      location.pathname !== "/dining" &&
      location.pathname !== "/nature" &&
      location.pathname !== "/about" &&
      location.pathname !== "/destinations" && <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/destinations" element={<Destinations />} />
        <Route path="/tourist-spots" element={<TouristSpots />} />
        <Route path="/thrilling-adventures" element={<ThrillingAdventures />} />
        <Route path="/culture" element={<Culture />} />
        <Route path="/articrafts" element={<Articrafts />} />
        <Route path="/festival" element={<Festival />} />
        <Route path="/delicacies" element={<Delicacies />} />
        <Route path="/stay" element={<Stay />} />
        <Route path="/dining" element={<Dining />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/nature" element={<Nature />} />
        <Route path="/about" element={<About />} />
        <Route path="/facts" element={<Facts />} />
        <Route path="/ex" element={<Ex />} />
      </Routes>
      {/*{location.pathname == "/destinations" && <BukidnonMaps />} */}
      {location.pathname !== "/" && <Footer />}
    </>
  );
}

export default App;
