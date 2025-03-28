import React, { useState, useEffect, useMemo, createContext } from "react";

export const ProductContext = createContext();

const initialProducts = [
  {
    id: 1,
    name: "Running Shoes",
    price: 89.99,
    description: "Modern design, perfect for daily workouts",
    image: "/images/runningshoes1.jpg",
    category: "Shoes",
  },
  {
    id: 2,
    name: "Cotton T-Shirt",
    price: 19.99,
    description: "100% cotton, breathable and comfortable",
    image: "/images/tshirt1.jpg",
    category: "Clothing",
  },
  {
    id: 3,
    name: "Jeans",
    price: 49.99,
    description: "Slim fit, perfect cut",
    image: "/images/jeans1.jpg",
    category: "Clothing",
  },
  {
    id: 4,
    name: "Casual Canvas Shoes",
    price: 59.99,
    description: "Versatile design, suitable for any occasion",
    image: "/images/canvasshoes1.jpg",
    category: "Shoes",
  },
  {
    id: 5,
    name: "Classic Sunglasses",
    price: 79.99,
    description: "UV400 protection, stylish retro design",
    image: "/images/sunglasses1.jpg",
    category: "Accessories",
  },
  {
    id: 6,
    name: "Canvas Hope Shoes",
    price: 69.99,
    description: "Comfortable canvas shoes, versatile design",
    image: "/images/canvasshoes2.jpg",
    category: "Shoes",
  },
  {
    id: 7,
    name: "Aviator Sunglasses",
    price: 89.99,
    description: "Metal frame, polarized lenses",
    image: "/images/sunglasses2.jpg",
    category: "Accessories",
  },
  {
    id: 8,
    name: "Sunglasses",
    price: 24.99,
    description: "Classic style",
    image: "/images/sunglasses3.jpg",
    category: "Accessories",
  },
  {
    id: 9,
    name: "Canvas Shoes",
    price: 74.99,
    description: "Classic design, durable canvas",
    image: "/images/canvasshoes3.jpg",
    category: "Shoes",
  },
  {
    id: 10,
    name: "Cap",
    price: 29.99,
    description: "Classic style, snapback closure",
    image: "/images/cap2.jpg",
    category: "Accessories",
  },
];

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [cart, setCart] = useState([]);
  const [favorites, setFavorites] = useState({});

  useEffect(() => {
    setProducts(initialProducts);
  }, []);

  const toggleFavorite = (productId) => {
    setFavorites((prev) => ({
      ...prev,
      [productId]: !prev[productId],
    }));
  };

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  const removeFromCart = (productId) => {
    const index = cart.findIndex((item) => item.id === productId);
    if (index !== -1) {
      setCart([...cart.slice(0, index), ...cart.slice(index + 1)]);
    }
  };
  
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory =
        selectedCategory === "All" || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [products, searchTerm, selectedCategory]);

  const categories = useMemo(() => {
    return ["All", ...new Set(products.map((p) => p.category))];
  },[products]);

  return (
    <ProductContext.Provider
      value={{
        products: filteredProducts,
        searchTerm,
        setSearchTerm,
        selectedCategory,
        setSelectedCategory,
        categories,
        cart,
        setCart,
        addToCart,
        removeFromCart,
        favorites,
        toggleFavorite
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
