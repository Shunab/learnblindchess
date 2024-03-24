import React from 'react';
import './Header.css';

function Header() {
    return (
        <nav>
            <input type="checkbox" id="nav-toggle" />
            <div className="logo">BLINDFOLD CHESS</div>
            <ul className="links">
                <li><a href="/howtoplay.html">How to Play</a></li>
                <li><a href="https://github.com/Shunab" target="_blank" rel="noopener noreferrer">Github</a></li>
                <li><a href="https://www.linkedin.com/in/shuban-mootha-515a14204/" target="_blank" rel="noopener noreferrer">Contact</a></li>
            </ul>
            <label htmlFor="nav-toggle" className="icon-burger">
                <div className="line"></div>
                <div className="line"></div>
                <div className="line"></div>
            </label>
        </nav>
    );
}

export default Header;
