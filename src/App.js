import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Register from "./pages/Registration";
import Login from "./pages/Login";
import DriverHome from "./pages/DriverHome";
import Home from "./pages/Home"

import Registration from "./pages/Registration";

function App() {
  return (

      // <Registration/>
      <Router>
        <Routes>
           {/* Default route to Register */}
            <Route path="/" element={<Home />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/login" element={<Login />} />
          <Route path="/driverhome" element={<DriverHome/>} />
        </Routes>
      </Router>
  );
}

export default App;
