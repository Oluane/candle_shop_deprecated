import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import userActions from "../../redux/actions/userActions";

const Account = () => {
	const currentUser = useSelector((state) => state.user.data);
	const dispatch = useDispatch();

	const history = useHistory();

	const logOut = () => {
		dispatch(userActions.USER_LOGOUT);
		localStorage.removeItem("xsrfToken");
		history.push("/");
	};

	return (
		<div>
			Hello {currentUser.firstName}
			<button onClick={() => logOut()}>Log out</button>
		</div>
	);
};

export default Account;
