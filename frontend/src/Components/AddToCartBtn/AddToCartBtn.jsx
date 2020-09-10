import "./AddToCartBtn.scss";

import React, { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";

import IconSvg from "../IconSvg/IconSvg";
import { ToastContext } from "../Toasts/ToastProvider";
import apiInstance from "../../services/api/api";
import cartActions from "../../redux/actions/cartActions";

const AddToCartBtn = ({ btnType, typeSize, scent }) => {
	const [, dispatchToast] = useContext(ToastContext);
	const dispatch = useDispatch();
	// const cartProducts = useSelector((state) => state.cart.products);

	const addCandleToCart = () => {
		if (scent !== undefined) {
			const { price, sizeEnName, typeEnName, typeId } = typeSize;
			const { enName } = scent;
			apiInstance
				.get(`/candles/type_size/${typeSize.typeSizeId}/scent/${scent.id}`)
				.then(({ data }) => {
					const product = {
						candleId: data[0].id,
						unitPrice: price,
						quantity: 1,
						isAvailable: null,
						sizeEnName,
						typeEnName,
						scentsEnName: enName,
						typeId,
					};

					dispatch({ ...cartActions.CART_ADD_PRODUCT, payload: product });
					dispatchToast({
						type: "ADD_TOAST",
						payload: {
							id: "toast " + Date.now(),
							status: "success",
							text: "Product added to your cart",
							classes: "success",
						},
					});
				})
				.catch((err) => console.log(err));
		} else {
			dispatchToast({
				type: "ADD_TOAST",
				payload: {
					id: "toast " + Date.now(),
					status: "failed",
					text: "You must choose a scent before adding products to your cart",
					classes: "error",
				},
			});
		}
	};

	return (
		<>
			{btnType === "text" && (
				<button
					className="addToCartTextBtn smallText mediumBold"
					onClick={() => addCandleToCart()}
				>
					<span>ADD TO CART</span>{" "}
					<span className="separatorBefore">{typeSize.price}€</span>
				</button>
			)}

			{btnType === "icon" && (
				<div className="addToCartIconBtn" onClick={() => addCandleToCart()}>
					<IconSvg iconName="addToCart" />
				</div>
			)}
		</>
	);
};

export default AddToCartBtn;
