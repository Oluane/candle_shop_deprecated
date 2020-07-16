import React, { useState, useEffect } from "react";
import axios from "axios";

const LoginForm = () => {
	const [mailAddress, setMailAddress] = useState("");
	const [password, setPassword] = useState("");

	const tester = (e) => {
		e.preventDefault();
		const userData = { mail_address: mailAddress, password: password };
		axios.post("/api/auth/login", userData).then(
			(response) => {
				const xsrfToken = response.data.xsrfToken;
				localStorage.setItem("xsrfToken", xsrfToken);
			},
			(err) => {
				console.log(err);
			}
		);
	};

	useEffect(() => {
		let xsrfToken = null;
		if (localStorage.getItem("xsrfToken")) {
			xsrfToken = localStorage.getItem("xsrfToken");
		}

		axios.get("/api/auth/protected", { headers: { "x-xsrf-token": xsrfToken } }).then(
			(response) => {
				console.log(response);
			},
			(err) => {
				console.log(err);
			}
		);
	}, []);
	return (
		<div>
			<form onSubmit={(e) => tester(e)}>
				<input
					type="email"
					name="email"
					value={mailAddress}
					onChange={(e) => setMailAddress(e.target.value)}
				/>
				<input
					type="password"
					name="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
				<input type="submit" value="Login" />
			</form>
		</div>
	);
};

export default LoginForm;
