import "./ShoppingCart.scss";

import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import IconSvg from "../IconSvg/IconSvg";
import NoContent from "../NoContent/NoContent";
import ShoppingCartItem from "./ShoppingCartItem/ShoppingCartItem";
import apiInstance from "../../services/api/api";
import cartActions from "../../redux/actions/cartActions";
import { viewportContext } from "../ViewportProvider/ViewportProvider";

//fetching func that can check stock for multiple candles
const fetchStockData = (productArr) => {
	return Promise.all(
		productArr.map((product) => {
			return apiInstance
				.get(`/candles/${product.candleId}/stock`)
				.then(({ data }) => data[0])
				.catch((err) => console.log(err));
		})
	);
};

const ShoppingCart = () => {
	const dispatch = useDispatch();
	const cartProducts = useSelector((state) => state.cart.products);
	const cartTotalCost = useSelector((state) => state.cart.totalCost);
	const { deviceWidth, deviceHeight } = useContext(viewportContext);
	const [isShoppingCartDisplayed, setIsShoppingCartDisplayed] = useState(false);

	const checkingProductsAvailability = (productArr) => {
		fetchStockData(productArr)
			.then((res) => {
				dispatch({ ...cartActions.CART_EDIT_STOCK_PRODUCT, payload: res });
			})
			.catch((e) => console.log(e));
	};

	// const calculateCartTotalCost = () => {

	// }

	useEffect(() => {
		dispatch({ ...cartActions.CART_CALCULATE_TOTAL_COST });
	}, [cartProducts]);

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
					<>
						<div className="cartContent">
							{cartProducts.map((product) => {
								return (
									<ShoppingCartItem
										product={product}
										key={"cartItem" + product.candleId}
										checkingProductsAvailability={checkingProductsAvailability}
									/>
								);
							})}
						</div>
						<div className="btnContainer">
							<button className="mediumText mediumBold">
								CHECKOUT | {cartTotalCost.toFixed(2)}€
							</button>
						</div>
					</>
				) : (
					<NoContent
						iconName="emptyBox"
						text="You haven't any candle in your cart yet !"
						linkText="Start shopping !"
						linkPath="/candles"
						linkCallback={() => setIsShoppingCartDisplayed(false)}
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
