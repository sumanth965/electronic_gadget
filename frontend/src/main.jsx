import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "./output.css";

import App from "./App.jsx";
import { CarouselProvider } from "./useContext/carouselContext";
import { TopdealsProvider } from "./useContext/topdealsContext.jsx"; // Correct path

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <CarouselProvider>
      <TopdealsProvider>
        <App />
      </TopdealsProvider>
    </CarouselProvider>
  </StrictMode>
);
