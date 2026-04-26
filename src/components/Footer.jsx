const Footer = () => {
  return (
    <footer className="dark-footer">

      <div className="footer-grid">

        {/* CONTACT INFO */}
        <div className="footer-box">
          <h3>Contact Info</h3>

          <p>
            <svg width="16" height="16" fill="white" viewBox="0 0 24 24">
              <path d="M12 2C8 2 5 5 5 9c0 5 7 13 7 13s7-8 7-13c0-4-3-7-7-7zm0 9.5c-1.4 0-2.5-1.1-2.5-2.5S10.6 6.5 12 6.5s2.5 1.1 2.5 2.5S13.4 11.5 12 11.5z"/>
            </svg>
            1234 Street, Chennai
          </p>

          <p>
            <svg width="16" height="16" fill="white" viewBox="0 0 24 24">
              <path d="M6.6 10.8c1.4 2.8 3.8 5.2 6.6 6.6l2.2-2.2c.3-.3.8-.4 1.2-.3 1 .3 2 .5 3 .5.7 0 1.2.5 1.2 1.2v3.4c0 .7-.5 1.2-1.2 1.2C10.3 22 2 13.7 2 3.4 2 2.7 2.5 2.2 3.2 2.2h3.4c.7 0 1.2.5 1.2 1.2 0 1 .2 2 .5 3 .1.4 0 .9-.3 1.2l-2.4 2.2z"/>
            </svg>
            +91 98765 43210
          </p>

          <p>
            <svg width="16" height="16" fill="white" viewBox="0 0 24 24">
              <path d="M2 4h20v16H2V4zm10 7L4 6h16l-8 5z"/>
            </svg>
            support@foodfolio.com
          </p>

          <p>
            <svg width="16" height="16" fill="white" viewBox="0 0 24 24">
              <path d="M12 1a11 11 0 1 0 11 11A11 11 0 0 0 12 1zm1 11.5V6h-2v8h6v-2z"/>
            </svg>
            Mon - Fri : 9AM - 6PM
          </p>

          {/* SOCIAL ICONS */}
          <div className="social-icons">
            <svg width="20" height="20" fill="white" viewBox="0 0 24 24">
              <path d="M22 5.9c-.7.3-1.4.5-2.2.6.8-.5 1.3-1.2 1.6-2.1-.7.4-1.5.7-2.3.9A3.8 3.8 0 0 0 12 8.5c0 .3 0 .6.1.9-3.1-.2-5.9-1.6-7.7-3.9-.3.5-.5 1.2-.5 1.8 0 1.3.7 2.4 1.7 3.1-.6 0-1.2-.2-1.7-.5v.1c0 1.8 1.3 3.3 3 3.6-.3.1-.7.2-1 .2-.2 0-.5 0-.7-.1.5 1.5 2 2.7 3.8 2.7A7.6 7.6 0 0 1 2 19.5a10.7 10.7 0 0 0 5.8 1.7c7 0 10.8-5.8 10.8-10.8v-.5c.7-.5 1.3-1.2 1.8-2z"/>
            </svg>

            <svg width="20" height="20" fill="white" viewBox="0 0 24 24">
              <path d="M22 12a10 10 0 1 0-11.6 9.9v-7h-2.3v-2.9h2.3V9.4c0-2.3 1.4-3.6 3.5-3.6 1 0 2 .2 2 .2v2.2h-1.1c-1.1 0-1.5.7-1.5 1.4v1.7h2.6l-.4 2.9h-2.2v7A10 10 0 0 0 22 12"/>
            </svg>

            <svg width="20" height="20" fill="white" viewBox="0 0 24 24">
              <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm5 5.5A4.5 4.5 0 1 0 16.5 12 4.5 4.5 0 0 0 12 7.5zm6-1.8a1.1 1.1 0 1 0 1.1 1.1A1.1 1.1 0 0 0 18 5.7z"/>
            </svg>
          </div>
        </div>

        {/* ABOUT */}
        <div className="footer-box">
          <h3>About Us</h3>
          <p>
            We deliver fresh food fast and hot. Our mission is to bring
            happiness through every meal you order.
          </p>
        </div>

        {/* APP INFO */}
        <div className="footer-box">
          <h3>Our App</h3>
          <p>
            Modern food ordering experience with fast delivery, secure
            payments and real-time tracking.
          </p>
        </div>

        {/* DOWNLOAD (UPDATED ✅) */}
        <div className="footer-box">
          <h3>Support & Downloads</h3>
          <p>Get our mobile app</p>

          <div className="store-buttons">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
              alt="Google Play"
              className="store-img"
            />

            <img
              src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
              alt="App Store"
              className="store-img"
            />
          </div>
        </div>

      </div>

      <div className="footer-bottom">
        <p>© 2026 Folio Foods. All Rights Reserved.</p>
      </div>

    </footer>
  );
};

export default Footer;