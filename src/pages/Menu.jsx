import MenuGrid from "../components/MenuGrid";

const Menu = ({ onAddToCart }) => {
  return (
    <div style={{ paddingTop: 80 }}>
      <MenuGrid onAddToCart={onAddToCart} />
    </div>
  );
};

export default Menu;