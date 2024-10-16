import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import "./App.css";
import Login from "./component/form/Login";
import Registration from "./component/form/Registration";
import { useState } from "react";
import { AuthProvider } from "./component/form/Authprovider";
import Home from "./pages/Home.js";
import Navbar from "./component/Navbar.js";
import FitnessForm from "./component/FitnessForm.js";
import { FitnessProvider } from "./contextapi/FitnessProvider.js";
import Dashboard from "./Dashboard/Dashboard.js";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  return (
    <AuthProvider>
      <Router>
        <AppRoutes isAuthenticated={isAuthenticated} onLogin={handleLogin} />
      </Router>
    </AuthProvider>
  );
}

function AppRoutes({ isAuthenticated, onLogin }) {
  const location = useLocation();

  const shouldShowHeader = !["/login", "/registration"].includes(
    location.pathname
  );

  return (
    <div className="App">
      {shouldShowHeader && <Navbar />}
      <FitnessProvider>
        <Routes>
          <Route
            path="/"
            element={isAuthenticated ? <Home /> : <Navigate to="/login" />}
          />
          <Route path="/login" element={<Login onLogin={onLogin} />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/fitnessform" element={<FitnessForm />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </FitnessProvider>
    </div>
  );
}

export default App;
