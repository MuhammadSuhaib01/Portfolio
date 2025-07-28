import { useState } from "react";

import "./App.css";

import Navbar from "./components/ui/navbar";
import Hero from "./sections/hero";

function App() {
  return (
    <>
      <div className="container mx-auto max-w-7xl">
        <Navbar />
        {/* Hero Section */}
        <Hero />
        {/* About Section */}
        {/* Projects Section */}
        {/* Experiences Section */}
        {/* Contact Section */}
      </div>
    </>
  );
}

export default App;
