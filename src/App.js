import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Register from "./pages/Registration";
import Login from "./pages/Login";
import DriverHome from "./pages/DriverHome";

import Registration from "./pages/Registration";

function App() {
  return (

      // <Registration/>
      <Router>
        <Routes>
          <Route path="/" element={<Register />} />  {/* Default route to Register */}
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/driverhome" element={<DriverHome/>} />
        </Routes>
      </Router>
  );
}

export default App;
