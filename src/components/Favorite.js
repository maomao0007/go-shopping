import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ProductContext } from "../contexts/ProductContext";
import { Heart } from "lucide-react";

export default function Favorite() {

   const { products, favorites, toggleFavorite } = useContext(ProductContext);

  const favoriteProducts = products.filter(product => favorites[product.id]);

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">My Wishlist</h1>

      {favoriteProducts.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500 mb-4">Your wishlist is empty</p>
          <Link
            to="/"
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
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}