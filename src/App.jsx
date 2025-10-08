import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ProductsPage from "./pages/ProductsPage";
import './index.css'; // or './App.css'
<<<<<<< HEAD
import { MdContactPage } from "react-icons/md";
import ContactPage from "./pages/ContactPage";
=======
>>>>>>> 89d3951b4674bf40a936d5b0b50aacde21917b4a


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ProductsPage />} />
<<<<<<< HEAD
        <Route path="/contact" element={<ContactPage />} />
=======
>>>>>>> 89d3951b4674bf40a936d5b0b50aacde21917b4a
      </Routes>
    </Router>
  );
}

export default App;
