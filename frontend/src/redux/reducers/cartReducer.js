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

		case cartActions.CART_EDIT_STOCK_PRODUCT.type:
			// console.log(action.payload);
			const fetchedStock = action.payload;

			const productsWithAvailability = state.products.map((product, i) => {
				if (fetchedStock[0] !== undefined) {
					let idx = fetchedStock.findIndex((e) => e.candleId === product.candleId);

					if (fetchedStock[idx].availableStock >= product.quantity) {
						product.isAvailable = true;
					} else {
						product.isAvailable = false;
					}
					return product;
				}
				return product;
			});

			console.log(productsWithAvailability);

			return {
				products: productsWithAvailability,
			};

		default:
			return state;
	}
};
