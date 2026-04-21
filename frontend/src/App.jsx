import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import About from "./pages/About";
import Contact from "./pages/Contact";

// THAY ĐỔI ĐƯỜNG LINK NÀY THÀNH PORT BACK-END CỦA BẠN
const API_URL = "http://localhost:5187/api/products";

const Home = () => {
  // Biến state lưu trữ danh sách sản phẩm lấy từ Database
  const [products, setProducts] = useState([]);

  // 1. GET - Lấy dữ liệu khi trang vừa load
  const fetchProducts = async () => {
    try {
      const response = await axios.get(API_URL);
      setProducts(response.data);
    } catch (error) {
      console.error("Lỗi khi tải dữ liệu:", error);
      alert("Không thể kết nối đến Server. Hãy chắc chắn Back-end đang chạy!");
    }
  };

  // Dùng useEffect để tự động gọi hàm fetchProducts 1 lần khi mở trang
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
      fetchProducts(); // Tải lại danh sách sau khi thêm thành công
    } catch (error) {
      console.error("Lỗi khi thêm:", error);
    }
  };

  // 3. DELETE - Xóa sản phẩm
  const handleDeleteProduct = async (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa sản phẩm này?")) {
      try {
        await axios.delete(`${API_URL}/${id}`);
        fetchProducts(); // Tải lại danh sách sau khi xóa
      } catch (error) {
        console.error("Lỗi khi xóa:", error);
      }
    }
  };

  return (
    <main>
      <section className="hero-section">
        <h2>Khám phá thế giới qua ống kính của bạn</h2>
        <p>Chuyên cung cấp các dòng máy ảnh DSLR, Mirrorless chính hãng.</p>
        {/* Nút bấm để test API thêm dữ liệu */}
        <button className="btn-shop" onClick={handleAddProduct}>
          + Thêm sản phẩm mẫu vào Database
        </button>
      </section>

      <section className="product-section">
        <h3 className="section-title">Sản phẩm nổi bật ({products.length})</h3>

        <div className="product-grid">
          {/* Kiểm tra nếu không có sản phẩm nào thì báo */}
          {products.length === 0 && <p>Chưa có sản phẩm nào trong cửa hàng.</p>}

          {/* Dùng hàm map() để duyệt qua mảng dữ liệu và in ra giao diện */}
          {products.map((p) => (
            <div className="product-card" key={p.id}>
              <img src={p.imageUrl} alt={p.name} className="product-image" />
              <h4>{p.name}</h4>
              <p>{p.price.toLocaleString("vi-VN")} VNĐ</p>

              {/* Nút Xóa */}
              <button
                className="btn-delete"
                onClick={() => handleDeleteProduct(p.id)}
              >
                Xóa
              </button>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

// ... Phần App component giữ nguyên
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
