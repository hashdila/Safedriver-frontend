import Navbar from "../components/navbar";
import Footer from "../components/footer";
import { useNavigate } from "react-router-dom"; // Import useNavigate

function Home() {
    const navigate = useNavigate();

    const handleSwitchTologin = () => {
        navigate("/login"); // Navigate to Register page
    };
    return (


        <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
            {/* App Title */}
            <h1 className="text-4xl md:text-5xl font-bold text-blue-600 mb-12">
                Safe Drive Application
            </h1>

            {/* Buttons Section */}
            <div className="space-y-6">
                {/* Driver Button */}
                <button
                    onClick={(handleSwitchTologin)}
                    className="w-64 sm:w-80 h-20 bg-blue-500 text-white text-xl md:text-2xl font-semibold rounded-lg shadow-lg hover:bg-blue-600 transition"
                >
                    I am a Driver
                </button>

                {/* Finder Button */}
                <button
                    onClick={() => alert("Finder option selected!")}
                    className="w-64 sm:w-80 h-20 bg-green-500 text-white text-xl md:text-2xl font-semibold rounded-lg shadow-lg hover:bg-green-600 transition"
                >
                    I am a Finder
                </button>
            </div>
        </div>

    );
}

// Export the component (no need to call it here)
export default Home;
