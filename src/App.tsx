import { useEffect } from "react";
import { Amenities } from "./components/Amenities";
import { Availability } from "./components/Availability";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import { Gallery } from "./components/Gallery";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { Interiors } from "./components/Interiors";
import { Location } from "./components/Location";
import { Project } from "./components/Project";
import { Team } from "./components/Team";
import { LanguageProvider } from "./language";

function ScrollToHash() {
  useEffect(() => {
    const id = window.location.hash.replace("#", "");
    if (!id) return;
    const timer = window.setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "auto", block: "start" });
    }, 120);
    return () => window.clearTimeout(timer);
  }, []);
  return null;
}

export default function App() {
  return (
    <LanguageProvider>
      <ScrollToHash />
      <Header />
      <main>
        <Hero />
        <Project />
        <Gallery />
        <Interiors />
        <Amenities />
        <Availability />
        <Team />
        <Location />
        <Contact />
      </main>
      <Footer />
    </LanguageProvider>
  );
}
