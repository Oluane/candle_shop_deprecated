import cartActions from "../actions/cartActions";

const initial = {
	products: [
		{
			candleId: -1,
			unitPrice: 0,
			quantity: 0,
			isAvailable: null,
			scentsEnName: "",
			typeId: -1,
			typeEnName: "",
			sizeEnName: "",
		},
	],
};

export default (state = initial, action) => {
	switch (action.type) {
		case cartActions.CART_ADD_PRODUCT.type:
			return {
				products:
					state.products[0].candleId === -1
						? [action.payload]
						: [...state.products, action.payload],
			};

		case cartActions.CART_DELETE_PRODUCT.type:
			const newProducts = state.products.filter(
				(product) => product.candleId !== action.payload.candleId
			);
			return {
				...state,
				products: newProducts.length === 0 ? initial.products : newProducts,
			};

		case cartActions.CART_EDIT_QUANTITY_PRODUCT.type:
			let candleIdx = state.products.findIndex(
				(product) => product.candleId === action.payload.candleId
			);

			const editedProducts = state.products;
			editedProducts[candleIdx].quantity = Number(action.payload.newQuantity);

			return {
				products: editedProducts,
			};
		default:
			return state;
	}
};
