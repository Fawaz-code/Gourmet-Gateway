import React from "react";
import { Toaster } from "@/components/ui/toaster";
import Navbar from "./components/Navbar";
import SpecialsTicker from "./components/SpecialsTicker";
import Hero from "./components/Hero";
import Stats from "./components/Stats";
import About from "./components/About";
import Menu from "./components/Menu";
import Gallery from "./components/Gallery";
import Testimonials from "./components/Testimonials";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import WhatsAppButton from "./components/WhatsAppButton";
import TastyAI from "./components/TastyAI";

function App() {
  return (
    <div className="relative min-h-screen bg-background font-sans text-foreground">
      <Navbar />
      <SpecialsTicker />
      <main>
        <Hero />
        <Stats />
        <About />
        <Menu />
        <Gallery />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
      <WhatsAppButton />
      <TastyAI />
      <Toaster />
    </div>
  );
}

export default App;
