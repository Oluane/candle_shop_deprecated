import React, { useState } from "react";
import "./LogRegisterPage.scss";
import LoginForm from "../../Components/LogRegisterForm/LoginForm";
import { useEffect } from "react";
import RegisterForm from "../../Components/LogRegisterForm/RegisterForm";
import { useParams } from "react-router-dom";

const LogRegisterPage = (props) => {
	const [isLogIn, setIsLogIn] = useState(false);
	const [isRegister, setIsRegister] = useState(false);
	const { type } = useParams();

	useEffect(() => {
		if (type === "login") {
			setIsLogIn(true);
			setIsRegister(false);
		}
		if (type === "register") {
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
