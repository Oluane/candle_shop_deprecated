import React, { useEffect, useState } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Footer from "../Footer/Footer";
import NavbarDisplayer from "../Navbar/NavbarDisplayer";
import apiInstance from "../../services/api";
import { routes } from "../../services/routes";
import userActions from "../../redux/actions/userActions";
import wishlistActions from "../../redux/actions/wishlistActions";

const PrivateRoute = ({ component: Component, auth, authenticationRequestState, ...rest }) => (
	<Route
		{...rest}
		render={(props) => {
			switch (auth) {
				case true:
					return <Component {...props} />;
				case false:
					switch (authenticationRequestState) {
						case "notYetAsked":
						case "loading":
							return null;
						case "ok":
							return <Component {...props} />;
						case "invalidToken":
						case "noToken":
							return (
								<Redirect
									to={{
										pathname: "/account/login",
										state: { from: props.location.pathname },
									}}
								/>
							);
						default:
							return null;
					}
				default:
					return null;
			}
		}}
	/>
);

const Router = () => {
	const dispatch = useDispatch();

	const isLoggedUser = useSelector((state) => state.user.isLoggedIn);
	const [authenticationRequestState, setAuthenticationRequestState] = useState("notYetAsked");

	useEffect(() => {
		if (!isLoggedUser) {
			let xsrfToken = localStorage.getItem("xsrfToken");

			if (xsrfToken !== null) {
				setAuthenticationRequestState("loading");
				apiInstance
					.get("/user")
					.then(({ data }) => {
						dispatch({ ...userActions.USER_LOGIN, payload: data[0] });
						apiInstance
							.get(`/user/${data[0].id}/wishlist`)
							.then(({ data }) => {
								const { wishlistId, creationDatetime } = data[0];
								const wishlistProducts = data.map(
									({ wishlistId, creationDatetime, ...keepProperties }) =>
										keepProperties
								);
								dispatch({
									...wishlistActions.WISHLIST_SET,
									payload: {
										id: wishlistId,
										creationDatetime,
										products:
											wishlistProducts[0].candleId !== null
												? wishlistProducts
												: [],
									},
								});
							})
							.catch((err) => console.log(err));
						setAuthenticationRequestState("ok");
					})
					.catch((err) => {
						if (err.response.status === 401) {
							setAuthenticationRequestState("invalidToken");
						} else {
							setAuthenticationRequestState("internalError");
						}
					});
			} else {
				setAuthenticationRequestState("noToken");
			}
		}
	}, [isLoggedUser, dispatch]);

	return (
		<>
			<NavbarDisplayer />
			<main style={{ marginTop: "65px" }}>
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
									authenticationRequestState={authenticationRequestState}
								/>
							);
						}
					})}
					<Redirect from="*" to="/" />
				</Switch>
			</main>
			<Footer />
		</>
	);
};

export default Router;
