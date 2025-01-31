import logo from "./logo.svg";
import "./App.css";
import "./index.css";
import { Header } from "./components/layout/Header";
import { Footer } from "./components/layout/Footer";
import { ProductProvider } from "./contexts/ProductContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProductList from "./components/ProductList";
import ProductDetail from "./components/ProductDetail";
import Cart from "./components/Cart";
import Favorite from "./components/Favorite"

function App() {
  return (
    <div className="App">
      <div className="min-h-screen">
        <ProductProvider>
          <BrowserRouter>
            <Header />
            <main className="container mx-auto py-8">
              <Routes>
                <Route path="/" element={<ProductList />} />
                <Route path="/product/:id" element={<ProductDetail />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/favorite" element={<Favorite />} />
              </Routes>
            </main>
            <Footer />
          </BrowserRouter>
        </ProductProvider>
      </div>
    </div>
  );
}

export default App;
