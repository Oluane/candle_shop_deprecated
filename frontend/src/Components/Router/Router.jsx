import React, { useState, useEffect } from "react";
import { routes } from "../../services/routes";
import { Switch, Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ component: Component, auth, ...rest }) => (
	<Route
		{...rest}
		render={(props) => (auth === true ? <Component {...props} /> : <Redirect to="/login" />)}
	/>
);

const Router = () => {
	const [isLoggedUser, setIsLoggedUser] = useState(false);

	// const checkingAuth = () => {
	//
	// }

	return (
		<Switch>
			{Object.keys(routes).map((route, key) => {
				const { path, component, isPrivate } = routes[route];
				if (!isPrivate) {
					return <Route path={path} component={component} />;
				} else {
					return <PrivateRoute path={path} component={component} auth={false} />;
				}
			})}
		</Switch>
	);
};

export default Router;
