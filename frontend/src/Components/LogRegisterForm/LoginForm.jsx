import React, { useState, useEffect } from "react";
import axios from "axios";
import "./LogRegisterForm.scss";
import { Link } from "react-router-dom";
import { isInputFilled } from "../../services/utils/inputsUtils";
import apiInstance from "../../services/api";

const LoginForm = () => {
	const [mailAddress, setMailAddress] = useState("");
	const [password, setPassword] = useState("");

	const tester = (e) => {
		e.preventDefault();
		const userData = { mail_address: mailAddress, password: password };
		apiInstance
			.post("/auth/login", userData)
			.then((response) => {
				const xsrfToken = response.data.xsrfToken;
				localStorage.setItem("xsrfToken", xsrfToken);
				const userId = response.data.userId;
				return apiInstance
					.get(`/user/${userId}`)
					.then((res) => console.log(res))
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
				<form className="formContainer" onSubmit={(e) => tester(e)} autoComplete="on">
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
