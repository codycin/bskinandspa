import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";

// Components
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import { BackToTopButton } from "./Components/BackToTopButton";

// Pages
import Home from "./Pages/HomePage";
import AboutPage from "./Pages/AboutPage";
import Services from "./Pages/ServicesPage";
import ContactPage from "./Pages/ContactPage";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Navbar />

      <main className="min-h-screen">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </main>
      <BackToTopButton />
      <Footer />
    </>
  );
}
