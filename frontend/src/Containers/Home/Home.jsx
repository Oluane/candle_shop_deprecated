import React from "react";
import { Link } from "react-router-dom";
import BannerHeader from "../../Components/BannerHeader/BannerHeader";

const Home = (props) => {
	return (
		<>
			{" "}
			<BannerHeader />
			<ul>
				<li>
					<Link to="/login">Login</Link>
				</li>
				<li>
					<Link to={`/account/${props.customerId}`}>Account</Link>
				</li>
			</ul>
		</>
	);
};

export default Home;
