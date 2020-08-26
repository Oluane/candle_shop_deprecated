import "./MyWishlist.scss";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import IconSvg from "../IconSvg/IconSvg";
import NoContent from "../NoContent/NoContent";
import apiInstance from "../../services/api";
import wishlistActions from "../../redux/actions/wishlistActions";

const MyWishlist = () => {
	const currentUser = useSelector((state) => state.user.data);
	const wishlist = useSelector((state) => state.wishlist);
	const wishlistProducts = useSelector((state) => state.wishlist.products);
	const dispatch = useDispatch();

	useEffect(() => {
		apiInstance
			.get(`/user/${currentUser.id}/wishlist`)
			.then(({ data }) => {
				const { wishlistId, creationDatetime } = data[0];
				apiInstance
					.get(`/user/${currentUser.id}/wishlist/${wishlistId}`)
					.then(({ data }) => {
						dispatch({
							...wishlistActions.WISHLIST_SET,
							payload: { id: wishlistId, creationDatetime, products: data },
						});
					})
					.catch((err) => console.log(err));
			})
			.catch((err) => console.log(err));
	}, [currentUser]);

	const deleteCandleFromWishlist = (candleId) => {
		apiInstance
			.delete(`/user/${currentUser.id}/wishlist/${wishlist.id}/candle/${candleId}`)
			.then(() => {
				dispatch({
					...wishlistActions.WISHLIST_DELETE_PRODUCT,
					payload: { candleId: candleId },
				});
			})
			.catch((err) => console.log(err));
	};

	return (
		<div className="myWishlist alignCenter">
			<h2 className="sectionTitle">MY WISHLIST</h2>
			{wishlist.products[0].candleId !== -1 ? (
				<div className="wishlistWrapper">
					{wishlistProducts.map((product, i) => {
						return (
							<div className="wishlistRow">
								<div
									className="trashCan svgIcon"
									onClick={() => deleteCandleFromWishlist(product.candleId)}
								>
									<IconSvg iconName="trashCan" />
								</div>
								<div className="wishlistProductImg">
									<img
										src={`/images/candle_types/candle_type_${product.typeId}_1.jpg`}
										alt={`${product.typeEnName} candles`}
									/>
								</div>
								<div className="wishlistProductInfos">
									<h4 className="candleTitle mediumBold">
										{product.scentsEnName} {product.typeEnName} Candle
									</h4>
									<div className="candleInfoContainer mediumText">
										<p className="mediumBold">{product.price}€</p>
										<p className="separatorBefore">{product.sizeEnName}</p>
										<p className="separatorBefore">{product.weightInGr}gr</p>
										<p className="separatorBefore">
											{product.durationInHours}h
										</p>
									</div>
								</div>
								<div className="addToCart svgIcon">
									<IconSvg iconName="addToCart" />
								</div>
							</div>
						);
					})}
				</div>
			) : (
				<NoContent
					iconName="wishlist"
					text="You haven't any candle in your wishlist yet !"
					linkText="Discover"
					linkPath="/candles"
				/>
			)}
		</div>
	);
};

export default MyWishlist;
