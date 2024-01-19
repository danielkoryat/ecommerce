import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchCategories } from "./app/categorySlice";
import { fetchWatchlistAsync } from "./app/thunks/watchlistThunks.js";
import Navbar from "./components/navbar/NavBarContainer.jsx";
import Footer from "./components/shared/Footer.jsx";
import PrivateRoute from "./routes/PrivateRoute.jsx";
import PublicOnlyRoute from "./routes/PublicRoute.jsx";
import Alert from "./components/shared/Alert.jsx";
import { privateRoutes, publicRoutes, generalRoutes } from "./routes/routes.js";

import "./App.css";
//TODO transfer the routes to a separate file
function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchWatchlistAsync());
  }, []);

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
          {generalRoutes.map((route, index) => (
            <Route key={index} path={route.path} element={<route.element/>} />
          ))}
          <Route element={<PrivateRoute />}>
            {privateRoutes.map((route, index) => (
              <Route key={index} path={route.path} element={<route.element/>} />
            ))}
          </Route>
          <Route element={<PublicOnlyRoute />}>
            {publicRoutes.map((route, index) => (
              <Route key={index} path={route.path} element={<route.element/>} />
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
