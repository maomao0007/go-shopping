import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ProductContext } from "../contexts/ProductContext";
import { useAuth } from "../contexts/AuthContext";

const Cart = () => {

  const { isAuthenticated } = useAuth();
  const {
    cart = [],
    removeFromCart,
    addToCart,
    setCart
  } = useContext(ProductContext);

  const groupedCart = Object.values(
    cart.reduce((acc, item) => {
      if (!acc[item.id]) {
        acc[item.id] = { ...item, quantity: 0 };
      }
      acc[item.id].quantity += 1;
      return acc;
    }, {})
  );

  const total = groupedCart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

const handleDecreaseQuantity = (itemId) => {
  const item = groupedCart.find((i) => i.id === itemId);

  if (item.quantity <= 1) {
    const newCart = cart.filter((i) => i.id !== itemId);
    setCart(newCart);
  } else {
    removeFromCart(itemId);
  }
};

  const handleIncreaseQuantity = (item) => {
    addToCart(item);
  };

  if (cart.length === 0) {
    return (
      <div className="p-4 max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Shopping Cart</h1>
        <div>
          <div className="text-center py-8">
            <p className="text-gray-500 mb-4">
              Your cart is empty
            </p>
            <Link
              to={isAuthenticated ? "/product" : "/login"}
              className="mt-4 inline-block text-blue-500 hover:text-blue-600"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Shopping Cart</h1>
      <div className="space-y-4">
        {groupedCart.map((item) => (
          <div key={item.id} className="flex items-center border rounded p-4">
            <Link to={`/product/${item.id}`} className="flex-shrink-0">
              <img
                src={item.image}
                alt={item.name}
                className="w-24 h-24 object-cover rounded"
              />
            </Link>
            <div className="ml-4 flex-grow">
              <Link
                to={`/product/${item.id}`}
                className="text-lg font-bold hover:text-blue-500"
              >
                {item.name}
              </Link>
              <p className="text-gray-600">${item.price.toFixed(2)}</p>

              <p className="text-gray-600">
                Total Price: ${(item.price * item.quantity).toFixed(2)}
              </p>
            </div>
            <div className="flex items-center space-x-2 my-2">
              <button
                className="text-gray-600 border rounded px-3 py-1 hover:bg-gray-100"
                onClick={() => handleDecreaseQuantity(item.id)}
              >
                -
              </button>
              <span className="text-gray-800 w-8 text-center">
                {item.quantity}
              </span>
              <button
                className="text-gray-600 border rounded px-3 py-1 hover:bg-gray-100"
                onClick={() => handleIncreaseQuantity(item)}
              >
                +
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-8 border-t pt-4">
        <div className="text-xl font-bold">Total: ${total.toFixed(2)}</div>
        <div className="mt-4 flex gap-4">
          <Link
            to={isAuthenticated ? "/product" : "/login"}
            className="text-blue-500 hover:text-blue-600"
          >
            Continue Shopping
          </Link>
          <button
            className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600 transition-colors cursor-not-allowed opacity-50"
            disabled
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
