// components/ProductDetail.jsx
import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { ProductContext } from "../contexts/ProductContext";
import { Heart } from "lucide-react";

const ProductDetail = () => {
  const { id } = useParams(); 
  const { products, addToCart, toggleFavorite, favorites } =
    useContext(ProductContext);

  const product = products.find((p) => p.id === parseInt(id));

  if (!product) {
    return <div className="p-4">Product not found</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-96 object-cover rounded"
          />
        </div>
        <div>
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          <p className="text-gray-600 mb-4">{product.description}</p>
          <p className="text-2xl font-bold mb-4">${product.price}</p>
          <div className="flex justify-center mb-4">
            <Heart
              onClick={() => toggleFavorite(product.id)}
              color="pink"
              fill={favorites[product.id] ? "pink" : "none"}
              size={26}
              style={{ cursor: "pointer" }}
            />
          </div>
          <button
            className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
            onClick={() => {
              addToCart(product);
              alert("Added to cart successfully!");
            }}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
