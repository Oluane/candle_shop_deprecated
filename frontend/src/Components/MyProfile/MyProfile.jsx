import React, { useState } from "react";
import { Link } from "react-router-dom";
//import { useSelector, useDispatch } from "react-redux";
import "./MyProfile.scss";
import IconSvg from "../../Components/IconSvg/IconSvg";
import userActions from "../../redux/actions/userActions";

const MyProfile = () => {
	// const currentUser = useSelector((state) => state.user.data);
	// const dispatch = useDispatch();

	return (
		<div className="myProfile alignCenter">
			<h2 className="sectionTitle">MY PROFILE</h2>
		</div>
	);
};

export default MyProfile;
