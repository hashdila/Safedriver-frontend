import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const DriverDetails = () => {
    const [searchParams] = useSearchParams();
    const [driver, setDriver] = useState(null);  // Initial state is null
    const latitude = searchParams.get("latitude");
    const longitude = searchParams.get("longitude");

    useEffect(() => {
        if (latitude && longitude) {
            console.log("Latitude:", latitude, "Longitude:", longitude);  // Check values
            fetch(`http://localhost:8080/api/user/driver-by-location?latitude=${latitude}&longitude=${longitude}`)
                .then((response) => {
                    if (response.ok) return response.json();
                    throw new Error("Driver not found");
                })
                .then((data) => {
                    console.log("Driver data:", data); // Check if data is coming through
                    setDriver(data);  // Update the state with the driver data
                })
                .catch((error) => {
                    console.error("Error fetching driver details:", error);
                    setDriver(null);  // Reset the state if there's an error
                });
        }
    }, [latitude, longitude]);

    // Check if driver data exists before rendering
    return (
        <div>
            <h2>Driver Details</h2>
            {driver ? (
                <>
                    <p><strong>Name:</strong> {driver.name}</p>
                    <p><strong>Email:</strong> {driver.email}</p>
                    <p><strong>Address:</strong> {driver.address}</p>
                    <p><strong>Phone Number:</strong> {driver.phoneNumber}</p>
                    <p><strong>Date of Birth:</strong> {driver.dateOfBirth}</p>
                </>
            ) : (
                <p>Loading driver details...</p>  // Show loading message while fetching
            )}
        </div>
    );
};

export default DriverDetails;
