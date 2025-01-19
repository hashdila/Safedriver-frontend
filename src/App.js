// 01.  - M24W0517 - Hewa Pathiranage Hashendra Dilan Nawarathna
// 02.  -M24W0383 - Bogati Surendra


import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar";
import Register from "./pages/Registration";
import Login from "./pages/Login";
import HomeLogged from "./pages/HomeLogged";
import Home from "./pages/Home";
import Driverhome from "./pages/Driverhome";
import Customerhome from "./pages/Customerhome";
import Footer from "./components/footer";
import DriverDetails from "./pages/DriverDetails";



const App = () => {
    const [user, setUser] = useState(null); // Simulate logged-in user
    const [view, setView] = useState("customer"); // Default to Customer view





    const handleLogout = () => {
        localStorage.removeItem("user");
        setUser(null);
        window.location.href = "/home"; // Redirect to home page after logout
    };

    const handleLogin = (userData) => {
        // Store user data in localStorage when logging in
        localStorage.setItem("user", JSON.stringify(userData));
        setUser(userData);
        window.location.reload(); // Refresh the page after login to reflect the changes
    };

    // Switch between driver and customer views
    const handleSwitchView = (newView) => {
        setView(newView); // Update view to Driver or Customer
    };

    return (
        <Router>
            <div>




                <Routes>
                    {/* Public routes */}
                    <Route path="/" element={<Home />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login onLogin={handleLogin} />} />
                    <Route path="/driverhome" element={<Driverhome />} />
                    <Route path="/customerhome" element={<Customerhome />} />
                    <Route path="/navbar" element={<Navbar />} />
                    <Route path="/footer" element={<Footer />} />
                    <Route path="/DriverDetails" element={<DriverDetails />} />


                    
                </Routes>
            </div>
        </Router>
    );
};

export default App;
