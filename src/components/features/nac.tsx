import { Link, Route, Routes } from "react-router-dom";
import "../../styles.css"

function Navigation() {
  return (
      <nav id="navigation">
        <Link to="/">Главная</Link>
        <Link to="/count">Счетчик</Link>
        <Link to="/receipts">Рецепты</Link>
      </nav>
  );
}

export default Navigation;