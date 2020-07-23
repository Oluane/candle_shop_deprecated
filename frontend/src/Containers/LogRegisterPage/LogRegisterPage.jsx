import React, { useState } from "react";
import "./LogRegisterPage.scss";
import LoginForm from "../../Components/LoginForm/LoginForm";
import { useEffect } from "react";
import { Redirect } from "react-router-dom";

const LogRegisterPage = (props) => {
	const [isLogIn, setIsLogIn] = useState(false);
	const [isRegister, setIsRegister] = useState(false);

	useEffect(() => {
		const queryParam = props.match.params;
		if (queryParam.type === "login") {
			setIsLogIn(true);
		}
		if (queryParam.type === "register") {
			setIsRegister(true);
		}
	}, [props.match.params]);

	return (
		<div className="logRegisterContainer">
			<div className="overlay">
				<br />
				{isLogIn && <LoginForm />}
				{isRegister && <p>"REGISTER !!!!"</p>}
			</div>
		</div>
	);
};

export default LogRegisterPage;
