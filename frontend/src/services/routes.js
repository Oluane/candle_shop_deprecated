import LogRegisterPage from "../Containers/LogRegisterPage/LogRegisterPage";
import Account from "../Containers/Account/Account";
import Home from "../Containers/Home/Home";
import ScentFamily from "../Containers/ScentFamily/ScentFamily";
import AboutUs from "../Containers/AboutUs/AboutUs";
import Candles from "../Containers/Candles/Candles";

export const routes = {
	Home: { path: "/", component: Home, isPrivate: false },
	Account: { path: "/account/user", component: Account, isPrivate: true },
	LogRegisterPage: { path: "/account/:type", component: LogRegisterPage, isPrivate: false },
	ScentFamily: { path: "/scents_families/:catId", component: ScentFamily, isPrivate: false },
	AboutUs: { path: "/about_us", component: AboutUs, isPrivate: false },
	Candles: { path: "/candles", component: Candles, isPrivate: false },
};
