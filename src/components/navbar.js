import React, { useState } from "react";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

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
