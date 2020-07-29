import React from "react";
import { Link } from "react-router-dom";
import BannerHeader from "../../Components/BannerHeader/BannerHeader";
import ScentsCategories from "../../Components/ScentsCategories/ScentsCategories";

const Home = (props) => {
	return (
		<>
			{" "}
			<BannerHeader />
			{/* <h1>This is the homepage, welcome !</h1> */}
			<ScentsCategories />
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
