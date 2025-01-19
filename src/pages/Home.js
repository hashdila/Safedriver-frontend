// 01.  - M24W0517 - Hewa Pathiranage Hashendra Dilan Nawarathna
// 02.  -M24W0383 - Bogati Surendra


import React, {useEffect, useState} from "react"; // Import useState
import { useNavigate } from "react-router-dom"; // Import useNavigate
import Navbar from "../components/navbar";  // If Navbar is being used
import Footer from "../components/footer";  // If Footer is being used
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

function Home() {
    const navigate = useNavigate();
    const [locations, setLocations] = useState([]);

    const handleSwitchToRegister = () => {
        navigate("/login"); // Navigate to Login page (or Register if needed)
    };

    useEffect(() => {
        fetch("http://localhost:8080/api/user/all-locations")
            .then((response) => response.json())
            .then((data) => setLocations(data))
            .catch((error) => console.error("Error fetching locations:", error));
    }, []);





    return (
        <div className="min-h-screen flex flex-col bg-gray-100">
            {/* Header Section */}
            <header className="bg-blue-600 text-white py-4 px-6 shadow-md">
                <div className="container mx-auto flex justify-between items-center">
                    <h1 className="text-2xl font-bold">Safe Drive</h1>
                    <button
                        onClick={handleSwitchToRegister}
                        className="bg-white text-blue-600 px-4 py-2 rounded-md shadow hover:bg-gray-100"
                    >
                        Login
                    </button>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-grow">
                <div className="container mx-auto px-4 py-6">
                    {/* Map Section */}
                    <div className="mb-8">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">Explore Locations</h2>
                        <div className="rounded-lg shadow-md overflow-hidden">
                            <MapContainer
                                center={[35.01987504801111, 135.75531005859378]}
                                zoom={7}
                                style={{ height: "400px", width: "100%" }}
                            >
                                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                                {locations.map((loc, index) => (
                                    <Marker key={index} position={[loc.latitude, loc.longitude]} />
                                ))}
                            </MapContainer>
                        </div>
                    </div>

                    {/* Terms and Conditions Section */}
                    <div className="bg-white shadow-md rounded-lg p-6">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">Terms and Conditions</h2>
                        <div className="h-64 bg-gray-50 p-4 rounded-md overflow-y-auto">
                            <p className="text-gray-700 mb-2">
                                <strong>1. Driver Allocation for Customers Under the Influence:</strong>
                                Drivers will be allocated to customers who may be under the influence of alcohol only
                                after a proper assessment of safety and compliance with local regulations. The driver
                                reserves the right to refuse service if the customer poses a risk to their safety or
                                that of others.
                            </p>
                            <p className="text-gray-700 mb-2">
                                <strong>2. Customer Responsibility:</strong> Customers must provide accurate pickup and
                                drop-off details. Any inappropriate behavior, including harassment or abuse of the
                                driver, will result in immediate termination of service and potential reporting to
                                authorities.
                            </p>
                            <p className="text-gray-700 mb-2">
                                <strong>3. Driver Responsibility:</strong> Drivers must provide professional and
                                courteous service at all times. Drivers are prohibited from consuming alcohol or any
                                intoxicating substances while on duty.
                            </p>
                            <p className="text-gray-700 mb-2">
                                <strong>4. Service Refusal:</strong> Drivers have the right to refuse service if the
                                customer's behavior endangers their safety or violates the platform’s guidelines.
                            </p>
                            <p className="text-gray-700 mb-2">
                                <strong>5. Liability:</strong> The platform is not responsible for any accidents,
                                injuries, or damages caused during the service. Both customers and drivers must adhere
                                to traffic laws and regulations.
                            </p>
                            <p className="text-gray-700 mb-2">
                                <strong>6. Payment Policy:</strong> Customers must pay the agreed fare upon service
                                completion. Any disputes regarding payment must be resolved with the platform’s support
                                team.
                            </p>
                            <p className="text-gray-700 mb-2">
                                <strong>7. Privacy and Confidentiality:</strong> All customer and driver information
                                collected will be handled in accordance with the platform's privacy policy.
                            </p>
                            <p className="text-gray-700 mb-2">
                                <strong>8. Emergency Protocols:</strong> In case of emergencies, both customers and
                                drivers must prioritize their safety and report the incident to local authorities as
                                well as the platform.
                            </p>
                        </div>
                    </div>
                </div>
            </main>

            {/* Footer Section */}
            <footer className="bg-blue-600 text-white py-4">
                <div className="container mx-auto text-center">
                    <p>&copy; 2025 Safe Drive. All Rights Reserved.</p>
                </div>
            </footer>
        </div>
    );
}

export default Home;
