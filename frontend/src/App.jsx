import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import About from "./pages/About";
import Contact from "./pages/Contact";

// Địa chỉ API Back-end của bạn
const API_URL = "http://localhost:5187/api/products";

const Home = () => {
  const [products, setProducts] = useState([]);

  // State quản lý trạng thái Sửa sản phẩm
  const [editingId, setEditingId] = useState(null);
  const [editFormData, setEditFormData] = useState({
    name: "",
    price: 0,
    imageUrl: "",
  });

  // 1. GET - Lấy danh sách sản phẩm
  const fetchProducts = async () => {
    try {
      const response = await axios.get(API_URL);
      setProducts(response.data);
    } catch (error) {
      console.error("Lỗi khi tải dữ liệu:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // 2. POST - Thêm sản phẩm mới
  const handleAddProduct = async () => {
    const newProduct = {
      name: "Máy ảnh Film Cổ điển",
      price: 12000000,
      imageUrl:
        "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=500",
    };
    try {
      await axios.post(API_URL, newProduct);
      fetchProducts(); // Tải lại danh sách
    } catch (error) {
      console.error("Lỗi khi thêm:", error);
    }
  };

  // 3. DELETE - Xóa sản phẩm
  const handleDeleteProduct = async (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa sản phẩm này?")) {
      try {
        await axios.delete(`${API_URL}/${id}`);
        fetchProducts(); // Tải lại danh sách
      } catch (error) {
        console.error("Lỗi khi xóa:", error);
      }
    }
  };

  // 4. PUT - Tính năng Sửa sản phẩm
  const handleEditClick = (product) => {
    setEditingId(product.id);
    setEditFormData({
      name: product.name,
      price: product.price,
      imageUrl: product.imageUrl,
    });
  };

  const handleUpdateProduct = async (id) => {
    try {
      const updatedProduct = { id: id, ...editFormData };
      await axios.put(`${API_URL}/${id}`, updatedProduct);
      setEditingId(null); // Tắt form sửa
      fetchProducts(); // Tải lại danh sách
    } catch (error) {
      console.error("Lỗi khi cập nhật:", error);
    }
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setEditFormData({ ...editFormData, [name]: value });
  };

  return (
    <main>
      <section className="hero-section">
        <h2>Khám phá thế giới qua ống kính của bạn</h2>
        <p>Chuyên cung cấp các dòng máy ảnh DSLR, Mirrorless chính hãng.</p>
        <button className="btn-shop" onClick={handleAddProduct}>
          + Thêm sản phẩm mẫu vào Database
        </button>
      </section>

      <section className="product-section">
        <h3 className="section-title">Sản phẩm nổi bật ({products.length})</h3>

        <div className="product-grid">
          {products.length === 0 && <p>Chưa có sản phẩm nào trong cửa hàng.</p>}

          {products.map((p) => (
            <div className="product-card" key={p.id}>
              {/* Giao diện khi bấm nút Sửa */}
              {editingId === p.id ? (
                <div className="edit-form">
                  <input
                    type="text"
                    name="name"
                    value={editFormData.name}
                    onChange={handleFormChange}
                    placeholder="Tên sản phẩm"
                  />
                  <input
                    type="number"
                    name="price"
                    value={editFormData.price}
                    onChange={handleFormChange}
                    placeholder="Giá tiền"
                  />
                  <input
                    type="text"
                    name="imageUrl"
                    value={editFormData.imageUrl}
                    onChange={handleFormChange}
                    placeholder="Link hình ảnh"
                  />

                  <div className="action-buttons">
                    <button
                      className="btn-save"
                      onClick={() => handleUpdateProduct(p.id)}
                    >
                      Lưu
                    </button>
                    <button
                      className="btn-cancel"
                      onClick={() => setEditingId(null)}
                    >
                      Hủy
                    </button>
                  </div>
                </div>
              ) : (
                /* Giao diện hiển thị bình thường */
                <>
                  <img
                    src={p.imageUrl}
                    alt={p.name}
                    className="product-image"
                  />
                  <h4>{p.name}</h4>
                  <p>{p.price.toLocaleString("vi-VN")} VNĐ</p>

                  <div className="action-buttons">
                    <button
                      className="btn-edit"
                      onClick={() => handleEditClick(p)}
                    >
                      Sửa
                    </button>
                    <button
                      className="btn-delete"
                      onClick={() => handleDeleteProduct(p.id)}
                    >
                      Xóa
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

function App() {
  return (
    <Router>
      <div className="home-container">
        <header className="navbar">
          <h1 className="logo-title">Karina Shop</h1>
          <nav>
            <ul className="nav-links">
              <li>
                <Link to="/">Trang chủ</Link>
              </li>
              <li>
                <Link to="/about-us">Giới thiệu</Link>
              </li>
              <li>
                <Link to="/contact">Liên hệ</Link>
              </li>
            </ul>
          </nav>
        </header>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about-us" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
