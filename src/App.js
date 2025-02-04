import logo from "./logo.svg";
import "./App.css";
import "./index.css";
import { Header } from "./components/layout/Header";
import { Footer } from "./components/layout/Footer";
import { ProductProvider } from "./contexts/ProductContext";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ProductList from "./components/ProductList";
import ProductDetail from "./components/ProductDetail";
import Cart from "./components/Cart";
import Favorite from "./components/Favorite";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import NotFound from "./components/NotFound";
import React, { useEffect } from "react";

import api from "./api";

function App() {
  const isAuthenticated = false;

  return (
    <div className="App">
      <div className="min-h-screen">
        <ProductProvider>
          <BrowserRouter>
            <Header />
            <main className="container mx-auto py-8">
              <Routes>
                <Route path="/" element={<Navigate to="/login" />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route
                  path="/product"
                  element={
                    isAuthenticated ? <ProductList /> : <Navigate to="/login" />
                  }
                />
                <Route
                  path="/product/:id"
                  element={
                    isAuthenticated ? (
                      <ProductDetail />
                    ) : (
                      <Navigate to="/Login" />
                    )
                  }
                />

                <Route
                  path="/cart"
                  element={
                    isAuthenticated ? <Cart /> : <Navigate to="/Login" />
                  }
                />
                <Route
                  path="/favorite"
                  element={
                    isAuthenticated ? <Favorite /> : <Navigate to="/Login" />
                  }
                />
                <Route path="*" element={<NotFound />} />
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
