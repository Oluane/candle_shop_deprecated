import "./NavbarDisplayer.scss";

import NavbarDesktop from "./NavbarDesktop/NavbarDesktop";
import NavbarMobile from "./NavbarMobile/NavbarMobile";
import React from "react";
import { useSelector } from "react-redux";
import { useViewport } from "../../services/useViewport";

const NavbarDisplayer = () => {
	const { width, height } = useViewport();
	console.log(width, height);

	const isLoggedUser = useSelector((state) => state.user.isLoggedIn);

	return (
		<nav className="mainNavbar">
			{width > 688 ? (
				<NavbarDesktop isLoggedUser={isLoggedUser} />
			) : (
				<NavbarMobile isLoggedUser={isLoggedUser} height={height} />
			)}
		</nav>
	);
};

export default NavbarDisplayer;
