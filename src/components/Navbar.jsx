import { useEffect, useState } from "react";

const Navbar = ({ cartCount, onCartOpen }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <nav className={`nav ${scrolled ? "scrolled" : ""}`}>
      <div className="nav-inner">

        {/* 🔥 LOGO */}
        <div className="logo" onClick={() => scrollTo("home")}>
          <svg
            className="logo-svg"
            viewBox="0 0 24 24"
          >
            <path d="M4 4h16v2H4z" />
            <path d="M6 6l1 12h10l1-12" />
            <path d="M9 10v6M12 10v6M15 10v6" />
          </svg>

          <div className="logo-text">
            <div>
              <span className="food">Food</span>
              <span className="folio">Folio</span>
            </div>
            <span className="tagline">GOOD FOOD • GOOD MOOD</span>
          </div>
        </div>

        {/* 🔗 LINKS */}
        <div className="nav-links">
          <button onClick={() => scrollTo("home")}>Home</button>
          <button onClick={() => scrollTo("menu")}>Menu</button>
          <button onClick={() => scrollTo("wishlist-section")}>Wishlist ❤️</button>
          <button onClick={() => scrollTo("orders")}>Orders</button>
          <button onClick={() => scrollTo("contact")}>Contact</button>
        </div>

        {/* 🛒 CART */}
        <button className="cart-btn" onClick={onCartOpen}>
          🛒 Cart
          {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;