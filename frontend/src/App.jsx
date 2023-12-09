import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/NavBarContainer';
import Footer from './components/Footer';
import Home from './pages/HomePage';
import Shop from './pages/ProductsPage';
import AboutUs from './pages/AboutUsPage';
import Login from './pages/LoginPage';
import Register from './pages/RegisterPage';
import CreateProductPage from './pages/CreateProductPage';
import PrivateRoutesWrapper from './routes/PrivateRoutesWrapper';
import PublicOnlyRoutesWrapper from './routes/PublicOnlyRoutesWrapper';



function App() {
  const publicRoutes = [
    { path: '/login', element: <Login /> },
    { path: '/register', element: <Register /> },
  ];

  const privateRoutes = [
    { path: '/sell', element: <CreateProductPage /> },
  ];

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route
          path="/*"
          element={
            <PublicOnlyRoutesWrapper routes={publicRoutes} />
          }
        />
        <Route
          path="/*"
          element={
            <PrivateRoutesWrapper routes={privateRoutes} />
          }
        />
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/about-us" element={<AboutUs />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;