import "./AddToWishlistBtn.scss";

import { useDispatch, useSelector } from "react-redux";

import IconSvg from "../IconSvg/IconSvg";
import React from "react";
import apiInstance from "../../services/api";
import wishlistActions from "../../redux/actions/wishlistActions";

const AddToWishlistBtn = ({ typeSize, scent }) => {
	const dispatch = useDispatch();
	const currentUser = useSelector((state) => state.user.data);
	const wishlist = useSelector((state) => state.wishlist);
	const wishlistProducts = useSelector((state) => state.wishlist.products);

	const addCandleToWishlist = () => {
		if (scent !== undefined) {
			const { durationInHours, price, sizeEnName, typeEnName, typeId, weightInGr } = typeSize;
			const { enName, isEssentialOil } = scent;
			apiInstance
				.get(`/candles/type_size/${typeSize.id}/scent/${scent.id}`)
				.then(({ data }) => {
					apiInstance
						.post(`/user/${currentUser.id}/wishlist/${wishlist.id}/candle`, {
							candleId: data[0].id,
						})
						.then(({ response }) => {
							const product = {
								candleId: data[0].id,
								typeId,
								weightInGr,
								durationInHours,
								price,
								sizeEnName,
								typeEnName,
								scentsEnName: enName,
								isEssentialOil,
							};

							dispatch({ ...wishlistActions.WISHLIST_ADD_PRODUCT, payload: product });
						})
						.catch((err) => console.log(err));
				})
				.catch((err) => console.log(err));
		}
	};

	return (
		<button className="addToWishlist" onClick={() => addCandleToWishlist()}>
			<div className="addToWishlistIcon">
				<IconSvg iconName="heart" />
			</div>
		</button>
	);
};

export default AddToWishlistBtn;
