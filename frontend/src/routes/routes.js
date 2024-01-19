import CreateProductPage from "../pages/CreateProductPage";
import DashboardPage from "../pages/DashboardPage";
import Login from "../pages/LoginPage";
import Register from "../pages/RegisterPage";
import WatchlistPage from "../pages/WatchlistPage";
import Home from "../pages/HomePage";
import AboutUs from "../pages/AboutUsPage";
import ProductPage from "../pages/ProductPage";
import Shop from "../pages/ShopPage";
import SearchPage from "../pages/SearchPage";

export const privateRoutes = [
  { path: "/sell", element: CreateProductPage },
  { path: "/dashboard", element: DashboardPage },
  { path: "/watchlist", element: WatchlistPage },
];

export const publicRoutes = [
  { path: "/login", element: Login },
  { path: "/register", element: Register },
];

export const generalRoutes = [
  { path: "/", element: Home },
  { path: "/shop", element: Shop },
  { path: "/about-us", element: AboutUs },
  { path: "/search", element: SearchPage },
  { path: "/products/:productId", element: ProductPage },
];
