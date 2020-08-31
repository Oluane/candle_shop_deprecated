import "./NavbarDisplayer.scss";

import NavbarDesktop from "./NavbarDesktop/NavbarDesktop";
import NavbarMobile from "./NavbarMobile/NavbarMobile";
import React from "react";
import { useContext } from "react";
import { useSelector } from "react-redux";
import { viewportContext } from "../ViewportProvider/ViewportProvider";

const NavbarDisplayer = () => {
	const { deviceWidth, deviceHeight } = useContext(viewportContext);

	const isLoggedUser = useSelector((state) => state.user.isLoggedIn);

	return (
		<nav className="mainNavbar">
			{deviceWidth > 688 ? (
				<NavbarDesktop isLoggedUser={isLoggedUser} />
			) : (
				<NavbarMobile isLoggedUser={isLoggedUser} deviceHeight={deviceHeight} />
			)}
		</nav>
	);
};

export default NavbarDisplayer;
