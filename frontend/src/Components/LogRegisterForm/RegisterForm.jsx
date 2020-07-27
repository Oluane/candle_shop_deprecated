import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import "./LogRegisterForm.scss";
import IconSvg from "../IconSvg/IconSvg";
import { isInputFilled } from "../../services/utils/inputsUtils";
import apiInstance from "../../services/api";
import userActions from "../../redux/actions/userActions";

const RegisterForm = () => {
	const [mailAddress, setMailAddress] = useState("");
	const [password, setPassword] = useState("");
	const [passwordConfirm, setPasswordConfirm] = useState("");
	const [arePasswordSame, setArePasswordSame] = useState(false);
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [birthdate, setBirthdate] = useState("");
	const [newsletterIn, setNewsletterIn] = useState(false);

	const dispatch = useDispatch();

	const createNewCustomer = (e) => {
		e.preventDefault();

		const userData = {
			mail_address: mailAddress,
			password: password,
			first_name: firstName,
			last_name: lastName,
			birthdate: birthdate,
			newsletter_checked: newsletterIn,
		};

		axios
			.post("/api/auth/signup", userData)
			.then(({ data }) => {
				const xsrfToken = data.xsrfToken;
				localStorage.setItem("xsrfToken", xsrfToken);
				return apiInstance
					.get(`/user/${data.userId}`)
					.then(({ data }) => {
						dispatch({ ...userActions.USER_LOGIN, payload: data[0] });
					})
					.catch((err) => console.log(err));
			})
			.catch((err) => console.log(err));
	};

	const isPasswordsIso = (e) => {
		if (e.target.name == "password" && passwordConfirm != "") {
			if (e.target.value == passwordConfirm) {
				setArePasswordSame(true);
			} else {
				setArePasswordSame(false);
			}
		} else if (e.target.name == "passwordConfirm" && password != "") {
			if (e.target.value == password) {
				setArePasswordSame(true);
			} else {
				setArePasswordSame(false);
			}
		}
	};

	return (
		<div className="formWrapper">
			<div className="formContent lightDarkColor">
				<h2 className="formHeader alignCenter">REGISTER</h2>
				<form
					className="formContainer"
					onSubmit={(e) => createNewCustomer(e)}
					autoComplete="on"
				>
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
					<div className="midWidthInputWrapper">
						<div
							className={
								"inputLabel midWidthInput" +
								(isInputFilled(firstName) ? " filled" : "")
							}
						>
							<input
								type="text"
								name="firstname"
								value={firstName}
								onChange={(e) => setFirstName(e.target.value)}
								className="formInput usualText"
							/>
							<span className="smallText inputPlaceholder">First name</span>
						</div>
						<div
							className={
								"inputLabel midWidthInput" +
								(isInputFilled(lastName) ? " filled" : "")
							}
						>
							<input
								type="text"
								name="lastname"
								value={lastName}
								onChange={(e) => setLastName(e.target.value)}
								className="formInput usualText"
							/>
							<span className="smallText inputPlaceholder">Last name</span>
						</div>
					</div>

					<div className="inputLabel specialDisplay">
						<input
							type="date"
							name="birthdate"
							value={birthdate}
							onChange={(e) => setBirthdate(e.target.value)}
							className="formInput usualText"
						/>
						<span className="smallText inputPlaceholder">Birthdate</span>
					</div>
					<div className={"inputLabel" + (isInputFilled(password) ? " filled" : "")}>
						<input
							type="password"
							name="password"
							value={password}
							onChange={(e) => {
								setPassword(e.target.value);
								isPasswordsIso(e);
							}}
							className="formInput usualText"
						/>
						<span className="smallText inputPlaceholder">Password</span>
					</div>
					<div
						className={"inputLabel" + (isInputFilled(passwordConfirm) ? " filled" : "")}
					>
						<input
							type="password"
							name="passwordConfirm"
							value={passwordConfirm}
							onChange={(e) => {
								setPasswordConfirm(e.target.value);
								isPasswordsIso(e);
							}}
							className="formInput usualText"
						/>
						<span className="smallText inputPlaceholder">Confirm your password</span>
					</div>

					<div className="inputLabel checkboxInput">
						<input
							type="checkbox"
							name="newsletterIn"
							onChange={() => setNewsletterIn(!newsletterIn)}
							className="customCheckbox "
						/>
						<span className="checkIcon">
							<IconSvg iconName="checkArrow" />
						</span>
						<span className="smallText checkboxText">
							I subscribe to the super Candle Shop newsletter !
						</span>
					</div>

					<button type="submit" value="Login" className="submitButton">
						<span className="mediumText bold">Register</span>
					</button>
				</form>

				<p className="smallText lightGreyColor alignCenter">
					Already registered on Candle Shop ?{" "}
					<Link to="/account/login" className="mediumBold decoratedLinks">
						Login
					</Link>
				</p>
			</div>
		</div>
	);
};

export default RegisterForm;
