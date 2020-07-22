import userActions from "../actions/userActions";

const initial = {
	isLoggedIn: false,
	data: {},
};

export default (state = initial, action) => {
	switch (action.type) {
		case userActions.USER_LOGIN.type:
			return {
				...state,
				isLoggedIn: true,
				data: action.user,
			};

		default:
			return state;
	}
};
