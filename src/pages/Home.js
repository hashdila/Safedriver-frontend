import React, { useState } from "react"; // Import useState
import { useNavigate } from "react-router-dom"; // Import useNavigate
import Navbar from "../components/navbar";
import Footer from "../components/footer";

function Home() {
    const navigate = useNavigate();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const handleSwitchToLogin = (role) => {
        if (role === "driver") {
            navigate("/login?role=driver"); // Navigate to Driver login
        } else if (role === "customer") {
            navigate("/login?role=customer"); // Navigate to Customer login
        }
    };

    const toggleDropdown = () => {
        setIsDropdownOpen((prev) => !prev);
    };

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Header Section */}
            <header className="bg-white text-plack py-4 px-6 flex justify-between items-center shadow-md">
                <h1 className="text-2xl font-bold">Safe Drive</h1>
                <div className="relative">
                    <button
                        onClick={toggleDropdown}
                        className="bg-white text-black px-4 py-2 rounded-md shadow hover:bg-gray-100"
                    >
                        Login
                    </button>
                    {isDropdownOpen && (
                        <div className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg">
                            <ul className="text-left text-black">
                                <li
                                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                    onClick={() => handleSwitchToLogin("driver")}
                                >
                                    Driver
                                </li>
                                <li
                                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                    onClick={() => handleSwitchToLogin("customer")}
                                >
                                    Customer
                                </li>
                            </ul>
                        </div>
                    )}
                </div>
            </header>

            {/* Main Content */}
            <main className="flex flex-col items-center mt-6 px-4">
                {/* Map Section */}
                <div className="w-full max-w-4xl bg-white shadow-md rounded-lg p-6 mb-6">
                    <h2 className="text-xl font-semibold mb-4">Map</h2>
                    <div className="h-64 bg-gray-200 flex items-center justify-center rounded-md">
                        <p className="text-gray-500">Map Placeholder</p>
                    </div>
                </div>

                {/* Terms and Conditions Section */}
                <div className="w-full max-w-4xl bg-white shadow-md rounded-lg p-6">
                    <h2 className="text-xl font-semibold mb-4">Terms and Conditions</h2>
                    <div className="h-32 bg-gray-100 flex items-center justify-center rounded-md">
                        <p className="text-gray-500">Terms and Conditions Placeholder</p>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default Home;
