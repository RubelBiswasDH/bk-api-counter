import React from "react";
import './index.css';

const Header = () => {
    return (
        <header className="header">
            <div className="brand-logo">
                <a href="/">
                    <span className="primary-text">Bari</span>
                    <span className="nav-text">Koi</span>
                </a>
            </div>
        </header>
    );
}

export default Header;