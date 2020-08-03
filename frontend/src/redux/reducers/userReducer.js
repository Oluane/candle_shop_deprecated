import userActions from "../actions/userActions";

const initial = {
	isLoggedIn: false,
	data: {
		id: -1,
		firstName: "",
		lastName: "",
		mailAddress: "",
		address: "",
		addressComplement: "",
		city: "",
		zipCode: "",
		phoneNumber: "",
		cguChecked: 0,
		newsletterChecked: 0,
	},
};

export default (state = initial, action) => {
	switch (action.type) {
		case userActions.USER_LOGIN.type:
			return {
				...state,
				isLoggedIn: true,
				data: { ...action.payload },
			};
		case userActions.USER_LOGOUT.type:
			return initial;
		default:
			return state;
	}
};
