import React from "react";
import "./BannerHeader.scss";

const BannerHeader = () => {
	const heroImage = require("../../style/img/Devostock+Decoration+Candle+Decor+10785.jpg");
	return (
		<header className="bannerHeader">
			<div className="heroImage">{/* <img src={heroImage} /> */}</div>

			<div className="bannerText">
				<h1>
					Welcome to <br />
					<span className="textHighlight">Candle Shop</span>
				</h1>
				<p className="descText largeText">
					Lorem Ipsum sic dolor net consectigur. Ameno tantum rosae victus amunam.
				</p>
			</div>
		</header>
	);
};

export default BannerHeader;
