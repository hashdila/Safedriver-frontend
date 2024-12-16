import Navbar from "../components/navbar";
import Footer from "../components/footer";

function DriverHome() {
    return (

        <div className="min-h-screen bg-gray-100 flex flex-col">
            <Navbar />
            {/* Header */}
            {/*<header className="bg-blue-600 text-white p-4 flex justify-between items-center">*/}
            {/*    <h1 className="text-xl font-bold">Driver Dashboard</h1>*/}
            {/*    <nav>*/}
            {/*        <ul className="flex space-x-4">*/}
            {/*            <li><a href="#requests" className="hover:underline">Ride Requests</a></li>*/}
            {/*            <li><a href="#profile" className="hover:underline">Profile</a></li>*/}
            {/*            <li><a href="#logout" className="hover:underline">Logout</a></li>*/}
            {/*        </ul>*/}
            {/*    </nav>*/}
            {/*</header>*/}

            {/* Main Content */}
            <main className="flex-1 p-6">
                <section id="requests" className="mb-8">
                    <h2 className="text-2xl font-bold mb-4">Pending Ride Requests</h2>
                    <div className="bg-white p-4 rounded shadow">
                        <p className="text-gray-700">No ride requests available.</p>
                    </div>
                </section>

                <section id="profile">
                    <h2 className="text-2xl font-bold mb-4">Profile</h2>
                    <div className="bg-white p-4 rounded shadow">
                        <p className="text-gray-700">Name: John Doe</p>
                        <p className="text-gray-700">License Number: ABC123456</p>
                        <p className="text-gray-700">Vehicle: Toyota Prius</p>
                    </div>
                </section>
            </main>

            <Footer/>
        </div>
    );
}

// Export the component (no need to call it here)
export default DriverHome;
