import { useState } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import CartDrawer from "./components/CartDrawer";
import Home from "./pages/Home";
import "./styles/home.css";

const App = () => {
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [orders, setOrders] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [toast, setToast] = useState("");

  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);
  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(""), 2500);
  };

  const addToCart = (item) => {
    setCart((prev) => {
      const existing = prev.find((c) => c.id === item.id);
      if (existing) return prev.map((c) => c.id === item.id ? { ...c, qty: c.qty + 1 } : c);
      return [...prev, { ...item, qty: 1 }];
    });
    showToast(`${item.name} added to cart! 🛒`);
  };

  const removeFromCart = (id) => setCart((prev) => prev.filter((c) => c.id !== id));

  const changeQty = (id, newQty) => {
    if (newQty <= 0) removeFromCart(id);
    else setCart((prev) => prev.map((c) => c.id === id ? { ...c, qty: newQty } : c));
  };

  const toggleWishlist = (item) => {
    setWishlist((prev) => {
      const exists = prev.find((w) => w.id === item.id);
      if (exists) { showToast("Removed from wishlist 💔"); return prev.filter((w) => w.id !== item.id); }
      showToast("Added to wishlist ❤️");
      return [...prev, item];
    });
  };

  const placeOrder = (details) => {
    const delivery = cartTotal > 999 ? 0 : 49;
    const discount = details?.promoApplied ? Math.round(cartTotal * 0.1) : 0;
    const newOrder = {
      id: Date.now(),
      date: new Date().toLocaleString("en-IN", {
        day: "numeric", month: "short", year: "numeric",
        hour: "2-digit", minute: "2-digit",
      }),
      items: [...cart],
      total: cartTotal + delivery - discount,
      delivery, discount,
      name: details?.name || "",
      address: details?.address || "",
      payment: details?.payment || "cod",
      status: "Delivered",
    };
    setOrders((prev) => [newOrder, ...prev]);
    setTimeout(() => { setCart([]); setCartOpen(false); }, 2500);
  };

  return (
    <div>
      <Navbar cartCount={cartCount} onCartOpen={() => setCartOpen(true)} />
      <Home
        onAddToCart={addToCart}
        orders={orders}
        wishlist={wishlist}
        onToggleWishlist={toggleWishlist}
        showToast={showToast}
      />
      <Footer />
      {cartOpen && (
        <CartDrawer
          cart={cart}
          cartTotal={cartTotal}
          onClose={() => setCartOpen(false)}
          onRemove={removeFromCart}
          onQtyChange={changeQty}
          onPlaceOrder={placeOrder}
        />
      )}
      {cartCount > 0 && !cartOpen && (
        <button className="floating-cart" onClick={() => setCartOpen(true)}>
          🛒 {cartCount} item{cartCount > 1 ? "s" : ""} · ₹{cartTotal}
        </button>
      )}
      {toast && <div className="toast-notification">{toast}</div>}
    </div>
  );
};

export default App;