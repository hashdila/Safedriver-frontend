import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar";
import Register from "./pages/Registration";
import Login from "./pages/Login";
import HomeLogged from "./pages/HomeLogged";
import Home from "./pages/Home";

const App = () => {
    const [view, setView] = useState("customer"); // Default to customer view
    const [user, setUser] = useState(null);

    // Simulate user login by checking localStorage
    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const handleViewSwitch = (newView) => {
        setView(newView);
    };

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

    return (
        <Router>
            <div>
                {/* Navbar is shown only if the user is logged in */}
                {user && (
                    <Navbar
                        user={user}
                        onLogout={handleLogout}
                        onViewSwitch={handleViewSwitch}
                        isDriver={view === "driver"}
                    />
                )}

                <Routes>
                    {/* Public routes */}
                    <Route path="/" element={<Home />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login onLogin={handleLogin} />} />

                    {/* HomeLogged is protected and only visible after login */}
                    {user && (
                        <Route
                            path="/homelogged"
                            element={<HomeLogged view={view} user={user} />}
                        />
                    )}
                </Routes>
            </div>
        </Router>
    );
};

export default App;
