import React, { useState, useEffect } from "react";
import { routes } from "../../services/routes";
import { Switch, Route, Redirect } from "react-router-dom";
import axios from "axios";
import Navbar from "../Navbar/Navbar";

const PrivateRoute = ({ component: Component, auth, ...rest }) => (
	<Route
		{...rest}
		render={(props) => (auth === true ? <Component {...props} /> : <Redirect to="/login" />)}
	/>
);

const Router = () => {
	const [isLoggedUser, setIsLoggedUser] = useState(false);
	const [customerId, setCustomerId] = useState(null);

	useEffect(() => {
		let xsrfToken = null;
		if (localStorage.getItem("xsrfToken")) {
			xsrfToken = localStorage.getItem("xsrfToken");
		}
		axios.get("/api/auth", { headers: { "x-xsrf-token": xsrfToken } }).then((res) => {
			if (res.data.isValid) {
				setIsLoggedUser(true);
				setCustomerId(res.data.userId);
			}
		});
	}, []);

	return (
		<>
			<Navbar />
			<Switch>
				{Object.keys(routes).map((route, key) => {
					const { path, component, isPrivate } = routes[route];

					if (!isPrivate) {
						return (
							<Route
								exact
								path={path}
								component={component}
								customerId={customerId}
							/>
						);
					} else {
						return (
							<PrivateRoute
								path={path}
								component={component}
								auth={isLoggedUser}
								customerId={customerId}
							/>
						);
					}
				})}
			</Switch>
		</>
	);
};

export default Router;
