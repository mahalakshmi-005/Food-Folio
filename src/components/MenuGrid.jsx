import { useState } from "react";
import { MENU_ITEMS, CATEGORIES } from "../data/menuData";

const MenuGrid = ({ onAddToCart, wishlist = [], onToggleWishlist }) => {
  const [activeTab, setActiveTab] = useState("All");
  const [addedId, setAddedId] = useState(null);
  const [search, setSearch] = useState("");

  const filtered = MENU_ITEMS
    .filter((item) => activeTab === "All" || item.cat === activeTab)
    .filter((item) => item.name.toLowerCase().includes(search.toLowerCase()));

  const handleAdd = (item) => {
    onAddToCart(item);
    setAddedId(item.id);
    setTimeout(() => setAddedId(null), 1000);
  };

  const isWished = (id) => wishlist.some((w) => w.id === id);

  return (
    <section id="menu" className="menu-section">
      <div className="section-header">
        <span className="section-eyebrow">What's cooking</span>
        <h2 className="section-title">Today's Menu</h2>
        <p className="section-sub">Fresh, local, and made to order — every single time.</p>
      </div>

      <div className="search-bar-wrap">
        <input
          className="search-input"
          placeholder="🔍  Search dishes..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="tabs">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            className={`tab ${activeTab === cat.id ? "active" : ""}`}
            onClick={() => setActiveTab(cat.id)}
          >
            {cat.emoji} {cat.id}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="no-results">
          <span>🍽️</span>
          <p>No dishes found for "<b>{search}</b>"</p>
        </div>
      ) : (
        <div className="menu-grid">
          {filtered.map((item) => {
            const added = addedId === item.id;
            const wished = isWished(item.id);
            return (
              <div key={item.id} className="menu-card">
                <div className="card-img-wrap">
                  <img src={item.img} alt={item.name} className="card-img" loading="lazy" />
                  <span className="card-tag">{item.tag}</span>
                  <button
                    className={`wish-btn ${wished ? "wished" : ""}`}
                    onClick={() => onToggleWishlist(item)}
                    title={wished ? "Remove from wishlist" : "Add to wishlist"}
                  >
                    {wished ? "❤️" : "🤍"}
                  </button>
                  <div className="card-overlay">
                    <button className="quick-add" onClick={() => handleAdd(item)}>
                      {added ? "✓ Added!" : "+ Quick Add"}
                    </button>
                  </div>
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
                    <button
                      className={`add-btn ${added ? "add-btn--done" : ""}`}
                      onClick={() => handleAdd(item)}
                    >
                      {added ? "✓" : "+"}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
};

export default MenuGrid;