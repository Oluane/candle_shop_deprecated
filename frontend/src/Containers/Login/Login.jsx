import React from "react";
import LoginForm from "../../Components/LoginForm/LoginForm";
import { useEffect } from "react";
import { Redirect } from "react-router-dom";

const Login = (props) => {
	return (
		<>
			{props.customerId ? (
				<Redirect to={`/account/${props.customerId}`} />
			) : (
				<div>
					<LoginForm />
				</div>
			)}
		</>
	);
};

export default Login;
