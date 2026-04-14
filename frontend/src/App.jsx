import "./App.css";
import sonyImg from "./assets/Sony_A7IV.jpg";
import canonImg from "./assets/canon_eos_r6_01.jpg";
import lensImg from "./assets/sigma24_70mm_lens.jpg";
function App() {
  return (
    <div className="home-container">
      {/* Phần Header */}
      <header className="navbar">
        <h1 className="logo-title">Karina Shop</h1>
        <nav>
          <ul className="nav-links">
            <li>
              <a href="#">Trang chủ</a>
            </li>
            <li>
              <a href="#">Sản phẩm</a>
            </li>
            <li>
              <a href="#">Giỏ hàng</a>
            </li>
          </ul>
        </nav>
      </header>

      {/* Phần Banner chính */}
      <main>
        <section className="hero-section">
          <h2>Khám phá thế giới qua ống kính của bạn</h2>
          <p>
            Chuyên cung cấp các dòng máy ảnh DSLR, Mirrorless và phụ kiện chính
            hãng với giá tốt nhất.
          </p>
          <button className="btn-shop">Mua sắm ngay</button>
        </section>

        {/* Danh sách sản phẩm */}
        <section className="product-section">
          <h3 className="section-title">Sản phẩm nổi bật</h3>
          <div className="product-grid">
            {/* Sản phẩm 1 */}
            <div className="product-card">
              <img src={sonyImg} alt="Máy ảnh Sony" className="product-image" />
              <h4>Máy ảnh Sony Alpha A7IV</h4>
              <p>55.000.000 VNĐ</p>
            </div>

            {/* Sản phẩm 2 */}
            <div className="product-card">
              <img
                src={canonImg}
                alt="Máy ảnh Canon"
                className="product-image"
              />
              <h4>Máy ảnh Canon EOS R6</h4>
              <p>60.000.000 VNĐ</p>
            </div>

            {/* Sản phẩm 3 */}
            <div className="product-card">
              <img
                src={lensImg}
                alt="Ống kính Sigma"
                className="product-image"
              />
              <h4>Ống kính Sigma 24-70mm</h4>
              <p>25.000.000 VNĐ</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
