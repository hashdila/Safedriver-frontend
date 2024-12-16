import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { login } from "../services/auth";

function Login() {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const navigate = useNavigate();  // Get navigate function

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(formData.email, formData.password); // Call login function
            navigate("/driverhome"); // Navigate to the driver home page
        } catch (error) {
            console.error("Login failed:", error); // Optionally log the error for debugging
        }
    };
    const handleSwitchToRegister = () => {
        navigate("/register"); // Navigate to Register page
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
                <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <input
                            name="email"
                            type="email"
                            placeholder="Email"
                            className="w-full p-2 border border-gray-300 rounded-md"
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <input
                            name="password"
                            type="password"
                            placeholder="Password"
                            className="w-full p-2 border border-gray-300 rounded-md"
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
                    >
                        Login
                    </button>
                </form>

                <div className="mt-4 text-center">
                    <button
                        onClick={handleSwitchToRegister}
                        className="text-blue-500 hover:text-blue-700"
                    >
                        Don't have an account? Register here
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Login;
