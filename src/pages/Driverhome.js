import React, { useEffect, useState } from "react";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import L from "leaflet";

// Add custom icons to avoid default Leaflet marker icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
    iconUrl: require("leaflet/dist/images/marker-icon.png"),
    shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

// LocationPicker component to capture the click event on the map
const LocationPicker = ({ setLocation }) => {
    useMapEvents({
        click: (e) => {
            const { lat, lng } = e.latlng;
            setLocation({ latitude: lat, longitude: lng });
        },
    });

    return null; // This component does not render anything directly
};

const Driverhome = () => {
    const [view, setView] = useState("driver");  // Define the view state
    const [user, setUser] = useState(null);
    const [driverDetails, setDriverDetails] = useState(null);
    const [frontImage, setFrontImage] = useState(null);
    const [backImage, setBackImage] = useState(null);
    const [location, setLocation] = useState({ latitude: 0, longitude: 0 });

    useEffect(() => {
        const userData = localStorage.getItem('user');
        if (userData) {
            setUser(JSON.parse(userData));
        }
    }, []);


    useEffect(() => {
        if (user && user.email && view === "driver") {
            fetch("http://localhost:8080/api/driver-details")
                .then((response) => response.json())
                .then((data) => setDriverDetails(data))
                .catch((error) => console.error("Error fetching driver details:", error));
        }
    }, [user, view]);

    const handleFileChange = (e) => {
        const { name, files } = e.target;
        if (name === "frontImage") setFrontImage(files[0]);
        if (name === "backImage") setBackImage(files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!user || !user.email) {
            console.error("User data is missing or email is not available");
            alert("User data is missing or email is not available");
            return;
        }

        const formData = new FormData();
        formData.append("email", user.email);
        formData.append("frontImage", frontImage);
        formData.append("backImage", backImage);
        formData.append("latitude", location.latitude);
        formData.append("longitude", location.longitude);

        try {
            const response = await fetch("http://localhost:8080/api/user/verify", {
                method: "POST",
                body: formData,
            });

            if (response.ok) {
                alert("Verification submitted successfully!");
                window.location.reload();
            } else {
                console.error("Verification failed:", await response.text());
            }
        } catch (error) {
            console.error("Error during verification:", error);
        }
    };

    return (
        <div>
            <Navbar />
            <div className="container mx-auto px-4 py-8">
                <h2 className="text-2xl font-bold text-center mb-6">Driver Dashboard</h2>
                <div className="bg-white shadow-md rounded-lg p-6">
                    {driverDetails && driverDetails.isVerified ? (
                        <div className="text-center">
                            <p className="text-lg font-medium text-green-600">
                                Your identification has been verified.
                            </p>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Upload Front Side of License:
                                </label>
                                <input
                                    type="file"
                                    name="frontImage"
                                    onChange={handleFileChange}
                                    required
                                    className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Upload Back Side of License:
                                </label>
                                <input
                                    type="file"
                                    name="backImage"
                                    onChange={handleFileChange}
                                    required
                                    className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>
                            <div className="my-4">
                                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                                    Select Your Location on the Map:
                                </h3>
                                <MapContainer
                                    center={[location.latitude || 35.01987504801111, location.longitude || 135.75531005859378]}
                                    zoom={7}
                                    style={{ height: "300px", width: "100%" }}
                                    className="rounded-lg shadow-md"
                                >
                                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                                    <LocationPicker setLocation={setLocation} />
                                    {location.latitude && location.longitude && (
                                        <Marker position={[location.latitude, location.longitude]} />
                                    )}
                                </MapContainer>
                                {location.latitude && location.longitude && (
                                    <p className="text-sm text-gray-600 mt-2">
                                        Selected Location: {location.latitude}, {location.longitude}
                                    </p>
                                )}
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg"
                            >
                                Submit Verification
                            </button>
                        </form>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Driverhome;
