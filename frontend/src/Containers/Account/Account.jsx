import "./Account.scss";

import React, { useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import IconSvg from "../../Components/IconSvg/IconSvg";
import MyOrders from "../../Components/MyOrders/MyOrders";
import MyProfile from "../../Components/MyProfile/MyProfile";
import MyWishlist from "../../Components/MyWishlist/MyWishlist";
import { useHistory } from "react-router-dom";
import userActions from "../../redux/actions/userActions";
import { viewportContext } from "../../Components/ViewportProvider/ViewportProvider";
import wishlistActions from "../../redux/actions/wishlistActions";

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

	const { width, height } = useContext(viewportContext);

	const logOut = () => {
		dispatch(userActions.USER_LOGOUT);
		dispatch(wishlistActions.WISHLIST_LOGOUT_INITIAL);
		localStorage.removeItem("xsrfToken");
		history.push("/");
	};

	const [displayedSection, setDisplayedSection] = useState(navSections[0]);

	const [showDropdown, setShowDropdown] = useState(false);

	return (
		<div className="account">
			<nav className="accountNav">
				{width > 688 ? (
					<ul className="accountNavList mediumText">
						{navSections.map((section, i) => {
							return (
								<li
									key={i}
									id={section.id}
									className={
										"accountNavListItems lightDarkColor" +
										(displayedSection.id === section.id ? " active" : "")
									}
									onClick={(e) => setDisplayedSection(section)}
								>
									{section.name}
								</li>
							);
						})}
					</ul>
				) : (
					<>
						<div
							className="selectorCustom"
							onClick={() => setShowDropdown(!showDropdown)}
						>
							<span className="selectorCustomValue usualText">
								{displayedSection.name}
							</span>
							<div className="selectorArrow">
								<IconSvg iconName="rightArrow" />
							</div>
						</div>
						<div className={"selectorDropdown" + (showDropdown ? " visible" : "")}>
							{navSections.map((section, i) => {
								if (section !== displayedSection) {
									return (
										<p
											key={i}
											className="selectorValues usualText"
											onClick={() => {
												setDisplayedSection(section);
												setShowDropdown(false);
											}}
										>
											{section.name}
										</p>
									);
								}
								return null;
							})}
						</div>
					</>
				)}
				<button className="smallText lightGreyColor" onClick={() => logOut()}>
					LOG OUT
				</button>
			</nav>
			<div className="sectionWrapper">
				{/* <p className="largeText mediumBold alignCenter">
					Welcome, {currentUser.firstName} !
				</p> */}

				{/* {navSections.map((section, i) => {
					if (section.id === displayedSection.id) {
						return <React.Fragment key={i}>{section.component}</React.Fragment>;
					}
					return null;
				})} */}

				{displayedSection.component}
			</div>
			<div
				className={"dropdownOverlay" + (showDropdown ? " visible" : "")}
				onClick={() => setShowDropdown(false)}
			/>
		</div>
	);
};

export default Account;
