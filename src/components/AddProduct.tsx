import React, { useState } from "react";
import { Button, Input, Checkbox } from "antd";
import type { CheckboxProps } from "antd";

interface NewProduct {
  name: string;
  price: number;
  inStock: boolean;
}

interface AddProductProps {
  onAddProduct: (product: NewProduct) => void;
}

export default function AddProduct({ onAddProduct }: AddProductProps) {
  const [productName, setProductName] = useState<string>("");
  const [productPrice, setProductPrice] = useState<string>("");
  const [inStock, setInStock] = useState<boolean>(true);

  const handleCheckboxChange: CheckboxProps["onChange"] = (e) => {
    setInStock(e.target.checked);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!productName.trim()) {
      alert("Vui long nhap ten san pham");
      return;
    }

    if (!productPrice.trim() || isNaN(Number(productPrice))) {
      alert("Vui long nhap gia san pham hop le");
      return;
    }

    const newProduct = {
      name: productName.trim(),
      price: Number(productPrice),
      inStock: inStock,
    };

    onAddProduct(newProduct);

    setProductName("");
    setProductPrice("");
    setInStock(true);
  };

  return (
    <div style={{}}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          justifyContent: "center",
        }}
      >
        <div>➕</div>
        <div>Thêm sản phẩm mới</div>
      </div>
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", gap: "10px", marginTop: "10px" }}
      >
        <Input
          placeholder="Tên sản phẩm"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
        />

        <Input
          placeholder="Giá (đ)"
          value={productPrice}
          onChange={(e) => setProductPrice(e.target.value)}
        />

        <Checkbox checked={inStock} onChange={handleCheckboxChange}>
          Còn hàng
        </Checkbox>

        <Button type="primary" htmlType="submit">
          Thêm
        </Button>
      </form>
    </div>
  );
}
