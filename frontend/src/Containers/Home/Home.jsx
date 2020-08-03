import React from "react";
import { Link } from "react-router-dom";
import BannerHeader from "../../Components/BannerHeader/BannerHeader";
import ScentsFamilies from "../../Components/ScentsFamilies/ScentsFamilies";

const Home = (props) => {
	return (
		<>
			{" "}
			<BannerHeader />
			<ScentsFamilies />
			<ul>
				<li>
					<Link to="/login">Login</Link>
				</li>
				<li>
					<Link to={`/account/user`}>Account</Link>
				</li>
			</ul>
		</>
	);
};

export default Home;
