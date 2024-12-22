import React, { useState } from "react";

const Navbar = ({ user, onLogout, onViewSwitch, isDriver }) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);

    if (!user) return null; // Hide Navbar if no user is logged in

    const handleSwitchView = () => {
        onViewSwitch(isDriver ? "customer" : "driver");
    };

    return (
        <nav className="bg-blue-600 text-white">
            <div className="flex justify-between items-center p-4">
                <a href="/" className="text-2xl font-bold">
                    Safe Drive
                </a>
                <div className="flex items-center space-x-4">
                    <button
                        onClick={handleSwitchView}
                        className="bg-white text-blue-600 px-4 py-2 rounded-md"
                    >
                        Switch to {isDriver ? "Customer" : "Driver"}
                    </button>
                    <div className="relative">
                        <button
                            onClick={() => setDropdownOpen(!dropdownOpen)}
                            className="flex items-center space-x-2 focus:outline-none"
                        >
                            <img
                                src={user.image || "default_image_url.jpg"}
                                alt="User Profile"
                                className="w-8 h-8 rounded-full"
                            />
                            <span className="hidden md:inline-block">{user.name}</span>
                        </button>
                        {dropdownOpen && (
                            <div className="absolute right-0 mt-2 bg-white text-black rounded-lg shadow-lg w-32">
                                <button
                                    onClick={onLogout}
                                    className="block w-full px-4 py-2 text-left hover:bg-blue-100"
                                >
                                    Logout
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
