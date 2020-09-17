import "./Checkout.scss";

import React, { useContext } from "react";

import { viewportContext } from "../../Components/ViewportProvider/ViewportProvider";

const Checkout = () => {
	const { deviceWidth, deviceHeight } = useContext(viewportContext);
	return (
		<section className="checkoutWrapper" style={{ width: deviceWidth, height: deviceHeight }}>
			<h2 className="sectionTitle">Checkout</h2>
		</section>
	);
};

export default Checkout;
