import "./MyWishlist.scss";

import React, { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";

import AddToCartBtn from "../AddToCartBtn/AddToCartBtn";
import DropdownMobile from "../DropdownMobile/DropdownMobile";
import IconSvg from "../IconSvg/IconSvg";
import { Link } from "react-router-dom";
import NoContent from "../NoContent/NoContent";
import { ToastContext } from "../Toasts/ToastProvider";
import apiInstance from "../../services/api/api";
import cartActions from "../../redux/actions/cartActions";
import { useState } from "react";
import { viewportContext } from "../../Components/ViewportProvider/ViewportProvider";
import wishlistActions from "../../redux/actions/wishlistActions";

const itemsToDisplayOnInit = 6;

const MyWishlist = () => {
	const currentUser = useSelector((state) => state.user.data);
	const wishlist = useSelector((state) => state.wishlist);
	const wishlistProducts = useSelector((state) => state.wishlist.products);
	const dispatch = useDispatch();

	const [displayAllItems, setDisplayAllItems] = useState(false);

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

	const addCandleToCartMobile = (candleId) => {
		apiInstance(`/candles/${candleId}`)
			.then(({ data }) => {
				const product = data[0];
				product.quantity = 1;
				product.isAvailable = null;

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
	};

	return (
		<div className="myWishlist alignCenter">
			<h2 className="sectionTitle">MY WISHLIST</h2>
			{wishlist.products[0].candleId !== -1 ? (
				<div className="wishlistWrapper">
					{wishlistProducts.map((product, i) => {
						return (
							(i + 1 <= itemsToDisplayOnInit || displayAllItems) && (
								<div className="wishlistRow" key={"wishlistRow" + i}>
									{deviceWidth > 688 && (
										<div
											className="trashCan"
											onClick={() =>
												deleteCandleFromWishlist(product.candleId)
											}
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
											<p className="separatorBefore">
												{product.weightInGr}gr
											</p>
											<p className="separatorBefore">
												{product.durationInHours}h
											</p>
										</div>
									</div>
									{deviceWidth > 688 ? (
										<AddToCartBtn
											btnType="icon"
											typeSize={{
												typeSizeId: product.typeSizeId,
												price: product.price,
												sizeEnName: product.sizeEnName,
												typeEnName: product.typeEnName,
												typeId: product.typeId,
											}}
											scent={{
												id: product.scentId,
												enName: product.scentsEnName,
											}}
										/>
									) : (
										<div className="dropdownWrapper">
											<DropdownMobile
												candleId={product.candleId}
												content={[
													{
														title: "Add to cart",
														func: addCandleToCartMobile,
													},
													{
														title: "Delete from wishlist",
														func: deleteCandleFromWishlist,
													},
												]}
											/>{" "}
										</div>
									)}
								</div>
							)
						);
					})}
					{wishlistProducts.length < itemsToDisplayOnInit ? (
						<Link to="/candles" className="wishlistBtns smallText mediumBold">
							DISCOVER MORE CANDLES
						</Link>
					) : (
						!displayAllItems && (
							<button
								className="wishlistBtns smallText mediumBold"
								onClick={() => setDisplayAllItems(true)}
							>
								SHOW ALL CANDLES
							</button>
						)
					)}
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
