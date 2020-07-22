import React from "react";
import "./Navbar.scss";
import { Link } from "react-router-dom";
import { FaUser } from "react-icons/fa";

const Navbar = () => {
	return (
		<nav>
			<div className="navLeft smallText">
				<ul>
					<li>
						<Link to="/" className="navLinks">
							HOME
						</Link>
					</li>
					<li>
						<Link to="/" className="navLinks">
							PRODUCTS
						</Link>
					</li>
				</ul>
			</div>
			<div className="brandLogo">
				<span>Candle Shop</span>
			</div>
			<div className="navRight smallText">
				<ul>
					<li>
						<Link to="/" className="navLinks ">
							ABOUT US
						</Link>
					</li>
					<li>
						<Link to="/" className="navLinks ">
							MORE INFOS
						</Link>
					</li>
				</ul>
				<div>
					<FaUser />
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
