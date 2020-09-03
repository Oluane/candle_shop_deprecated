import "./NavbarDesktop.scss";

import { FormattedMessage } from "react-intl";
import IconSvg from "../../IconSvg/IconSvg";
import { Link } from "react-router-dom";
import React from "react";

const NavbarDesktop = ({ isLoggedUser }) => {
	return (
		<>
			<div className="navLeft smallText">
				<ul>
					<li>
						<Link to="/" className="navLinks">
							<FormattedMessage id="navbar.links.1" />
						</Link>
					</li>
					<li>
						<Link to="/candles" className="navLinks">
							<FormattedMessage id="navbar.links.2" />
						</Link>
					</li>
				</ul>
			</div>
			<div className="brandLogo desktop">
				<Link to="/">
					<img src="/images/content/logo.png" alt="Candle Shop" />
				</Link>
			</div>
			<div className="navRight smallText">
				<ul>
					<li>
						<Link to="/" className="navLinks ">
							<FormattedMessage id="navbar.links.3" />
						</Link>
					</li>
					<li>
						<Link to="/" className="navLinks ">
							<FormattedMessage id="navbar.links.4" />
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

					<div className="userCart desktop">
						<span className="navIcon cartIcon">
							<IconSvg iconName="shoppingCart" />
						</span>
						<div className="itemsCountContainer">
							<span className="smallText itemsCount">0</span>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default NavbarDesktop;
