import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom/client";
import Header from './components/Header';
import Body from './components/Body';
import Footer from './components/Footer';
import About from "./components/About";
import Error from "./components/Error";
import Contact from "./components/Contact";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Login from "./components/Login";
import { ThemeProvider, UserProvider } from "./utils/ContextProvider";
import { Provider } from "react-redux";
import store from "./utils/Store";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// chunking | code splitting | dynamic bundling | lazy loading | on demand loading | dynamic import
const Cart = lazy(() => import("./components/Cart"));
const RestaurantMenu = lazy(() => import("./components/RestaurantMenu"));

const AppLayout = () => {
  return (
    <Provider store={store}>
      <UserProvider>
        <ThemeProvider>
          <Header />
          <Outlet /> {/* filled by children configuration */}
          <Footer />
        </ThemeProvider>
      </UserProvider>
    </Provider>
  );
}

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    errorElement: <Error />,
    children: [
      { path: "/", element: <Body />, errorElement: <Error /> },
      { path: "/about", element: <About />, errorElement: <Error /> },
      { path: "/contact", element: <Contact />, errorElement: <Error /> },
      { path: "/restaurant/:restaurantId", element: <Suspense><RestaurantMenu /></Suspense>, errorElement: <Error /> },
      { path: "/login", element: <Login />, errorElement: <Error /> },
      { path: "/cart", element: <Suspense fallback={`Loading............`}><Cart /></Suspense>, errorElement: <Error />}
    ],
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(<RouterProvider router={appRouter} />);

