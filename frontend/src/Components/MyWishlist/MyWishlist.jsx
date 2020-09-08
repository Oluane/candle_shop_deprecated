import "./MyWishlist.scss";

import React, { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";

import DropdownMobile from "../DropdownMobile/DropdownMobile";
import IconSvg from "../IconSvg/IconSvg";
import NoContent from "../NoContent/NoContent";
import { ToastContext } from "../Toasts/ToastProvider";
import apiInstance from "../../services/api";
import { viewportContext } from "../../Components/ViewportProvider/ViewportProvider";
import wishlistActions from "../../redux/actions/wishlistActions";

const MyWishlist = () => {
	const currentUser = useSelector((state) => state.user.data);
	const wishlist = useSelector((state) => state.wishlist);
	const wishlistProducts = useSelector((state) => state.wishlist.products);
	const dispatch = useDispatch();

	const [, dispatchToast] = useContext(ToastContext);
	const { deviceWidth } = useContext(viewportContext);

	const deleteCandleFromWishlist = (candleId) => {
		apiInstance
			.delete(`/user/${currentUser.id}/wishlist/${wishlist.id}/candle/${candleId}`)
			.then(() => {
				dispatch({
					...wishlistActions.WISHLIST_DELETE_PRODUCT,
					payload: { candleId: candleId },
				});
				dispatchToast({
					type: "ADD_TOAST",
					payload: {
						id: "toast " + Date.now(),
						status: "success",
						text: "Product deleted from your wishlist",
						classes: "success",
					},
				});
			})
			.catch((err) =>
				dispatchToast({
					type: "ADD_TOAST",
					payload: {
						id: "toast " + Date.now(),
						status: "failed",
						text: "Error while deleting product from wishlist, try again",
						classes: "error",
					},
				})
			);
	};

	return (
		<div className="myWishlist alignCenter">
			<h2 className="sectionTitle">MY WISHLIST</h2>
			{wishlist.products[0].candleId !== -1 ? (
				<div className="wishlistWrapper">
					{wishlistProducts.map((product, i) => {
						return (
							<div className="wishlistRow" key={"wishlistRow" + i}>
								{deviceWidth > 688 && (
									<div
										className="trashCan svgIcon"
										onClick={() => deleteCandleFromWishlist(product.candleId)}
									>
										<IconSvg iconName="trashCan" />
									</div>
								)}
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
								{deviceWidth > 688 ? (
									<div className="addToCart svgIcon">
										<IconSvg iconName="addToCart" />
									</div>
								) : (
									<div className="dropdownWrapper">
										<DropdownMobile
											candleId={product.candleId}
											content={[
												{ title: "Add to cart", func: null },
												{
													title: "Delete from wishlist",
													func: deleteCandleFromWishlist,
												},
											]}
										/>{" "}
									</div>
								)}
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
