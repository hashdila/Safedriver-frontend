import React, { useState } from "react";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false); // Mobile menu state
    const [dropdownOpen, setDropdownOpen] = useState(false); // Profile dropdown state

    const user = {
        name: "John Doe",
        image: "https://images.app.goo.gl/crwvVFeKpKaTTPhEA", // Replace with user image URL
    };

    const handleLogout = () => {
        // Perform logout logic here
        console.log("User logged out");
        // Example: Clear localStorage and redirect to login
        localStorage.removeItem("token");
        window.location.href = "/home";
    };

    return (
        <nav className="bg-blue-600 text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    {/* Logo Section */}
                    <div className="flex items-center">
                        <a href="/" className="text-2xl font-bold">
                            Logo
                        </a>
                    </div>

                    {/* Menu Items */}
                    <div className="hidden md:flex space-x-4 items-center">
                        <a href="#home" className="hover:text-gray-300">
                            Home
                        </a>
                        <a href="#about" className="hover:text-gray-300">
                            About
                        </a>
                        <a href="#services" className="hover:text-gray-300">
                            Services
                        </a>
                        <a href="#contact" className="hover:text-gray-300">
                            Contact
                        </a>
                    </div>

                    {/* Profile Section */}
                    <div className="flex items-center relative">
                        {/* User Image and Name */}
                        <button
                            onClick={() => setDropdownOpen(!dropdownOpen)}
                            className="flex items-center space-x-2 focus:outline-none"
                        >
                            <img
                                src={user.image}
                                alt="User Profile"
                                className="w-8 h-8 rounded-full"
                            />
                            <span className="hidden md:inline-block">{user.name}</span>
                        </button>

                        {/* Dropdown Menu */}
                        {dropdownOpen && (
                            <div className="absolute right-0 mt-12 bg-white text-black rounded-lg shadow-lg w-32">
                                <button
                                    onClick={handleLogout}
                                    className="block w-full px-4 py-2 text-left hover:bg-blue-100"
                                >
                                    Logout
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="flex items-center md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-white hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-white"
                        >
                            <svg
                                className="h-6 w-6"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                {isOpen ? (
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                ) : (
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16m-7 6h7"
                                    />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden bg-blue-700">
                    <a href="#home" className="block px-4 py-2 hover:bg-blue-500">
                        Home
                    </a>
                    <a href="#about" className="block px-4 py-2 hover:bg-blue-500">
                        About
                    </a>
                    <a href="#services" className="block px-4 py-2 hover:bg-blue-500">
                        Services
                    </a>
                    <a href="#contact" className="block px-4 py-2 hover:bg-blue-500">
                        Contact
                    </a>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
