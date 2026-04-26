import { useState } from "react";

const CartDrawer = ({ cart, cartTotal, onClose, onRemove, onQtyChange, onPlaceOrder }) => {
  const [step, setStep] = useState("cart");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [payment, setPayment] = useState("cod");
  const [nameErr, setNameErr] = useState("");
  const [phoneErr, setPhoneErr] = useState("");
  const [addrErr, setAddrErr] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);

  const delivery = cartTotal > 999 ? 0 : 49;
  const discount = promoApplied ? Math.round(cartTotal * 0.1) : 0;
  const grandTotal = cartTotal + delivery - discount;
  const totalQty = cart.reduce((s, i) => s + i.qty, 0);
  const progress = Math.min((cartTotal / 999) * 100, 100);

  const handleCheckout = () => {
    let valid = true;
    setNameErr(""); setPhoneErr(""); setAddrErr("");
    if (!name.trim()) { setNameErr("Name is required"); valid = false; }
    if (!/^\d{10}$/.test(phone)) { setPhoneErr("Enter valid 10-digit number"); valid = false; }
    if (!address.trim()) { setAddrErr("Address is required"); valid = false; }
    if (!valid) return;
    setStep("success");
    onPlaceOrder({ name, address, payment, promoApplied });
  };

  if (step === "success") {
    return (
      <div className="cart-backdrop" onClick={onClose}>
        <div className="cart-drawer" onClick={(e) => e.stopPropagation()}>
          <div className="cart-success">
            <div className="success-ring">
              <span className="success-icon">🎉</span>
            </div>
            <h3>Order Confirmed!</h3>
            <p>Your food is being prepared and will arrive soon.</p>
            <div className="success-eta">
              <span>Estimated arrival:</span>
              <b style={{ marginLeft: 6 }}>30-40 min</b>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (step === "checkout") {
    return (
      <div className="cart-backdrop" onClick={onClose}>
        <div className="cart-drawer" onClick={(e) => e.stopPropagation()}>
          <div className="cart-header">
            <button className="cart-back" onClick={() => setStep("cart")}>← Back</button>
            <h3 style={{ margin: 0 }}>Checkout</h3>
            <button className="cart-close" onClick={onClose}>✕</button>
          </div>

          <div className="checkout-form">
            <label>Full Name</label>
            <input
              className={`form-input${nameErr ? " input-error" : ""}`}
              placeholder="Your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {nameErr && <span className="error-msg">{nameErr}</span>}

            <label>Phone Number</label>
            <input
              className={`form-input${phoneErr ? " input-error" : ""}`}
              placeholder="10-digit mobile number"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            {phoneErr && <span className="error-msg">{phoneErr}</span>}

            <label>Delivery Address</label>
            <textarea
              className={`form-input form-textarea${addrErr ? " input-error" : ""}`}
              placeholder="House no, Street, City, Pincode"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            {addrErr && <span className="error-msg">{addrErr}</span>}

            <label>Promo Code</label>
            <div className="promo-row">
              <input className="form-input" value="FOLIO30" readOnly />
              <button
                className={`promo-apply-btn${promoApplied ? " applied" : ""}`}
                onClick={() => setPromoApplied(true)}
              >
                {promoApplied ? "Applied ✓" : "Apply"}
              </button>
            </div>

            <label>Payment Method</label>
            <div className="payment-options">
              {[
                { val: "cod", label: "Cash on Delivery", icon: "💵" },
                { val: "upi", label: "UPI / GPay", icon: "📲" },
                { val: "card", label: "Credit / Debit Card", icon: "💳" },
              ].map((p) => (
                <div
                  key={p.val}
                  className={`payment-opt${payment === p.val ? " active" : ""}`}
                  onClick={() => setPayment(p.val)}
                >
                  <span className="pay-icon">{p.icon}</span>
                  <span>{p.label}</span>
                  {payment === p.val && <span className="pay-check">✓</span>}
                </div>
              ))}
            </div>

            <div className="bill-box">
              <div className="bill-row"><span>Subtotal</span><span>₹{cartTotal}</span></div>
              {promoApplied && (
                <div className="bill-row bill-save"><span>Promo FOLIO30</span><span>- ₹{discount}</span></div>
              )}
              <div className="bill-row">
                <span>Delivery</span>
                <span style={{ color: delivery === 0 ? "#22c55e" : "#111", fontWeight: delivery === 0 ? 700 : 400 }}>
                  {delivery === 0 ? "FREE" : `₹${delivery}`}
                </span>
              </div>
              <div className="bill-row bill-total"><span>Total</span><span>₹{grandTotal}</span></div>
            </div>

            <button className="btn-place-order" onClick={handleCheckout}>
              Place Order · ₹{grandTotal}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-backdrop" onClick={onClose}>
      <div className="cart-drawer" onClick={(e) => e.stopPropagation()}>
        <div className="cart-header">
          <div>
            <h3 style={{ margin: 0 }}>Your Cart</h3>
            {cart.length > 0 && <span className="cart-item-count">{totalQty} items</span>}
          </div>
          <button className="cart-close" onClick={onClose}>✕</button>
        </div>

        {cart.length === 0 ? (
          <div className="cart-empty">
            <div className="cart-empty-img">🍽️</div>
            <h4>Your cart is empty</h4>
            <p>Add items from the menu to get started</p>
          </div>
        ) : (
          <>
            {cartTotal < 999 ? (
              <div className="free-delivery-bar">
                <span>Add ₹{999 - cartTotal} more for FREE delivery!</span>
                <div className="free-bar-track">
                  <div className="free-bar-fill" style={{ width: `${progress}%` }} />
                </div>
              </div>
            ) : (
              <div className="free-delivery-bar free-unlocked">🎉 Free delivery unlocked!</div>
            )}

            <div className="cart-items-list">
              {cart.map((item) => (
                <div key={item.id} className="cart-item">
                  <img src={item.img} alt={item.name} className="cart-item-img" />
                  <div className="cart-item-info">
                    <div className="cart-item-name">{item.name}</div>
                    <div className="cart-item-price">₹{item.price}</div>
                    <div className="cart-qty">
                      <button className="qty-btn" onClick={() => onQtyChange(item.id, item.qty - 1)}>−</button>
                      <span className="qty-val">{item.qty}</span>
                      <button className="qty-btn" onClick={() => onQtyChange(item.id, item.qty + 1)}>+</button>
                    </div>
                  </div>
                  <div className="cart-item-right">
                    <button className="cart-remove" onClick={() => onRemove(item.id)}>✕</button>
                    <span className="cart-item-subtotal">₹{item.price * item.qty}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="cart-summary">
              <div className="summary-row"><span>Subtotal</span><span>₹{cartTotal}</span></div>
              <div className="summary-row green">
                <span>Delivery</span>
                <span>{delivery === 0 ? "FREE" : `₹${delivery}`}</span>
              </div>
              <div className="summary-divider" />
              <div className="summary-row summary-total"><span>Total</span><span>₹{cartTotal + delivery}</span></div>
            </div>

            <button className="btn-place-order" onClick={() => setStep("checkout")}>
              Proceed to Checkout →
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default CartDrawer;