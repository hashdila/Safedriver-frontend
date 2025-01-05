import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Navbar = () => {
    const [loggedIn, setLoggedIn] = useState(false); // Track login state
    const [driver, setDriver] = useState(null); // Store driver data
    const navigate = useNavigate(); // Use navigate for redirection

    useEffect(() => {
        // Check if user is logged in by checking localStorage
        const userData = localStorage.getItem('user');
        if (userData) {
            const user = JSON.parse(userData);
            setDriver(user); // Set user data from localStorage
            setLoggedIn(true); // Update login state
        }
    }, []);

    const handleLogout = () => {
        // Clear user data from localStorage
        localStorage.removeItem('user');
        setLoggedIn(false); // Update the login state to false
        setDriver(null); // Clear the driver data

        // Navigate to the home page or login page
        navigate("/"); // Redirect to the home page
    };

    const navigateToDriverPage = () => {
        navigate("/driverhome"); // Redirect to the driver-specific page
    };

    const navigateToCustomerPage = () => {
        navigate("/customerhome"); // Redirect to the customer-specific page
    };

    return (
        <nav className="bg-blue-600 p-4 flex justify-between items-center">
            <div className="text-white font-bold text-xl">Safe Drive</div>

            {loggedIn && driver ? (
                <div className="flex items-center space-x-4">
                    <div className="text-white">{driver.name}</div>
                    <img
                        src={driver.imageUrl || 'https://via.placeholder.com/150'} // Use a placeholder if imageUrl is not available
                        alt="Profile"
                        className="w-10 h-10 rounded-full border-2 border-white"
                    />
                    <div className="flex space-x-4">
                        {/* Conditionally render buttons for driver and customer */}
                        <button
                            onClick={navigateToDriverPage}
                            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                        >
                            Driver
                        </button>
                        <button
                            onClick={navigateToCustomerPage}
                            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                        >
                            Customer
                        </button>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                    >
                        Logout
                    </button>
                </div>
            ) : (
                <div className="text-white">
                    <button className="px-4 py-2 rounded bg-green-500 hover:bg-green-600 text-white">
                        Login
                    </button>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
