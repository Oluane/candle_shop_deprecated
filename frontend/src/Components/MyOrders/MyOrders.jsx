import React, { useState } from "react";
import { Link } from "react-router-dom";
//import { useSelector, useDispatch } from "react-redux";
import "./MyOrders.scss";
import IconSvg from "../../Components/IconSvg/IconSvg";
import userActions from "../../redux/actions/userActions";

const MyOrders = () => {
	// const currentUser = useSelector((state) => state.user.data);
	// const dispatch = useDispatch();

	return (
		<div className="myOrders alignCenter">
			<h2 className="sectionTitle">MY ORDERS</h2>

			<div className="noOrderContainer">
				<div className="emptyBoxIcon">
					<IconSvg iconName="emptyBox" />{" "}
				</div>
				<p className="usualText">You haven't any orders yet. </p>

				<Link className="buttonLink mediumText mediumBold " to="/">
					Start shopping !
				</Link>
			</div>
		</div>
	);
};

export default MyOrders;
