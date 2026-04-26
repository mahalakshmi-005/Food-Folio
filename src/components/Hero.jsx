import { useEffect, useState } from "react";
import { STATS } from "../data/menuData";

const Hero = () => {
  const [visible, setVisible] = useState(false);
  const [storyOpen, setStoryOpen] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const handleKey = (e) => { if (e.key === "Escape") setStoryOpen(false); };
    if (storyOpen) document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [storyOpen]);

  useEffect(() => {
    document.body.style.overflow = storyOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [storyOpen]);

  const scrollToMenu = () => {
    document.getElementById("menu")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <section id="home" className="hero">
        <div className="hero-bg" />
        <div className="hero-content">
          {/* LEFT */}
          <div className={`hero-left ${visible ? "visible" : ""}`}>
            <span className="hero-chip">🚀 Now delivering in 12 minutes</span>
            <h1 className="hero-title">
              Real food,<br />
              <span className="hero-accent">real fast.</span>
            </h1>
            <p className="hero-sub">
              Handpicked restaurants, chef-quality meals — delivered to your
              door before you can set the table.
            </p>
            <div className="hero-actions">
              <button className="btn-primary" onClick={scrollToMenu}>
                Explore Menu →
              </button>
              <button className="btn-secondary" onClick={() => setStoryOpen(true)}>
                Watch Story ▶
              </button>
            </div>
            <div className="hero-stats">
              {STATS.map((st) => (
                <div key={st.label} className="hero-stat">
                  <span className="hero-stat-val">{st.value}</span>
                  <span className="hero-stat-label">{st.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT */}
          <div className={`hero-right ${visible ? "visible" : ""}`}>
            <div className="hero-img-wrap">
              <img
                src="https://images.unsplash.com/photo-1600891964599-f61ba0e24092?w=700&q=85"
                alt="Delicious food"
                className="hero-img"
              />
              <div className="float-card float-card-1">
                <span>⚡</span>
                <div className="float-card-text">
                  <b>12 min delivery</b>
                  <span>Near you</span>
                </div>
              </div>
              <div className="float-card float-card-2">
                <span>⭐</span>
                <div className="float-card-text">
                  <b>4.9 Rating</b>
                  <span>2M+ reviews</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="scroll-hint">
          <div className="scroll-dot" />
        </div>
      </section>

      {/* ── STORY MODAL ── */}
      {storyOpen && (
        <div className="story-backdrop" onClick={() => setStoryOpen(false)}>
          <div className="story-modal" onClick={(e) => e.stopPropagation()}>

            <button className="story-close" onClick={() => setStoryOpen(false)}>✕</button>

            <div className="story-header">
              <span className="story-logo">🍽️ FoodFolio</span>
              <p className="story-tagline">Real food, real fast — our story</p>
            </div>

            {/* Food Delivery Explainer Video */}
            <div className="story-video-wrap">
              <iframe
                src="https://www.youtube.com/embed/FYurkQpjXoM?autoplay=1&rel=0&modestbranding=1"
                title="FoodFolio Story"
                frameBorder="0"
                allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
                allowFullScreen
                className="story-iframe"
              />
            </div>

            <div className="story-stats">
              <div className="story-stat">
                <span className="story-stat-val">2M+</span>
                <span className="story-stat-lbl">Happy Customers</span>
              </div>
              <div className="story-stat-divider" />
              <div className="story-stat">
                <span className="story-stat-val">500+</span>
                <span className="story-stat-lbl">Restaurant Partners</span>
              </div>
              <div className="story-stat-divider" />
              <div className="story-stat">
                <span className="story-stat-val">12 min</span>
                <span className="story-stat-lbl">Avg Delivery</span>
              </div>
              <div className="story-stat-divider" />
              <div className="story-stat">
                <span className="story-stat-val">4.9 ★</span>
                <span className="story-stat-lbl">App Rating</span>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .story-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.78);
          backdrop-filter: blur(8px);
          z-index: 500;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          animation: storyFadeIn 0.25s ease;
        }
        .story-modal {
          background: #fff;
          border-radius: 28px;
          width: 100%;
          max-width: 740px;
          overflow: hidden;
          box-shadow: 0 40px 100px rgba(0,0,0,0.4);
          animation: storySlideUp 0.35s cubic-bezier(.16,1,.3,1);
          position: relative;
        }
        .story-close {
          position: absolute;
          top: 14px;
          right: 14px;
          background: rgba(0,0,0,0.1);
          border: none;
          border-radius: 50%;
          width: 36px;
          height: 36px;
          font-size: 13px;
          font-weight: 700;
          color: #333;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 10;
          transition: background 0.2s, color 0.2s;
        }
        .story-close:hover { background: #ff4d2d; color: #fff; }
        .story-header {
          padding: 22px 28px 0;
          text-align: center;
        }
        .story-logo {
          font-size: 17px;
          font-weight: 800;
          color: #ff4d2d;
          display: block;
          margin-bottom: 3px;
        }
        .story-tagline {
          font-size: 13px;
          color: #aaa;
          margin: 0 0 14px;
        }
        .story-video-wrap {
          position: relative;
          width: 100%;
          padding-bottom: 56.25%;
          background: #000;
        }
        .story-iframe {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          border: none;
        }
        .story-stats {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 18px 28px;
          background: #fff9f7;
          flex-wrap: wrap;
          gap: 0;
        }
        .story-stat {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 0 22px;
          gap: 2px;
        }
        .story-stat-val {
          font-family: 'Playfair Display', serif;
          font-size: 21px;
          font-weight: 700;
          color: #111;
        }
        .story-stat-lbl {
          font-size: 10px;
          color: #999;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        .story-stat-divider {
          width: 1px;
          height: 30px;
          background: #eee;
        }
        @keyframes storyFadeIn {
          from { opacity: 0; } to { opacity: 1; }
        }
        @keyframes storySlideUp {
          from { opacity: 0; transform: translateY(40px) scale(0.96); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        @media (max-width: 600px) {
          .story-modal { border-radius: 18px; }
          .story-stat  { padding: 0 12px; }
          .story-stat-val { font-size: 17px; }
          .story-stat-divider { height: 22px; }
        }
      `}</style>
    </>
  );
};

export default Hero;