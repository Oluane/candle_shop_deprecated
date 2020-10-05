import addressesActions from "../actions/addressesActions";

const initial = [
	{ id: -1, address: "", addressComplement: "", city: "", zipCode: "", name: "", isFavorite: 0 },
];

export default (state = initial, action) => {
	switch (action.type) {
		case addressesActions.ADDRESSES_SET.type:
			return action.payload[0] !== undefined ? [...action.payload] : [...state];
		case addressesActions.ADDRESSES_EDIT.type:
			return state;
		case addressesActions.ADDRESSES_LOGOUT_INITIAL.type:
			return initial;
		default:
			return state;
	}
};
