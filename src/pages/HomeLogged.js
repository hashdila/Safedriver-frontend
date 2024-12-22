import Navbar from "../components/navbar";
import React, { useState, useEffect } from "react";

const HomeLogged = ({ view, user }) => {
    const [driverDetails, setDriverDetails] = useState(null); // Driver-specific data
    const [customerDetails, setCustomerDetails] = useState(null); // Customer-specific data

    useEffect(() => {
        if (view === "driver") {
            // Fetch driver-specific data
            fetch("http://localhost:8080/api/driver-details")
                .then((response) => response.json())
                .then((data) => setDriverDetails(data))
                .catch((error) => console.error("Error fetching driver details:", error));
        } else if (view === "customer") {
            // Fetch customer-specific data
            fetch("http://localhost:8080/api/customer-details")
                .then((response) => response.json())
                .then((data) => setCustomerDetails(data))
                .catch((error) => console.error("Error fetching customer details:", error));
        }
    }, [view]);

    return (
        <div className="p-4">
            {view === "driver" && driverDetails ? (
                <div>
                    <h2 className="text-xl font-bold">Driver Dashboard</h2>
                    <p>ID Verified: {driverDetails.isVerified ? "Yes" : "No"}</p>
                    <p>Location: {driverDetails.location}</p>
                    {/* Additional driver data */}
                </div>
            ) : view === "customer" && customerDetails ? (
                <div>
                    <h2 className="text-xl font-bold">Customer Dashboard</h2>
                    <p>Welcome, {customerDetails.name}</p>
                    {/* Additional customer data */}
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default HomeLogged;
