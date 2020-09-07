import "./AddToWishlistBtn.scss";

import React, { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";

import IconSvg from "../IconSvg/IconSvg";
import { ToastContext } from "../Toasts/ToastProvider";
import apiInstance from "../../services/api";
import wishlistActions from "../../redux/actions/wishlistActions";

const AddToWishlistBtn = ({ typeSize, scent }) => {
	const [, dispatchToast] = useContext(ToastContext);
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
						.then(() => {
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
							dispatchToast({
								type: "ADD_TOAST",
								payload: {
									id: "toast " + Date.now(),
									content: "Your product have been added to your wishlist",
									classes: " success",
								},
							});
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
