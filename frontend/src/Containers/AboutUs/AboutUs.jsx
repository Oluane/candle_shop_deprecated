import React from "react";
import "./AboutUs.scss";

const AboutUs = () => {
	return (
		<div className="aboutUs">
			<header className="bannerHeaderWrapper">
				<div className="headerTextContent">
					<h2 className="sectionTitle">OUR MISSION</h2>
					<p className="usualText alignCenter">
						Danish dessert halvah caramels chupa chups jelly candy. Pudding biscuit
						gummi. Apple pies chocolate latte sugar.
					</p>
				</div>
				<div className="headerImgContainer">
					<img src="/images/banners/banner_about.jpg" alt="" />
				</div>
			</header>
			<section className="ourValuesWrapper">
				<h2 className="sectionTitle">OUR VALUES</h2>
			</section>
		</div>
	);
};

export default AboutUs;
