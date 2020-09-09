import "./ShoppingCartItem.scss";

import React, { useState } from "react";

import cartActions from "../../../redux/actions/cartActions";
import { useDispatch } from "react-redux";

const ShoppingCartItem = ({ product }) => {
	const dispatch = useDispatch();
	const { candleId, typeId, typeEnName, sizeEnName, scentsEnName, unitPrice, quantity } = product;

	const [quantityValue, setQuantityValue] = useState(quantity);

	const deleteCandleFromCart = () => {
		dispatch({
			...cartActions.CART_DELETE_PRODUCT,
			payload: { candleId: candleId },
		});
	};

	return (
		<div className="productRow" key={"candleCart" + candleId}>
			<div className="productImg">
				<img
					src={`/images/candle_types/candle_type_${typeId}_1.jpg`}
					alt={`${typeEnName} candles`}
				/>
			</div>
			<div className="productInfos">
				<p className="productTitle usualText mediumBold">
					{`${sizeEnName} 
                ${scentsEnName} 
                ${typeEnName} candle`}
				</p>
				<p className="mediumText mediumBold">{unitPrice} €</p>
				<div className="productActions">
					<div className="quantityInput">
						<input
							id="number"
							value={quantityValue}
							type="number"
							min="1"
							max="15"
							onChange={(e) => setQuantityValue(e.target.value)}
						/>
					</div>
					<button onClick={() => deleteCandleFromCart()}>Delete</button>
				</div>
			</div>
		</div>
	);
};

export default ShoppingCartItem;
