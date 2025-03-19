import React from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";
import Footer from "./components/footer";
import Contact from "./components/Contact";

const App = () => (
  <div>
    <Navbar />
    <Hero />
    <About />
    <Projects />
    <Contact />
    <Footer />
  </div>
);

export default App;
