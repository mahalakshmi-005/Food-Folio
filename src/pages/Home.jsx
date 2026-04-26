import { useState } from "react";
import Hero from "../components/Hero";
import MenuGrid from "../components/MenuGrid";
import { MENU_ITEMS, TESTIMONIALS, HOW_STEPS } from "../data/menuData";

const Home = ({ onAddToCart, orders, wishlist, onToggleWishlist, showToast }) => {
  const [promoMsg, setPromoMsg] = useState("");
  const [contactMsg, setContactMsg] = useState("");
  const [contactType, setContactType] = useState("");
  const [cname, setCname] = useState("");
  const [cemail, setCemail] = useState("");
  const [cmessage, setCmessage] = useState("");

  const handleClaimOffer = () => {
    navigator.clipboard.writeText("FOLIO30").catch(() => {});
    setPromoMsg("Code FOLIO30 copied! Paste it at checkout.");
    showToast("FOLIO30 copied! 🎉");
    setTimeout(() => setPromoMsg(""), 3000);
  };

  const handleContact = () => {
    if (!cname.trim() || !cemail.trim() || !cmessage.trim()) {
      setContactType("error");
      setContactMsg("Please fill all fields.");
      setTimeout(() => setContactMsg(""), 3000);
      return;
    }
    setContactType("success");
    setContactMsg("Message sent! We'll reply within 24 hours.");
    setCname(""); setCemail(""); setCmessage("");
    setTimeout(() => setContactMsg(""), 4000);
  };

  const STATUS_COLOR = {
    Delivered: { bg: "#e6f9f0", color: "#0a7a45" },
    "On the way": { bg: "#fff8e6", color: "#b45309" },
    Preparing: { bg: "#fff4f1", color: "#ff4d2d" },
  };

  return (
    <div>
      <Hero />

      {/* cat-strip REMOVED — emoji tabs already inside MenuGrid */}

      <MenuGrid
        onAddToCart={onAddToCart}
        wishlist={wishlist}
        onToggleWishlist={onToggleWishlist}
      />

      {/* WISHLIST SECTION */}
      <section id="wishlist-section" className="menu-section" style={{ background: "#fff9f7" }}>
        <div className="section-header">
          <span className="section-eyebrow">Saved for later</span>
          <h2 className="section-title">My Wishlist ❤️</h2>
          {wishlist.length > 0 && (
            <p className="section-sub">{wishlist.length} dish{wishlist.length > 1 ? "es" : ""} saved</p>
          )}
        </div>
        {wishlist.length === 0 ? (
          <div className="empty-orders">
            <span>💔</span>
            <p>No saved dishes yet. Tap ❤️ on any dish to save it!</p>
            <button className="btn-primary" onClick={() => document.getElementById("menu")?.scrollIntoView({ behavior: "smooth" })}>
              Browse Menu
            </button>
          </div>
        ) : (
          <div className="menu-grid" style={{ maxWidth: 1200, margin: "0 auto", padding: "0 32px 40px" }}>
            {wishlist.map((item) => (
              <div key={item.id} className="menu-card">
                <div className="card-img-wrap">
                  <img src={item.img} alt={item.name} className="card-img" loading="lazy" />
                  <span className="card-tag">{item.tag}</span>
                  <button className="wish-btn wished" onClick={() => onToggleWishlist(item)}>❤️</button>
                </div>
                <div className="card-body">
                  <div className="card-meta">
                    <span className="card-cat">{item.cat}</span>
                    <span className="card-rating">⭐ {item.rating}</span>
                  </div>
                  <h3 className="card-name">{item.name}</h3>
                  <div className="card-info">
                    <span className="card-info-pill">⏱ {item.time}</span>
                    <span className="card-info-pill">🔥 {item.cal} cal</span>
                  </div>
                  <div className="card-footer">
                    <span className="card-price">₹{item.price}</span>
                    <button className="add-btn" onClick={() => { onAddToCart(item); }}>+</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* HOW IT WORKS */}
      <section className="how-section">
        <div className="section-header">
          <span className="section-eyebrow">The process</span>
          <h2 className="section-title">Order in 3 steps</h2>
        </div>
        <div className="how-grid">
          {HOW_STEPS.map((h) => (
            <div key={h.step} className="how-card">
              <div className="how-icon-wrap">{h.icon}</div>
              <span className="how-step">{h.step}</span>
              <h3 className="how-title">{h.title}</h3>
              <p className="how-desc">{h.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* PROMO */}
      <section className="promo">
        <div className="promo-inner">
          <div>
            <h2 className="promo-title">First order? Get 30% off</h2>
            <p className="promo-sub">Use code FOLIO30 at checkout. Valid for new users only.</p>
            {promoMsg && <p style={{ color: "#fff", fontWeight: 700, marginTop: 8, fontSize: 14 }}>{promoMsg}</p>}
          </div>
          <button className="promo-cta" onClick={handleClaimOffer}>Claim Offer</button>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="test-section">
        <div className="section-header">
          <span className="section-eyebrow">Loved by thousands</span>
          <h2 className="section-title">What our customers say</h2>
        </div>
        <div className="test-grid">
          {TESTIMONIALS.map((t) => (
            <div key={t.name} className="test-card">
              <div className="stars">{"★".repeat(t.stars)}</div>
              <p className="test-text">"{t.text}"</p>
              <div className="test-author">
                <div className="test-avatar">{t.avatar}</div>
                <div>
                  <div className="test-name">{t.name}</div>
                  <div className="test-city">{t.city}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ORDERS */}
      <section id="orders" className="orders-section">
        <div className="section-header">
          <span className="section-eyebrow">Your history</span>
          <h2 className="section-title">Your Orders</h2>
          {orders?.length > 0 && (
            <p className="section-sub">{orders.length} order{orders.length > 1 ? "s" : ""} placed</p>
          )}
        </div>
        {!orders?.length ? (
          <div className="empty-orders">
            <span>🛵</span>
            <p>Your order history will appear here</p>
            <button className="btn-primary" onClick={() => document.getElementById("menu")?.scrollIntoView({ behavior: "smooth" })}>
              Order Now
            </button>
          </div>
        ) : (
          <div className="orders-list">
            {orders.map((order) => {
              const st = STATUS_COLOR[order.status] || STATUS_COLOR["Delivered"];
              return (
                <div key={order.id} className="order-card">
                  <div className="order-card-header">
                    <div>
                      <div className="order-id">Order #{String(order.id).slice(-5)}</div>
                      <div className="order-date">{order.date}</div>
                    </div>
                    <span className="order-status" style={{ background: st.bg, color: st.color }}>
                      {order.status}
                    </span>
                  </div>
                  <div className="order-items">
                    {order.items.map((item) => (
                      <div key={item.id} className="order-item-row">
                        <img src={item.img} alt={item.name} className="order-item-img" />
                        <span className="order-item-name">{item.name}</span>
                        <span className="order-item-qty">×{item.qty}</span>
                        <span className="order-item-price">₹{item.price * item.qty}</span>
                      </div>
                    ))}
                  </div>
                  <div className="order-card-footer">
                    {order.address && (
                      <div className="order-address">
                        📍 {order.address.length > 40 ? order.address.slice(0, 40) + "..." : order.address}
                      </div>
                    )}
                    <div className="order-total-row">
                      <span>Delivery: {order.delivery === 0 ? "FREE" : `₹${order.delivery}`}</span>
                      {order.discount > 0 && <span style={{ color: "#22c55e" }}>Saved: ₹{order.discount}</span>}
                      <span className="order-grand-total">Total: ₹{order.total}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* CONTACT */}
      <section id="contact" className="contact-section">
        <div className="section-header">
          <span className="section-eyebrow">Reach us</span>
          <h2 className="section-title">Contact Us</h2>
        </div>
        <div className="contact-grid">
          <div className="contact-info">
            <h3 className="contact-info-title">We're here 24/7</h3>
            <p>Have a question or need help? Our support team is always on standby.</p>
            <div className="contact-items">
              {[["📧", "hello@folio.food"], ["📞", "+91 98765 43210"], ["📍", "Chennai, Tamil Nadu, India"]].map(([icon, val]) => (
                <div key={val} className="contact-item"><span>{icon}</span><span>{val}</span></div>
              ))}
            </div>
          </div>
          <div className="contact-form">
            <input className="form-input" placeholder="Your name" value={cname} onChange={(e) => setCname(e.target.value)} />
            <input className="form-input" placeholder="Email address" value={cemail} onChange={(e) => setCemail(e.target.value)} />
            <textarea className="form-input form-textarea" placeholder="Your message" value={cmessage} onChange={(e) => setCmessage(e.target.value)} />
            {contactMsg && (
              <p style={{ padding: "10px 14px", borderRadius: 10, margin: 0, fontSize: 14, background: contactType === "success" ? "#e6f9f0" : "#ffeaea", color: contactType === "success" ? "#0a7a45" : "#c0392b" }}>
                {contactMsg}
              </p>
            )}
            <button className="btn-primary" onClick={handleContact}>Send Message</button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;