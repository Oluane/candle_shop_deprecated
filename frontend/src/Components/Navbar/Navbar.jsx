import React from "react";
import "./Navbar.scss";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import IconSvg from "../IconSvg/IconSvg";

const Navbar = () => {
	const isLoggedUser = useSelector((state) => state.user.isLoggedIn);
	return (
		<nav className="mainNavbar">
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
				<div className="userAccountIcons">
					<Link
						to={
							isLoggedUser
								? "/account/user"
								: { pathname: "/account/login", state: { from: "/account/user" } }
						}
					>
						<span className="navIcon userIcon">
							<IconSvg iconName="user" />
						</span>
					</Link>

					<div className="userCart">
						<span className="navIcon cartIcon">
							<IconSvg iconName="shoppingCart" />
						</span>
						<div className="itemsCountContainer">
							<span className="smallText itemsCount">0</span>
						</div>
					</div>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
