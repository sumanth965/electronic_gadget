import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
// import Carousell from "./components/Carousel/Carousel";
import Carousel from "./pages/Carousel";
import TopDeals from "./pages/TopDeals";
import Navbar from "./components/Nav/Navbar";
import Footer from "./components/Footer/Footer";
export default function App() {
  return (
    <Router>
      <Navbar />
      <Carousel />
      {/* <Carousell/> */}
      <TopDeals />
      <Footer />
    </Router>
  );
}
