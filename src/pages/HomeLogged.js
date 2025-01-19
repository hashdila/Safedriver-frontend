// 01.  - M24W0517 - Hewa Pathiranage Hashendra Dilan Nawarathna
// 02.  -M24W0383 - Bogati Surendra


import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet"; // Import the necessary modules
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import Navbar from "../components/navbar";

// Fix Leaflet icons issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
    iconUrl: require("leaflet/dist/images/marker-icon.png"),
    shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

const LocationPicker = ({ setLocation }) => {
    const [markerPosition, setMarkerPosition] = useState(null);

    useMapEvents({
        click: (e) => {
            const { lat, lng } = e.latlng;
            setMarkerPosition([lat, lng]);
            setLocation({ latitude: lat, longitude: lng }); // Update location state with the new lat and lng
        },
    });

    return markerPosition ? <Marker position={markerPosition} /> : null; // Render the marker when position is set
};

const HomeLogged = ({ view, user }) => {
    const [driverDetails, setDriverDetails] = useState(null);
    const [frontImage, setFrontImage] = useState(null);
    const [backImage, setBackImage] = useState(null);
    const [location, setLocation] = useState({ latitude: 0, longitude: 0 }); // Initialize location with default values

    useEffect(() => {
        if (view === "driver") {
            fetch("http://localhost:8080/api/driver-details")
                .then((response) => response.json())
                .then((data) => setDriverDetails(data))
                .catch((error) => console.error("Error fetching driver details:", error));
        }
    }, [view]);

    const handleFileChange = (e) => {
        const { name, files } = e.target;
        if (name === "frontImage") setFrontImage(files[0]);
        if (name === "backImage") setBackImage(files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("email", user.email); // Add user's email
        formData.append("frontImage", frontImage);
        formData.append("backImage", backImage);
        formData.append("latitude", location.latitude); // Send location latitude
        formData.append("longitude", location.longitude); // Send location longitude

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
        <div className="p-4">
            {view === "driver" ? (
                <div>
                    <h2 className="text-xl font-bold">Driver Dashboard</h2>
                    {driverDetails && driverDetails.isVerified ? (
                        <p>Your identification has been verified.</p>
                    ) : (
                        <form onSubmit={handleSubmit}>
                            <div>
                                <label>Upload Front Side of License:</label>
                                <input type="file" name="frontImage" onChange={handleFileChange} required />
                            </div>
                            <div>
                                <label>Upload Back Side of License:</label>
                                <input type="file" name="backImage" onChange={handleFileChange} required />
                            </div>
                            <div className="my-4">
                                <h3>Select Your Location on the Map:</h3>
                                <MapContainer
                                    center={[location.latitude || 7.8731, location.longitude || 80.7718]} // Ensure fallback location if undefined
                                    zoom={7}
                                    style={{ height: "300px", width: "100%" }}
                                >
                                    <TileLayer
                                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                    />
                                    <LocationPicker setLocation={setLocation} />
                                </MapContainer>
                                {location.latitude && location.longitude && (
                                    <p>
                                        Selected Location: {location.latitude}, {location.longitude}
                                    </p>
                                )}
                            </div>
                            <button type="submit" className="bg-blue-500 text-white p-2 rounded mt-2">
                                Submit Verification
                            </button>
                        </form>
                    )}
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default HomeLogged;
