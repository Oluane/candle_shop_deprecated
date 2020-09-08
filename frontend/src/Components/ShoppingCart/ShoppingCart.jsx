import "./ShoppingCart.scss";

import React, { useContext, useState } from "react";

import IconSvg from "../IconSvg/IconSvg";
import NoContent from "../NoContent/NoContent";
import { viewportContext } from "../ViewportProvider/ViewportProvider";

const ShoppingCart = () => {
	const { deviceWidth, deviceHeight } = useContext(viewportContext);
	const [isShoppingCartDisplayed, setIsShoppingCartDisplayed] = useState(false);
	return (
		<>
			<div
				className={"userCartPreview" + (deviceWidth > 688 ? " desktop" : " mobile")}
				onClick={() => setIsShoppingCartDisplayed(!isShoppingCartDisplayed)}
			>
				<span className="cartIcon">
					<IconSvg iconName="shoppingCart" />
				</span>
				<div className="itemsCountContainer">
					<span className="smallText itemsCount">0</span>
				</div>
			</div>

			<div
				className={"shoppingCartWrapper" + (isShoppingCartDisplayed ? " displayed" : "")}
				style={{ height: deviceHeight }}
			>
				<header>
					<div className="closeIcon" onClick={() => setIsShoppingCartDisplayed(false)}>
						<IconSvg iconName="closeCross" />
					</div>
					<h2 className="sectionTitle">YOUR CART</h2>
				</header>

				<NoContent
					iconName="emptyBox"
					text="You haven't any candle in your cart yet !"
					linkText="Start shopping !"
					linkPath="/candles"
				/>
			</div>
		</>
	);
};

export default ShoppingCart;
