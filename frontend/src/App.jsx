import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchCategories } from "./app/categorySlice";
import { fetchWatchlistAsync } from "./app/thunks/watchlistThunks.js";
import Navbar from "./components/navbar/NavBarContainer.jsx";
import Footer from "./components/shared/Footer.jsx";
import Home from "./pages/HomePage.jsx";
import Shop from "./pages/ShopPage.jsx";
import AboutUs from "./pages/AboutUsPage.jsx";
import Login from "./pages/LoginPage.jsx";
import Register from "./pages/RegisterPage.jsx";
import CreateProductPage from "./pages/CreateProductPage.jsx";
import PrivateRoute from "./routes/PrivateRoute.jsx";
import PublicOnlyRoute from "./routes/PublicRoute.jsx";
import SearchPage from "./pages/SearchPage.jsx";
import DashboardPage from "./pages/DashboardPage.jsx";
import WatchlistPage from "./pages/WatchlistPage.jsx";
import ProductPage from "./pages/ProductPage.jsx";
import Alert from "./components/shared/Alert.jsx";

import "./App.css";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchWatchlistAsync());
  }, []);

  const publicRoutes = [
    { path: "/login", element: <Login /> },
    { path: "/register", element: <Register /> },
  ];

  const privateRoutes = [
    { path: "/sell", element: <CreateProductPage /> },
    { path: "/dashboard", element: <DashboardPage /> },
    { path: "/watchlist", element: <WatchlistPage /> },
  ];

  return (
    <Router>
      <header>
        <div className="fixed top-0 inset-x-0 z-50">
          <Alert />
        </div>
        <Navbar />
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/search" element={<SearchPage />} />
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
