import "./ShoppingCart.scss";

import React, { useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import IconSvg from "../IconSvg/IconSvg";
import NoContent from "../NoContent/NoContent";
import ShoppingCartItem from "./ShoppingCartItem/ShoppingCartItem";
import { viewportContext } from "../ViewportProvider/ViewportProvider";

const ShoppingCart = () => {
	const cartProducts = useSelector((state) => state.cart.products);
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
					<span className="smallText itemsCount">
						{cartProducts[0].candleId !== -1 ? cartProducts.length : "0"}
					</span>
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
				{cartProducts[0].candleId !== -1 ? (
					<div className="cartContent">
						{cartProducts.map((product) => {
							return <ShoppingCartItem product={product} />;
						})}
					</div>
				) : (
					<NoContent
						iconName="emptyBox"
						text="You haven't any candle in your cart yet !"
						linkText="Start shopping !"
						linkPath="/candles"
					/>
				)}
			</div>

			{/* <div
				className={"shoppingCartOverlay" + (isShoppingCartDisplayed ? " visible" : "")}
				onClick={() => setIsShoppingCartDisplayed(false)}
			/> */}
		</>
	);
};

export default ShoppingCart;
