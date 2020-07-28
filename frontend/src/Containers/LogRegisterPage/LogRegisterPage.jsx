import React, { useState } from "react";
import "./LogRegisterPage.scss";
import LoginForm from "../../Components/LogRegisterForm/LoginForm";
import { useEffect } from "react";
import RegisterForm from "../../Components/LogRegisterForm/RegisterForm";

const LogRegisterPage = (props) => {
	const [isLogIn, setIsLogIn] = useState(false);
	const [isRegister, setIsRegister] = useState(false);

	useEffect(() => {
		const queryParam = props.match.params;
		if (queryParam.type === "login") {
			setIsLogIn(true);
			setIsRegister(false);
		}
		if (queryParam.type === "register") {
			setIsRegister(true);
			setIsLogIn(false);
		}
	}, [props.match.params]);

	return (
		<div className="logRegisterContainer">
			<div className="overlay">
				{isLogIn && <LoginForm />}
				{isRegister && <RegisterForm />}
			</div>
		</div>
	);
};

export default LogRegisterPage;
