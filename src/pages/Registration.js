// 01.  - M24W0517 - Hewa Pathiranage Hashendra Dilan Nawarathna
// 02.  -M24W0383 - Bogati Surendra


import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Make sure to install axios to make API requests

function Register() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        address: "",
        phoneNumber: "",
        dateOfBirth: "", // Date of birth will be in the format YYYY-MM-DD
    });

    const [error, setError] = useState(""); // To track error messages
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:8080/api/user/register", formData); // Adjust the URL accordingly to your backend endpoint
            alert(response.data); // Show success message
            navigate("/login"); // Redirect to login page after successful registration
        } catch (error) {
            setError("Error: " + (error.response?.data || error.message)); // Show error message
        }
    };

    const handleSwitchToLogin = () => {
        navigate("/login"); // Navigate to login page
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
                <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">Register</h2>

                {/* Display error message */}
                {error && <div className="text-red-500 text-sm mb-4">{error}</div>}

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Name */}
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-600">Name</label>
                        <input
                            name="name"
                            type="text"
                            placeholder="Enter your name"
                            onChange={handleChange}
                            value={formData.name}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-600">Email</label>
                        <input
                            name="email"
                            type="email"
                            placeholder="Enter your email"
                            onChange={handleChange}
                            value={formData.email}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-600">Password</label>
                        <input
                            name="password"
                            type="password"
                            placeholder="Enter your password"
                            onChange={handleChange}
                            value={formData.password}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    {/* Address */}
                    <div>
                        <label htmlFor="address" className="block text-sm font-medium text-gray-600">Address</label>
                        <input
                            name="address"
                            type="text"
                            placeholder="Enter your address"
                            onChange={handleChange}
                            value={formData.address}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    {/* Phone Number */}
                    <div>
                        <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-600">Phone Number</label>
                        <input
                            name="phoneNumber"
                            type="text"
                            placeholder="Enter your phone number"
                            onChange={handleChange}
                            value={formData.phoneNumber}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    {/* Date of Birth */}
                    <div>
                        <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-600">Date of Birth</label>
                        <input
                            name="dateOfBirth"
                            type="date"
                            onChange={handleChange}
                            value={formData.dateOfBirth}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        Register
                    </button>
                </form>

                {/* Switch to Login Button */}
                <button
                    onClick={handleSwitchToLogin}
                    className="mt-4 w-full bg-gray-500 text-white py-2 rounded"
                >
                    Already have an account? Login
                </button>
            </div>
        </div>
    );
}

export default Register;
