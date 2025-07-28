import { useState } from "react";

import "./App.css";

import Navbar from "./components/ui/navbar";
import Hero from "./sections/hero";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Navbar />
      {/* Hero Section */}
      <Hero />
      {/* About Section */}
      {/* Projects Section */}
      {/* Experiences Section */}
      {/* Contact Section */}
    </>
  );
}

export default App;
