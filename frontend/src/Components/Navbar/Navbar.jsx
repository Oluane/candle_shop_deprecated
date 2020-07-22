import React from "react";
import "./Navbar.scss";
import { Link } from "react-router-dom";

const Navbar = () => {
	return (
		<nav>
			<div className="navLeft">
				<ul>
					<li>
						<Link to="/" className="navLinks mediumText">
							HOME
						</Link>
					</li>
					<li>
						<Link to="/" className="navLinks mediumText">
							Products
						</Link>
					</li>
				</ul>
			</div>
			<div className="brandLogo">
				<span>Candle Shop</span>
			</div>
			<div className="navRight">
				<ul>
					<li>
						<Link to="/" className="navLinks mediumText">
							About us
						</Link>
					</li>
					<li>
						<Link to="/" className="navLinks mediumText">
							More Infos
						</Link>
					</li>
				</ul>
			</div>
		</nav>
	);
};

export default Navbar;
