import { useState } from "react";
import { Button, Space, Table, Tag, Modal } from "antd";
import type { TableProps } from "antd";

interface Product {
  id: string;
  name: string;
  price: number;
  inStock: boolean;
}

interface TableProductProps {
  allProducts: Product[];
  onUpdateProducts: (products: Product[]) => void;
}

export default function TableProduct({
  allProducts,
  onUpdateProducts,
}: TableProductProps) {
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);

  const handleMarkProduct = (id: string) => {
    const newProducts = allProducts.map((product) =>
      product.id === id ? { ...product, inStock: !product.inStock } : product
    );
    onUpdateProducts(newProducts);
  };

  const handleDeleteProduct = (id: string) => {
    const product = allProducts.find((p) => p.id === id);
    if (product) {
      setProductToDelete(product);
      setIsDeleteModalVisible(true);
    }
  };

  const confirmDelete = () => {
    if (productToDelete) {
      const newProducts = allProducts.filter(
        (product) => product.id !== productToDelete.id
      );
      onUpdateProducts(newProducts);
      setIsDeleteModalVisible(false);
      setProductToDelete(null);
    }
  };

  const cancelDelete = () => {
    setIsDeleteModalVisible(false);
    setProductToDelete(null);
  };

  const columns: TableProps<Product>["columns"] = [
    {
      title: "Tên sản phẩm ",
      dataIndex: "name",
      key: "name",
      render: (text, record) => <p className={`${record}`}>{text}</p>,
    },

    {
      title: "Giá",
      dataIndex: "price",
      key: "price",
      render: (price) => (
        <p className="font-medium text-green-500">
          {price.toLocaleString("vi-VN")} d
        </p>
      ),
    },

    {
      title: "Trang thai",
      dataIndex: "inStock",
      key: "status",
      render: (inStock) => {
        const status = inStock ? "Còn hàng" : "Hết hàng";
        const color = inStock ? "green" : "red";
        return (
          <Tag className="font-medium" color={color}>
            {status}
          </Tag>
        );
      },
    },

    {
      title: "Hành động",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button
            color="primary"
            variant="outlined"
            onClick={() => handleMarkProduct(record.id)}
          >
            Danh dau
          </Button>

          <Button
            color="danger"
            variant="outlined"
            onClick={() => handleDeleteProduct(record.id)}
          >
            Xoa
          </Button>
        </Space>
      ),
    },
  ];
  return (
    <div>
      <h1>Danh sách sản phẩm</h1>
      <Table<Product> columns={columns} dataSource={allProducts} rowKey="id" />
      <Modal
        title="Xac nhan xoa"
        open={isDeleteModalVisible}
        onOk={confirmDelete}
        onCancel={cancelDelete}
        okText="Xoa"
        cancelText="Huy"
        okButtonProps={{ danger: true }}
      >
        <p>
          Bạn có chắc muốn xóa sản phẩm{" "}
          <strong> {productToDelete?.name}</strong>
          không?
        </p>
      </Modal>
    </div>
  );
}
