import "./App.css";
import { HomePage } from "./pages/HomePage"; 
import { ProductPage } from "./pages/ProductPage"; 
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <div className="container">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route
              path={`game/:slug`}
              element={<ProductPage />}
            />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
