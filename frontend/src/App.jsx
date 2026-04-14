import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";
import sonyImg from "./assets/Sony_A7IV.jpg";
import canonImg from "./assets/canon_eos_r6_01.jpg";
import lensImg from "./assets/sigma24_70mm_lens.jpg";
// Component Trang chủ (Home)
const Home = () => (
  <main>
    <section className="hero-section">
      <h2>Hãy mua máy và tự cảm nhận!</h2>
      <p>Chuyên cung cấp các dòng máy ảnh chuyên nghiệp chính hãng.</p>
      <button className="btn-shop">Mua sắm ngay</button>
    </section>
    <section className="product-section">
      <h3 className="section-title">Sản phẩm nổi bật</h3>
      <div className="product-grid">
        <div className="product-card">
          <img src={sonyImg} alt="Sony" className="product-image" />
          <h4>Sony Alpha A7IV</h4>
          <p>55.000.000 VNĐ</p>
        </div>
        <div className="product-card">
          <img src={canonImg} alt="Máy ảnh Canon" className="product-image" />
          <h4>Máy ảnh Canon EOS R6</h4>
          <p>60.000.000 VNĐ</p>
        </div>

        <div className="product-card">
          <img src={lensImg} alt="Ống kính Sigma" className="product-image" />
          <h4>Ống kính Sigma 24-70mm</h4>
          <p>25.000.000 VNĐ</p>
        </div>
      </div>
    </section>
  </main>
);

function App() {
  return (
    <Router>
      <div className="home-container">
        <header className="navbar">
          <h1 className="logo-title">Karina Shop</h1>
          <nav>
            <ul className="nav-links">
              {/* Sử dụng Link thay vì thẻ a để tránh load lại trang */}
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

        {/* Khu vực hiển thị nội dung thay đổi theo URL */}
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
