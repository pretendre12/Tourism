<<<<<<< HEAD
// App.tsx
import React, { ReactNode } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { AuthProvider, useAuth } from "./context/AuthContext";
=======
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"; // Import React Query
>>>>>>> 1b419335 (Pending changes exported from your codespace)

import Home from "./pages/Home";
import Destinations from "./pages/Destinations";
import TouristSpots from "./pages/TouristSpots";
import ThrillingAdventures from "./pages/ThrillingAdventures";
import Culture from "./pages/Culture";
<<<<<<< HEAD
import Articrafts from "./pages/Articracfts"
=======
import Articrafts from "./pages/Articrafts"; // Fixed typo
>>>>>>> 1b419335 (Pending changes exported from your codespace)
import Festival from "./pages/Festival";
import Delicacies from "./pages/Delicacies";
import Stay from "./pages/Stay";
import Dining from "./pages/Dining";
import Nature from "./pages/Nature";
import About from "./pages/About";
import Facts from "./pages/Facts";
import Ex from "./pages/Ex";
<<<<<<< HEAD
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import NotFound from "./pages/404";
import HomePage from "./pages/HomePage";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import "./index.css";

// 🔧 Create query client instance
const queryClient = new QueryClient();

// 🔒 ProtectedRoute component
type ProtectedRouteProps = {
  children: ReactNode;
};

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user } = useAuth();
  return user ? <>{children}</> : <Navigate to="/login" />;
};
=======
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import "./index.css";

// Create Query Client
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <MainLayout />
      </Router>
    </QueryClientProvider>
  );
}
>>>>>>> 1b419335 (Pending changes exported from your codespace)

// 🧠 MainLayout wraps routes + layout elements
const MainLayout: React.FC = () => {
  const location = useLocation();
  const { user } = useAuth();
  const showLayout = location.pathname !== "/";

  return (
    <>
<<<<<<< HEAD
      {showLayout && <Navbar />}
=======
      {/* Hide Navbar on these pages */}
      {![
        "/", "/thrilling-adventures", "/culture", "/articrafts", "/festival",
        "/delicacies", "/stay", "/dining", "/nature", "/about", "/destinations"
      ].includes(location.pathname) && <Navbar />}
>>>>>>> 1b419335 (Pending changes exported from your codespace)

      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Protected route */}
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        {/* Other public routes */}
        <Route path="/destinations" element={<Destinations />} />
        <Route path="/tourist-spots" element={<TouristSpots />} />
        <Route path="/thrilling-adventures" element={<ThrillingAdventures />} />
        <Route path="/culture" element={<Culture />} />
        <Route path="/articrafts" element={<Articrafts />} />
        <Route path="/festival" element={<Festival />} />
        <Route path="/delicacies" element={<Delicacies />} />
        <Route path="/stay" element={<Stay />} />
        <Route path="/dining" element={<Dining />} />
        <Route path="/nature" element={<Nature />} />
        <Route path="/about" element={<About />} />
        <Route path="/facts" element={<Facts />} />
        <Route path="/ex" element={<Ex />} />
<<<<<<< HEAD
        <Route path="/homepage" element={<HomePage />} />

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>

      {showLayout && <Footer />}
=======
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>

      {location.pathname !== "/" && <Footer />}
>>>>>>> 1b419335 (Pending changes exported from your codespace)
    </>
  );
};

// 🚀 App entry point
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router>
          <MainLayout />
        </Router>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
