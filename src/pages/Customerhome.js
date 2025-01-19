// 01.  - M24W0517 - Hewa Pathiranage Hashendra Dilan Nawarathna
// 02.  -M24W0383 - Bogati Surendra


import React, { useEffect, useState } from "react";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useNavigate } from "react-router-dom";

const CustomerHome = () => {
    const [selectedDriver, setSelectedDriver] = useState(null);
    const [driver, setDriver] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [locations, setLocations] = useState([]);
    const [userLocation, setUserLocation] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch the driver's details
        fetch("http://localhost:8080/api/driver/details")
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to fetch driver details");
                }
                return response.json();
            })
            .then((data) => {
                setDriver(data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching driver details:", error);
                setError(error.message);
                setLoading(false);
            });
    }, []);

    useEffect(() => {
        // Fetch all locations
        fetch("http://localhost:8080/api/user/all-locations")
            .then((response) => response.json())
            .then((data) => setLocations(data))
            .catch((error) => console.error("Error fetching locations:", error));
    }, []);

    useEffect(() => {
        // Get the user's current location
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setUserLocation({
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                    });
                },
                (error) => {
                    console.error("Error getting current location:", error);
                }
            );
        }
    }, []);

    const fetchDriverDetails = async (latitude, longitude) => {
        try {
            const response = await fetch(
                `http://localhost:8080/api/user/details/location?latitude=${latitude}&longitude=${longitude}`
            );
            if (response.ok) {
                const data = await response.json();
                setSelectedDriver(data);
            } else {
                console.error("No driver found for this location");
            }
        } catch (error) {
            console.error("Error fetching driver details:", error);
        }
    };

    const handleMarkerClick = (latitude, longitude) => {
        navigate(`/driverdetails?latitude=${latitude}&longitude=${longitude}`);
    };

    return (
        <div>
            <Navbar />


            <MapContainer
                center={userLocation ? [userLocation.latitude, userLocation.longitude] : [35.01987504801111, 135.75531005859378]}
                zoom={7}
                style={{ height: "400px", width: "100%" }}
            >
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                {/* Current location marker */}
                {userLocation && (
                    <Marker position={[userLocation.latitude, userLocation.longitude]}>
                        <Popup>
                            <p><strong>Your Location</strong></p>
                        </Popup>
                    </Marker>
                )}

                {/* Driver locations */}
                {locations.map((loc, index) => (
                    <Marker
                        key={index}
                        position={[loc.latitude, loc.longitude]}
                        eventHandlers={{
                            click: () => fetchDriverDetails(loc.latitude, loc.longitude),
                        }}
                    >
                        <Popup>
                            {selectedDriver ? (
                                <div>
                                    <p><strong>Name:</strong> {selectedDriver.name}</p>
                                    <p><strong>Email:</strong> {selectedDriver.email}</p>
                                    <p><strong>Phone:</strong> {selectedDriver.phoneNumber}</p>
                                    <p><strong>Address:</strong> {selectedDriver.address}</p>
                                </div>
                            ) : (
                                <p>Loading driver details...</p>
                            )}
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>

            <Footer />
        </div>
    );
};

export default CustomerHome;
