import React from "react";
import Login from "../Containers/Login/Login";
import Account from "../Containers/Account/Account";
import Home from "../Containers/Home/Home";

export const routes = {
	Home: { path: "/", component: Home, isPrivate: false },
	Login: { path: "/login", component: Login, isPrivate: false },
	Account: { path: "/account/:customerId", component: Account, isPrivate: true },
};
