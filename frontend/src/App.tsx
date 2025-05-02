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

import Home from "./pages/Home";
import Destinations from "./pages/Destinations";
import TouristSpots from "./pages/TouristSpots";
import ThrillingAdventures from "./pages/ThrillingAdventures";
import Culture from "./pages/Culture";
import Articrafts from "./pages/Articrafts";
import Festival from "./pages/Festival";
import Delicacies from "./pages/Delicacies";
import Stay from "./pages/Stay";
import Dining from "./pages/Dining";
import Nature from "./pages/Nature";
import About from "./pages/About";
import Facts from "./pages/Facts";
import Ex from "./pages/Ex";
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

// 🧠 MainLayout wraps routes + layout elements
const MainLayout: React.FC = () => {
  const location = useLocation();
  const { user } = useAuth();
  const showLayout = location.pathname !== "/";

  return (
    <>
      {showLayout && <Navbar />}

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
        <Route path="/homepage" element={<HomePage />} />

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>

      {showLayout && <Footer />}
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
