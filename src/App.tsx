import { useEffect } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AdminApp } from "./admin/AdminApp";
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
import { WhatsAppFloat } from "./components/WhatsAppFloat";
import { LanguageProvider } from "./language";
import { SiteProvider } from "./site";
import { useReveal } from "./useReveal";

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

function PublicSite() {
  useReveal();

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
      <WhatsAppFloat />
    </LanguageProvider>
  );
}

export default function App() {
  return (
    <SiteProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PublicSite />} />
          <Route path="/admin/*" element={<AdminApp />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </SiteProvider>
  );
}
