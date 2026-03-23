import Navbar from "./Components/Navbar";
import { Routes, Route } from "react-router-dom";

import Home from "./Pages/HomePage";
import AboutPage from "./Pages/AboutPage";
import Services from "./Pages/ServicesPage";
import ContactPage from "./Pages/ContactPage";
import Footer from "./Components/Footer";

const routes = [
  { path: "/", element: <Home /> },
  { path: "/about", element: <AboutPage /> },
  { path: "/services", element: <Services /> },
  { path: "/contact", element: <ContactPage /> },
];

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        {routes.map(({ path, element }) => (
          <Route key={path} path={path} element={element} />
        ))}
      </Routes>
      <Footer />
    </>
  );
}
