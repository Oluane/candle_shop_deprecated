import React from "react";
import LogRegisterPage from "../Containers/LogRegisterPage/LogRegisterPage";
import Account from "../Containers/Account/Account";
import Home from "../Containers/Home/Home";

export const routes = {
	Home: { path: "/", component: Home, isPrivate: false },
	LogRegisterPage: { path: "/account/:type", component: LogRegisterPage, isPrivate: false },
	//Account: { path: "/account/:customerId", component: Account, isPrivate: true },
};
