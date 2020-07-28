import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Switch, Route, Redirect } from "react-router-dom";
import { routes } from "../../services/routes";
import Navbar from "../Navbar/Navbar";
import apiInstance from "../../services/api";
import userActions from "../../redux/actions/userActions";

const PrivateRoute = ({ component: Component, auth, ...rest }) => (
	<Route
		{...rest}
		render={(props) =>
			auth === true ? <Component {...props} /> : <Redirect to="/account/login" />
		}
	/>
);

const Router = () => {
	const dispatch = useDispatch();

	const isLoggedUser = useSelector((state) => state.user.isLoggedIn);

	useEffect(() => {
		let xsrfToken = null;
		xsrfToken = localStorage.getItem("xsrfToken");

		if (xsrfToken !== null) {
			apiInstance
				.get("/user")
				.then(({ data }) => {
					dispatch({ ...userActions.USER_LOGIN, payload: data[0] });
				})
				.catch((err) => console.log(err));
		}
	}, []);

	return (
		<>
			<Navbar />
			<main style={{ marginTop: "50px" }}>
				<Switch>
					{Object.keys(routes).map((route, key) => {
						const { path, component, isPrivate } = routes[route];

						if (!isPrivate) {
							return <Route exact path={path} component={component} key={key} />;
						} else {
							return (
								<PrivateRoute
									exact
									path={path}
									component={component}
									auth={isLoggedUser}
									key={key}
								/>
							);
						}
					})}
				</Switch>
			</main>
		</>
	);
};

export default Router;
