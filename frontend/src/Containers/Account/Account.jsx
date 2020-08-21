import "./Account.scss";

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import MyOrders from "../../Components/MyOrders/MyOrders";
import MyProfile from "../../Components/MyProfile/MyProfile";
import MyWishlist from "../../Components/MyWishlist/MyWishlist";
import { useHistory } from "react-router-dom";
import userActions from "../../redux/actions/userActions";

const navSections = [
	{ id: "profile", name: "MY PROFILE", component: <MyProfile /> },
	{ id: "orders", name: "MY ORDERS", component: <MyOrders /> },
	{ id: "addresses", name: "MY ADDRESSES", component: null },
	{ id: "wishlist", name: "MY WISHLIST", component: <MyWishlist /> },
];

const Account = () => {
	const currentUser = useSelector((state) => state.user.data);
	const dispatch = useDispatch();

	const history = useHistory();

	const logOut = () => {
		dispatch(userActions.USER_LOGOUT);
		localStorage.removeItem("xsrfToken");
		history.push("/");
	};

	const [displayedSection, setDisplayedSection] = useState("profile");

	return (
		<div className="account">
			<nav className="accountNav">
				<ul className="accountNavList mediumText">
					{navSections.map((section, i) => {
						return (
							<li
								key={i}
								id={section.id}
								className={
									"accountNavListItems lightDarkColor" +
									(displayedSection === section.id ? " active" : "")
								}
								onClick={(e) => setDisplayedSection(e.target.id)}
							>
								{section.name}
							</li>
						);
					})}
				</ul>
				<button className="smallText lightGreyColor" onClick={() => logOut()}>
					LOG OUT
				</button>
			</nav>
			<div className="sectionWrapper">
				<p className="largeText mediumBold alignCenter">
					Welcome, {currentUser.firstName} !
				</p>

				{navSections.map((section, i) => {
					if (section.id === displayedSection) {
						return <React.Fragment key={i}>{section.component}</React.Fragment>;
					}
					return null;
				})}
			</div>
		</div>
	);
};

export default Account;
