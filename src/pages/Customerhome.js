import React, { useEffect, useState } from "react";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const CustomerHome = () => {
    const [driver, setDriver] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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

    if (loading) {
        return (
            <div>
                <Navbar />
                <div className="p-4">Loading...</div>
                <Footer />
            </div>
        );
    }

    if (error) {
        return (
            <div>
                <Navbar />
                <div className="p-4">Error: {error}</div>
                <Footer />
            </div>
        );
    }

    if (!driver) {
        return (
            <div>
                <Navbar />
                <div className="p-4">No driver data available</div>
                <Footer />
            </div>
        );
    }

    return (
        <div>
            <Navbar />
            <div className="p-4">
                <h1 className="text-xl font-bold mb-4">Driver Location</h1>
                <MapContainer
                    center={[driver.latitude, driver.longitude]}
                    zoom={13}
                    style={{ width: "100%", height: "300px" }}
                >
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />
                    <Marker position={[driver.latitude, driver.longitude]}>
                        <Popup>{driver.name}</Popup>
                    </Marker>
                </MapContainer>
            </div>
            <Footer />
        </div>
    );
};

export default CustomerHome;
