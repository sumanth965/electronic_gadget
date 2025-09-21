import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Nav/Navbar";
import Footer from "./components/Footer/Footer";

// Pages
import ElectronicsCarousel from "./pages/Carousel";
import Categories from "./pages/Categories";
import CategoryDetails from "./pages/CategoryDetailsPage"; 
import TopDeals from "./pages/TopDeals";

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
              <ElectronicsCarousel />
              <TopDeals />
              <Categories />
            </>
          }
        />

        {/* Categories Page */}
        <Route path="/categories" element={<Categories />} />

        {/* Category Details Page (Dynamic :id) */}
        <Route path="/categories/:id" element={<CategoryDetails />} />

        {/* Top Deals Page */}
        <Route path="/deals" element={<TopDeals />} />

        {/* Optional contact page route */}
        {/* <Route path="/contact" element={<Contact />} /> */}
      </Routes>

      <Footer />
    </Router>
  );
}
