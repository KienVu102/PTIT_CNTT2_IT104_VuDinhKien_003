import { useState, useEffect } from "react";
import AddProduct from "./AddProduct";
import TableProduct from "./TableProduct";

interface Product {
  id: string;
  name: string;
  price: number;
  inStock: boolean;
}

export default function Main() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    try {
      const savedProducts = localStorage.getItem("products");
      const parsedProducts = savedProducts ? JSON.parse(savedProducts) : null;
      if (Array.isArray(parsedProducts) && parsedProducts.length > 0) {
        setProducts(parsedProducts);
      }
    } catch (error) {
      console.error("Lỗi ko tìm thấy gì trong local", error);
    }
  }, []);

  useEffect(() => {
    if (products.length > 0) {
      localStorage.setItem("products", JSON.stringify(products));
    }
  }, [products]);

  const handleAddProduct = (newProduct: {
    name: string;
    price: number;
    inStock: boolean;
  }) => {
    const product: Product = {
      name: newProduct.name,
      price: newProduct.price,
      inStock: newProduct.inStock,
      id: Date.now().toString(),
    };
    setProducts((prevProducts) => [...prevProducts, product]);
  };

  return (
    <div>
      <div>
        <h2
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            backgroundColor: "#1677ff",
            margin: "0",
            padding: "20px 0",
            borderRadius: "0 0 10px 10px",
            color: "white",
          }}
        >
          <div>📦</div>
          <div>Quản lý sản phẩm</div>
        </h2>
        <AddProduct onAddProduct={handleAddProduct} />
        <TableProduct allProducts={products} onUpdateProducts={setProducts} />
      </div>
    </div>
  );
}
