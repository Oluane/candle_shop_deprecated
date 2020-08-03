import LogRegisterPage from "../Containers/LogRegisterPage/LogRegisterPage";
import Account from "../Containers/Account/Account";
import Home from "../Containers/Home/Home";
import ScentFamily from "../Containers/ScentFamily/ScentFamily";

export const routes = {
	Home: { path: "/", component: Home, isPrivate: false },
	Account: { path: "/account/user", component: Account, isPrivate: true },
	LogRegisterPage: { path: "/account/:type", component: LogRegisterPage, isPrivate: false },
	ScentFamily: { path: "/scents_families/:catId", component: ScentFamily, isPrivate: false },
};
