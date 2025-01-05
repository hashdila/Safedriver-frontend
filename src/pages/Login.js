import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [user, setUser] = useState(null); // Initialize user state here
    const navigate = useNavigate(); // Get navigate function

    const handleLogin = async (loginRequest) => {
        try {
            const response = await fetch('http://localhost:8080/api/user/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(loginRequest),
            });

            if (response.ok) {
                const user = await response.json();
                // Save user data in localStorage or state
                localStorage.setItem('user', JSON.stringify(user));
                setUser(user); // Set the user state

                // Navigate and then refresh the page
                navigate("/customerhome");
                setTimeout(() => {
                    window.location.reload(); // Refresh the page to reflect new state
                }, 0);
            } else {
                console.error("Login failed:", await response.text());
            }
        } catch (error) {
            console.error("Error during login:", error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        handleLogin(formData); // Call the handleLogin function when submitting the form
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
