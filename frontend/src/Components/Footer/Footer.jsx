import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./Footer.scss";
import IconSvg from "../IconSvg/IconSvg";
import EngagementSection from "../EngagementSection/EngagementSection";

const Footer = () => {
	const [isHomepage, setIsHomepage] = useState(false);
	const location = useLocation();

	useEffect(() => {
		setIsHomepage(location.pathname === "/" ? true : false);
	}, [location]);

	return (
		<>
			{!isHomepage && <EngagementSection />}
			<footer>
				<div className="socialContainer">
					<div className="footerLogo">
						<img src="/images/content/logo.png" alt="" />
					</div>
					<div className="socialLinksContainer">
						<a href="*" className="socialLinks">
							<div>
								<IconSvg iconName="facebook" />
							</div>
						</a>
						<a href="*" className="socialLinks">
							<div>
								<IconSvg iconName="instagram" />
							</div>
						</a>
						<a href="*" className="socialLinks">
							<div>
								<IconSvg iconName="twitter" />
							</div>
						</a>
					</div>
				</div>
				<div className="menusContainer">
					<div className="menu mediumText">
						<h6 className="menuTitle smallText">About</h6>
						<ul className="menuItems">
							<li>
								<a href="/about_us">Who are we ?</a>
							</li>
							<li>
								<a href="*">Our products</a>
							</li>
							<li>
								<a href="*">Contact us</a>
							</li>
							<li>
								<a href="*">Shipping and returning</a>
							</li>
						</ul>
					</div>
					<div className="menu mediumText">
						<h6 className="menuTitle smallText">Informations</h6>
						<ul className="menuItems">
							<li>
								<a href="*">Who are we ?</a>
							</li>
							<li>
								<a href="*">Our products</a>
							</li>
							<li>
								<a href="*">Contact us</a>
							</li>
							<li>
								<a href="*"></a>
							</li>
						</ul>
					</div>
				</div>
			</footer>
		</>
	);
};

export default Footer;
