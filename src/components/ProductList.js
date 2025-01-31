import React, { useContext} from "react";
import { useNavigate } from "react-router-dom";
import { ProductContext } from "../contexts/ProductContext";
import { Search, ShoppingCart, Heart } from "lucide-react";

const ProductList = () => {
  const {
    products,
    searchTerm,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory,
    categories,
    addToCart,
    favorites,
    toggleFavorite
  } = useContext(ProductContext);

  const navigate = useNavigate();

  const handleImageClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  return (
    <div className="p-4">
      {/* Search and Filter Section */}
      <div className="mb-6 space-y-4">
        {/* Search Input */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search products..."
            className="w-full p-2 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Category Select */}
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300"
          >
            {/* Product Image */}
            <div
              onClick={() => handleImageClick(product.id)}
              className="relative cursor-pointer group"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover transition duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300" />
            </div>

            {/* Product Details */}
            <div className="p-4">
              <h3
                className="text-lg font-semibold text-gray-800 cursor-pointer hover:text-blue-600"
                onClick={() => handleImageClick(product.id)}
              >
                {product.name}
              </h3>
              <p className="text-gray-600 mt-2 text-sm">
                {product.description}
              </p>

              <div className="mt-4 flex items-center justify-between">
                <span className="text-xl font-bold text-gray-900">
                  ${product.price}
                </span>

                <Heart
                  onClick={() => toggleFavorite(product.id)}
                  color="pink"
                  fill={favorites[product.id] ? "pink" : "none"}
                  size={26}
                  style={{ cursor: "pointer" }}
                />

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

      {/* No Results Message */}
      {products.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No products found matching your criteria
        </div>
      )}
    </div>
  );
};

export default ProductList;
