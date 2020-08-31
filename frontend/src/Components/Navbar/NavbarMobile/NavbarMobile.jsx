import "./NavbarMobile.scss";

import React, { useState } from "react";

import IconSvg from "../../IconSvg/IconSvg";
import { Link } from "react-router-dom";

const NavbarMobile = ({ isLoggedUser, height }) => {
	const [toggleSideMenuDisplay, setToggleSideMenuDisplay] = useState(false);

	return (
		<>
			<div
				className="burgerIconWrapper"
				onClick={() => setToggleSideMenuDisplay(!toggleSideMenuDisplay)}
			>
				<IconSvg iconName={!toggleSideMenuDisplay ? "burgerMenu" : "closeCross"} />
			</div>

			<div className="userCart mobile">
				<span className="cartIcon">
					<IconSvg iconName="shoppingCart" />
				</span>
				<div className="itemsCountContainer">
					<span className="smallText itemsCount">0</span>
				</div>
			</div>
			<div
				className={"sideMenu" + (toggleSideMenuDisplay ? " active" : "")}
				style={{ height: height }}
			>
				<ul className="listMenu largeText">
					<li>
						<Link
							to={
								isLoggedUser
									? "/account/user"
									: {
											pathname: "/account/login",
											state: { from: "/account/user" },
									  }
							}
							className="listRow"
							onClick={() => setToggleSideMenuDisplay(!toggleSideMenuDisplay)}
						>
							<h4>MY ACCOUNT</h4>
							<div className="navArrow">
								<IconSvg iconName="rightArrow" />
							</div>
						</Link>
					</li>
					<li>
						<Link
							to="/candles"
							className="listRow"
							onClick={() => setToggleSideMenuDisplay(!toggleSideMenuDisplay)}
						>
							<h4>CANDLES</h4>
							<div className="navArrow">
								<IconSvg iconName="rightArrow" />
							</div>
						</Link>
					</li>
					<li>
						<Link
							to="/about_us"
							className="listRow"
							onClick={() => setToggleSideMenuDisplay(!toggleSideMenuDisplay)}
						>
							<h4>ABOUT US</h4>
							<div className="navArrow">
								<IconSvg iconName="rightArrow" />
							</div>
						</Link>
					</li>
				</ul>
			</div>
			<div
				className="brandLogo mobile"
				onClick={() => setToggleSideMenuDisplay(!toggleSideMenuDisplay)}
			>
				<Link to="/">
					<img src="/images/content/logo.png" alt="Candle Shop" />
				</Link>
			</div>
		</>
	);
};

export default NavbarMobile;
