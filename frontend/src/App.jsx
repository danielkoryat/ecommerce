import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/navbar/NavBarContainer.jsx";
import Home from "./pages/HomePage.jsx"
import Shop from "./pages/ProductsPage.jsx";
import AboutUs from "./pages/AboutUsPage.jsx";
import Login from "./pages/LoginPage.jsx";
import Register from "./pages/RegisterPage.jsx";
import CreateProductPage from "./pages/CreateProductPage.jsx";
import Footer from "./components/Footer.jsx";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/sell" element={<CreateProductPage />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
