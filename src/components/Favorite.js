import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ProductContext } from "../contexts/ProductContext";
import { Heart, ShoppingCart } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";

export default function Favorite() {

  const { isAuthenticated } = useAuth();

   const {
     products,
     addToCart,
     favorites,
     toggleFavorite,
   } = useContext(ProductContext);

  const favoriteProducts = products.filter(product => favorites[product.id]);

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">My Wishlist</h1>

      {favoriteProducts.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500 mb-4">Your wishlist is empty</p>
          <Link
            to={isAuthenticated ? "/product" : "/login"}
            className="mt-4 inline-block text-blue-500 hover:text-blue-600"
          >
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {favoriteProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
                <p className="text-gray-600 mb-4">{product.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-xl font-bold">${product.price}</span>
                  <button
                    onClick={() => toggleFavorite(product.id)}
                    className="p-2"
                  >
                    <Heart size={24} color="pink" fill="pink" />
                  </button>
                  <button
                    onClick={() => {
                      addToCart(product);
                      alert("Successfully added to cart!");
                    }}
                    className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-200"
                  >
                    <ShoppingCart className="w-5 h-5" />
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}