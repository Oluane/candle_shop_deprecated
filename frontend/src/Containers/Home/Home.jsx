import React from "react";
import { Link } from "react-router-dom";

const Home = (props) => {
	console.log(props.customerId);
	return (
		<main>
			{" "}
			<h1>This is the homepage, welcome !</h1>
			<ul>
				<li>
					<Link to="/login">Login</Link>
				</li>
				<li>
					<Link to={`/account/${props.customerId}`}>Account</Link>
				</li>
			</ul>
		</main>
	);
};

export default Home;
