import React, { useState, useEffect } from "react";
import axios from "axios";

const LoginForm = () => {
	const [mailAddress, setMailAddress] = useState("");
	const [password, setPassword] = useState("");
	const [test, setTest] = useState("");
	const tester = (e) => {
		e.preventDefault();
		console.log("bonjour");
		console.log(typeof test);
		localStorage.setItem("TEST", mailAddress);
	};
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
				<input type="text" value={test} onChange={(e) => setTest(e.target.value)} />
				<input type="submit" value="Login" />
			</form>
		</div>
	);
};

export default LoginForm;
