import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage.tsx";
import ProductsPage from "./pages/ProductsPage.tsx";
import ContactPage from "./pages/ContactPage.tsx";
import './index.css'; 
import RegisterFromPage from "./pages/RegisterFromPage.tsx";
import LoginPage from "./pages/LoginPage.tsx";
import VerifyPage from "./pages/VerifyPage.tsx";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/RegisterFormPage" element={<RegisterFromPage />} />
        <Route path="/LoginPage" element={<LoginPage />} />
        <Route path="/verify" element={<VerifyPage />} />
      </Routes>
    </Router>
  );
};

export default App;
