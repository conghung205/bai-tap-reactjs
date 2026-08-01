import { NavLink } from "react-router-dom";

export default function Header() {
    return (
        <header className="header">
            <div className="header-inner">
                <div className="logo">
                    Shop<span>.</span>
                </div>

                <nav className="nav">
                    <NavLink to={"/"}>Home</NavLink>
                    <NavLink to={"/products"}>Products</NavLink>
                    <NavLink to={"/categories"}>Categories</NavLink>
                </nav>

                <div className="cart">
                    <button className="cart-button">
                        <span className="cart-icon">🛒</span>
                        <span className="cart-text">Cart</span>
                        <span className="cart-badge">3</span>
                    </button>
                </div>
            </div>
        </header>
    );
}
