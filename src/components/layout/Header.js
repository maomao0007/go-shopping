import React, { useState, useContext } from "react";
import { ShoppingCart, Heart, User, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { ProductContext } from "../../contexts/ProductContext";
import { useAuth } from "../../contexts/AuthContext";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { cart = [], favorites = {} } = useContext(ProductContext);
  const { isAuthenticated } = useAuth(); 

  return (
    <header className="bg-white shadow-md relative">
      {/* Top Banner */}
      <div className="bg-gray-100 py-2 flex justify-center">
        <div className="max-w-7xl mx-auto px-4 text-center sm:text-left text-xs sm:text-sm text-gray-600">
          Free shipping on orders over $500
        </div>
      </div>

      {/* Main Navigation */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <div className="flex items-center">
            <Link
              to={isAuthenticated ? "/product" : "/login"}
              className="text-xl sm:text-2xl font-bold text-gray-800"
            >
              GoShopping
            </Link>
          </div>

          {/* Desktop Navigation */}
          {isAuthenticated ? (
            <div className="hidden md:flex items-center space-x-6">
              <Link
                to="/account"
                className="hover:text-blue-500 transition-colors"
                title="My Account"
              >
                <User className="h-5 w-5 sm:h-6 sm:w-6" />
              </Link>
              <Link
                to="/favorite"
                className="hover:text-blue-500 transition-colors"
                title="Favorite"
              >
                <Heart
                  className="h-5 w-5 sm:h-6 sm:w-6"
                  color="pink"
                  fill={
                    Object.values(favorites).some((v) => v) ? "pink" : "none"
                  }
                />
              </Link>
              <Link
                to="/cart"
                className="relative hover:text-blue-500 transition-colors"
                title="Shopping Cart"
              >
                <ShoppingCart className="h-5 w-5 sm:h-6 sm:w-6" />
                {cart.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-4 w-4 sm:h-5 sm:w-5 flex items-center justify-center">
                    {cart.length}
                  </span>
                )}
              </Link>
            </div>
          ) : null}

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isAuthenticated ? (
              isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )
            ) : null}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}

      {isAuthenticated && isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50">
          <nav className="max-w-7xl mx-auto px-4 py-3">
            <ul className="space-y-4">
              <li>
                <Link
                  to="/account"
                  className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded-lg transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <User className="h-5 w-5" />
                  <span className="text-gray-700">My Account</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/favorite"
                  className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded-lg transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Heart
                    className="h-5 w-5"
                    color="pink"
                    fill={
                      Object.values(favorites).some((v) => v) ? "pink" : "none"
                    }
                  />
                  <span className="text-gray-700">Favorites</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/cart"
                  className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded-lg transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <div className="relative">
                    <ShoppingCart className="h-5 w-5" />
                    {cart.length > 0 && (
                      <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                        {cart.length}
                      </span>
                    )}
                  </div>
                  <span className="text-gray-700">Shopping Cart</span>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
