import React from 'react';
import './Header.css';

function Header() {
    return (
        <div className="header">
            <div className="home-menu pure-menu pure-menu-horizontal pure-menu-fixed">
                <a className="pure-menu-heading" href="http://localhost:3000/">BLINDFOLD CHESS TRAINER</a>
                <ul className="pure-menu-list">
                    <li className="pure-menu-item"><a href="http://localhost:3000/" className="pure-menu-link" >About</a></li>
                    <li className="pure-menu-item"><a href="https://github.com/Shunab" className="pure-menu-link" target="_blank" rel="noopener noreferrer">Github</a></li>
                    <li className="pure-menu-item"><a href="https://www.linkedin.com/in/shuban-mootha-515a14204/" className="pure-menu-link" target="_blank" rel="noopener noreferrer" >Contact</a></li>
                </ul>
            </div>
        </div>
    );
}

export default Header;
