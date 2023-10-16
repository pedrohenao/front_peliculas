import React from "react";
import NavBar from "../components/ui/NavBar";
import Genero from "../components/generos/Genero";
import { Route, Routes } from "react-router-dom";
import NotFound from "../components/ui/NotFound";
import Footer from "../components/ui/Footer";

export default function AppRouter() {
  return (
    <div>
      <NavBar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Genero />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}
