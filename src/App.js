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
import Account from "./components/Account";
import React, { useEffect } from "react";
import { AuthProvider, useAuth } from "./contexts/AuthContext";

function App() {

  const ProtectedRoute = ({ children }) => {
    const { isAuthenticated } = useAuth();
    return isAuthenticated ? children : <Navigate to="/login" />;
  };

  return (
    <div className="App">
      <div className="min-h-screen">
        <AuthProvider>
          <ProductProvider>
            <BrowserRouter>
              <Header />
              <main className="container mx-auto py-8">
                <Routes>
                  <Route path="/" element={<Navigate to="/login" />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route
                    path="/account"
                    element={
                      <ProtectedRoute>
                        <Account />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/product"
                    element={
                      <ProtectedRoute>
                        <ProductList />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/product/:id"
                    element={
                      <ProtectedRoute>
                        <ProductDetail />
                      </ProtectedRoute>
                    }
                  />

                  <Route
                    path="/cart"
                    element={
                      <ProtectedRoute>
                        <Cart />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/favorite"
                    element={
                      <ProtectedRoute>
                        <Favorite />
                      </ProtectedRoute>
                    }
                  />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>
              <Footer />
            </BrowserRouter>
          </ProductProvider>
        </AuthProvider>
      </div>
    </div>
  );
}

export default App;
