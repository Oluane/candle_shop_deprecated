import "./BannerHeader.scss";

import { FormattedMessage } from "react-intl";
import React from "react";

const BannerHeader = () => {
	return (
		<header className="bannerHeader">
			<div className="bannerTitle">
				<h1>
					<FormattedMessage id="bannerHeader.title" />
					<br />
					<span className="textHighlight">Candle Shop</span>.
				</h1>
			</div>
			<div className="bannerText">
				<p className="descText largeText">
					<FormattedMessage id="bannerHeader.text" />
				</p>
			</div>
		</header>
	);
};

export default BannerHeader;
