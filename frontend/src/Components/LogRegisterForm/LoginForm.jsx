import "./LogRegisterForm.scss";

import { Link, useHistory } from "react-router-dom";
import React, { useState } from "react";

import apiInstance from "../../services/api";
import { isInputFilled } from "../../services/utils/inputsUtils";
import { useDispatch } from "react-redux";
import userActions from "../../redux/actions/userActions";
import wishlistActions from "../../redux/actions/wishlistActions";

const LoginForm = () => {
	const [mailAddress, setMailAddress] = useState("");
	const [password, setPassword] = useState("");

	const dispatch = useDispatch();

	const history = useHistory();

	const login = (e) => {
		e.preventDefault();
		const userData = { mail_address: mailAddress, password: password };
		apiInstance
			.post("/auth/login", userData)
			.then((response) => {
				const xsrfToken = response.data.xsrfToken;
				localStorage.setItem("xsrfToken", xsrfToken);
				return apiInstance
					.get(`/user`)
					.then(({ data }) => {
						dispatch({ ...userActions.USER_LOGIN, payload: data[0] });
						apiInstance
							.get(`/user/${data[0].id}/wishlist`)
							.then(({ data }) => {
								const { wishlistId, creationDatetime } = data[0];
								const wishlistProducts = data.map(
									({ wishlistId, creationDatetime, ...keepProperties }) =>
										keepProperties
								);
								dispatch({
									...wishlistActions.WISHLIST_SET,
									payload: {
										id: wishlistId,
										creationDatetime,
										products:
											wishlistProducts[0].candleId !== null
												? wishlistProducts
												: [],
									},
								});
							})
							.catch((err) => console.log(err));
						const redirectUrl =
							history.location.state !== undefined
								? history.location.state.from
								: "/";
						history.push(redirectUrl);
					})
					.catch((err) => console.log(err));
			})
			.catch((err) => {
				console.log(err);
			});
	};

	return (
		<div className="formWrapper">
			<div className="formContent lightDarkColor">
				<h2 className="formHeader alignCenter">LOGIN</h2>
				<form className="formContainer" onSubmit={(e) => login(e)} autoComplete="on">
					<div className={"inputLabel" + (isInputFilled(mailAddress) ? " filled" : "")}>
						<input
							type="email"
							name="email"
							value={mailAddress}
							onChange={(e) => setMailAddress(e.target.value)}
							className="formInput usualText"
						/>
						<span className="smallText inputPlaceholder">E-mail</span>
					</div>
					<div className={"inputLabel" + (isInputFilled(password) ? " filled" : "")}>
						<input
							type="password"
							name="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							className="formInput usualText"
						/>
						<span className="smallText inputPlaceholder">Password</span>
					</div>

					<button type="submit" value="Login" className="submitButton">
						<span className="mediumText bold">Login</span>
					</button>
				</form>

				<p className="smallText lightGreyColor alignCenter">
					First time on Candle Shop ?{" "}
					<Link to="/account/register" className="mediumBold decoratedLinks">
						Register
					</Link>
				</p>
			</div>
		</div>
	);
};

export default LoginForm;
