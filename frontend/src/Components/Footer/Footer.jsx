import React from "react";
import "./Footer.scss";
import IconSvg from "../IconSvg/IconSvg";
import EngagementSection from "../EngagementSection/EngagementSection";

const Footer = () => {
	return (
		<>
			<EngagementSection />
			<footer>
				<div className="socialContainer">
					<div footerLogo></div>
					<div className="socialLinksContainer">
						<a href="" className="socialLinks">
							<div>
								<IconSvg iconName="facebook" />
							</div>
						</a>
						<a href="" className="socialLinks">
							<div>
								<IconSvg iconName="instagram" />
							</div>
						</a>
						<a href="" className="socialLinks">
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
								<a href="">Who are we ?</a>
							</li>
							<li>
								<a href="">Our products</a>
							</li>
							<li>
								<a href="">Contact us</a>
							</li>
							<li>
								<a href="">Shipping and returning</a>
							</li>
						</ul>
					</div>
					<div className="menu mediumText">
						<h6 className="menuTitle smallText">Informations</h6>
						<ul className="menuItems">
							<li>
								<a href="">Who are we ?</a>
							</li>
							<li>
								<a href="">Our products</a>
							</li>
							<li>
								<a href="">Contact us</a>
							</li>
							<li>
								<a href=""></a>
							</li>
						</ul>
					</div>
				</div>
			</footer>
		</>
	);
};

export default Footer;
