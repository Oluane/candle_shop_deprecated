import addressesActions from "../actions/addressesActions";

const initial = [
	{ id: -1, address: "", addressComplement: "", city: "", zipCode: "", name: "", isFavorite: 0 },
];

export default (state = initial, action) => {
	switch (action.type) {
		case addressesActions.ADDRESSES_SET.type:
			return action.payload[0] !== undefined ? [...action.payload] : [...state];

		case addressesActions.ADDRESSES_EDIT_ONE.type:
			const prevAddressIdx = state.findIndex((address) => address.id === action.payload.id);
			const newStateToEdit = [...state];
			newStateToEdit[prevAddressIdx] = action.payload;
			if (action.payload.isFavorite === 1) {
				const prevFavAddressIdx = state.findIndex(
					(address) => address.isFavorite === 1 && address.id !== action.payload.id
				);
				newStateToEdit[prevFavAddressIdx].isFavorite = 0;
			}
			return newStateToEdit;

		case addressesActions.ADDRESSES_DELETE_ONE.type:
			return (state = state.filter((address) => address.id !== action.payload.addressId));

		case addressesActions.ADDRESSES_ADD_ONE.type:
			const newState = [...state];
			newState.push(action.payload);
			if (action.payload.isFavorite === 1) {
				const prevFavAddressIdx = state.findIndex(
					(address) => address.isFavorite === 1 && address.id !== action.payload.id
				);
				newState[prevFavAddressIdx].isFavorite = 0;
			}

			return newState;

		case addressesActions.ADDRESSES_LOGOUT_INITIAL.type:
			return initial;

		default:
			return state;
	}
};
