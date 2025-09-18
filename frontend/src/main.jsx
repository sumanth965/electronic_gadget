import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import './output.css';

import App from './App.jsx';
import { CarouselProvider } from './useContext/carouselContext'; // import provider

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CarouselProvider>
      <App />
    </CarouselProvider>
  </StrictMode>
);
