import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Nav/Navbar";
import Footer from "./components/Footer/Footer";

// Pages
import Carousel from "./pages/Carousel";
import TopDeals from "./pages/TopDeals";
import Categories from "./pages/Categories";
// import ExploreCategories from "./pages/ExploreCategories";
import CategoryDetailsPage from "./pages/CategoryDetailsPage";

export default function App() {
  return (
    <Router>
      <Navbar />

      <Routes>
        {/* Home Page */}
        <Route
          path="/"
          element={
            <>
              <Carousel />
              <TopDeals />
              <Categories />
            </>
          }
        />

        {/* Explore Categories Page */}
        {/* <Route path="/categories" element={<ExploreCategories />} /> */}

        {/* Category Details Page (Dynamic :id) */}
        <Route path="/categories/:id" element={<CategoryDetailsPage />} />
      </Routes>

      <Footer />
    </Router>
  );
}
