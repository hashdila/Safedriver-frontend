import React from "react";

const Footer = () => {
    return (
        <footer className="bg-blue-600 text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Top Section */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* About Section */}
                    <div>
                        <h4 className="text-lg font-semibold">About Us</h4>
                        <p className="mt-2 text-sm">
                            We provide excellent services to ensure customer satisfaction. Stay connected for updates and more information.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-lg font-semibold">Quick Links</h4>
                        <ul className="mt-2 space-y-2">
                            <li>
                                <a href="#home" className="hover:underline">
                                    Home
                                </a>
                            </li>
                            <li>
                                <a href="#about" className="hover:underline">
                                    About
                                </a>
                            </li>
                            <li>
                                <a href="#services" className="hover:underline">
                                    Services
                                </a>
                            </li>
                            <li>
                                <a href="#contact" className="hover:underline">
                                    Contact
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Section */}
                    <div>
                        <h4 className="text-lg font-semibold">Contact Us</h4>
                        <p className="mt-2 text-sm">
                            Email: <a href="mailto:info@example.com" className="hover:underline">info@example.com</a>
                        </p>
                        <p className="mt-2 text-sm">Phone: +123 456 7890</p>
                        <div className="mt-4 flex space-x-4">
                            <a href="#" className="hover:text-gray-300">
                                <svg
                                    className="w-6 h-6"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M22.54 6.42c-.81.36-1.69.61-2.61.72a4.67 4.67 0 002.04-2.56 9.33 9.33 0 01-2.94 1.12 4.66 4.66 0 00-7.95 4.25A13.25 13.25 0 013.16 4.64 4.66 4.66 0 004.75 10a4.64 4.64 0 01-2.1-.58v.06a4.66 4.66 0 003.74 4.57 4.69 4.69 0 01-2.1.08 4.66 4.66 0 004.35 3.23A9.33 9.33 0 012 18.57a13.2 13.2 0 007.16 2.1c8.59 0 13.28-7.12 13.28-13.28 0-.2-.01-.39-.02-.58a9.52 9.52 0 002.34-2.43" />
                                </svg>
                            </a>
                            <a href="#" className="hover:text-gray-300">
                                <svg
                                    className="w-6 h-6"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M19.7 2H4.3C3.58 2 3 2.58 3 3.3v17.4c0 .72.58 1.3 1.3 1.3h8.4v-7.54h-2.56v-2.94h2.56v-2.2c0-2.53 1.55-3.9 3.82-3.9 1.09 0 2.03.08 2.3.12v2.66h-1.58c-1.24 0-1.48.59-1.48 1.45v1.9h2.96l-.39 2.94h-2.57V22h5.05c.72 0 1.3-.58 1.3-1.3V3.3c0-.72-.58-1.3-1.3-1.3z" />
                                </svg>
                            </a>
                            <a href="#" className="hover:text-gray-300">
                                <svg
                                    className="w-6 h-6"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M12 2.04c-5.5 0-10 4.5-10 10.01 0 5.01 3.66 9.14 8.44 9.87v-6.98h-2.54v-2.89h2.54v-2.21c0-2.51 1.49-3.89 3.78-3.89 1.09 0 2.2.19 2.2.19v2.43h-1.24c-1.22 0-1.6.76-1.6 1.54v1.93h2.84l-.45 2.89h-2.39V22c4.78-.73 8.44-4.86 8.44-9.87 0-5.5-4.5-10-10-10z" />
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="mt-8 border-t border-gray-200 pt-4 text-center">
                    <p className="text-sm">
                        &copy; {new Date().getFullYear()} Your Company. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
