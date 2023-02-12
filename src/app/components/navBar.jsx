import React from "react";

const Navbar = () => {
    return (
        <ul className="nav">
            <li className="nav-item">
                <a className="nav-link active" href="/">
                    Main
                </a>
            </li>
            <li className="nav-item">
                <a className="nav-link" href="/login">
                    Login
                </a>
            </li>
            <li className="nav-item">
                <a className="nav-link" href="/users">
                    Users
                </a>
            </li>
        </ul>
    );
};

export default Navbar;
