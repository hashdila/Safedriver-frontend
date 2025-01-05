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
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch the driver's details (replace the URL with your actual API endpoint)
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
        fetch("http://localhost:8080/api/user/all-locations")
            .then((response) => response.json())
            .then((data) => setLocations(data))
            .catch((error) => console.error("Error fetching locations:", error));
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



    useEffect(() => {
        fetch("http://localhost:8080/api/user/all-locations")
            .then((response) => response.json())
            .then((data) => setLocations(data))
            .catch((error) => console.error("Error fetching locations:", error));
    }, []);

    const handleMarkerClick = (latitude, longitude) => {
        navigate(`/driverdetails?latitude=${latitude}&longitude=${longitude}`);
    };



    return (
        <div>
            <Navbar />
            <div className="p-4">No driver data available</div>

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
