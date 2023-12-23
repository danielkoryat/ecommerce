import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "./app/categorySlice";
import Navbar from "./components/navbar/NavBarContainer.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./pages/HomePage.jsx";
import Shop from "./pages/ShopPage.jsx";
import AboutUs from "./pages/AboutUsPage.jsx";
import Login from "./pages/LoginPage.jsx";
import Register from "./pages/RegisterPage.jsx";
import CreateProductPage from "./pages/CreateProductPage.jsx";
import PrivateRoute from "./routes/PrivateRoute.jsx";
import PublicOnlyRoute from "./routes/PublicRoute.jsx";
import DashboardPage from "./pages/DashboardPage.jsx";
import ProductPage from "./pages/ProductPage/PageContainer.jsx";
import Alert from "./components/Alert.jsx";
import "./App.css";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCategories());
  }, []);

  const publicRoutes = [
    { path: "/login", element: <Login /> },
    { path: "/register", element: <Register /> },
  ];

  const privateRoutes = [
    { path: "/sell", element: <CreateProductPage /> },
    { path: "/dashboard", element: <DashboardPage /> },
  ];

  return (
    <Router>
      <header>
        <Alert />
        <Navbar />
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/products/:productId" element={<ProductPage />} />
          <Route element={<PrivateRoute />}>
            {privateRoutes.map((route, index) => (
              <Route key={index} path={route.path} element={route.element} />
            ))}
          </Route>
          <Route element={<PublicOnlyRoute />}>
            {publicRoutes.map((route, index) => (
              <Route key={index} path={route.path} element={route.element} />
            ))}
          </Route>
        </Routes>
      </main>
      <footer>
        <Footer />
      </footer>
    </Router>
  );
}

export default App;
