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
        <div className="min-h-screen bg-gray-100">
            {/* Header Section */}
            <header className="bg-white text-black py-4 px-6 flex justify-between items-center shadow-md">
                <h1 className="text-2xl font-bold">Safe Drive</h1>
                <div className="relative">
                    <button
                        onClick={handleSwitchToRegister}  // Corrected to handleSwitchToRegister
                        className="bg-white text-black px-4 py-2 rounded-md shadow hover:bg-gray-100"
                    >
                        Login
                    </button>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex flex-col items-center mt-6 px-4">
                {/* Map Section */}
                <MapContainer
                    center={[7.8731, 80.7718]} // Default center
                    zoom={7}
                    style={{ height: "400px", width: "100%" }}
                >
                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                    {locations.map((loc, index) => (
                        <Marker
                            key={index}
                            position={[loc.latitude, loc.longitude]}
                        />
                    ))}
                </MapContainer>

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
