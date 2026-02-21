import Navbar from "./Components/Navbar";
import { Routes, Route } from "react-router-dom";

import Home from "./Pages/HomePage";
import About from "./Pages/AboutPage";
import Services from "./Pages/ServicesPage";
import Contact from "./Pages/ContactPage";

const routes = [
  { path: "/", element: <Home /> },
  { path: "/about", element: <About /> },
  { path: "/services", element: <Services /> },
  { path: "/contact", element: <Contact /> },
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
    </>
  );
}
