import "./CheckoutInfos.scss";

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import IconSvg from "../../IconSvg/IconSvg";
import Input from "../../Input/Input";
import ShoppingCartItem from "../../ShoppingCart/ShoppingCartItem/ShoppingCartItem";

const CheckoutInfos = () => {
	const currentUser = useSelector((state) => state.user.data);
	const cart = useSelector((state) => state.cart);

	const [firstName, setFirstName] = useState(currentUser.firstName);
	const [lastName, setLastName] = useState(currentUser.lastName);
	const [newsletterIn, setNewsletterIn] = useState(currentUser.newsletterChecked);
	const [address, setAddress] = useState(currentUser.address);
	const [addressComplement, setAddressComplement] = useState(currentUser.addressComplement);
	const [city, setCity] = useState(currentUser.city);
	const [zipCode, setZipCode] = useState(currentUser.zipCode);
	const [phoneNumber, setPhoneNumber] = useState(currentUser.phoneNumber);

	return (
		<section className="checkoutInfosWrapper">
			<div className="customerInfos">
				<div className="contactInfos usualText">
					<h4 className="">Contact infos</h4>
					<p>
						{currentUser.firstName} {currentUser.lastName} ({currentUser.mailAddress})
					</p>
					<div className="inputLabel checkboxInput">
						<input
							type="checkbox"
							name="newsletterIn"
							onChange={() => setNewsletterIn(!newsletterIn)}
							className="customCheckbox "
							checked={newsletterIn}
						/>
						<span className="checkIcon">
							<IconSvg iconName="checkArrow" />
						</span>
						<span className="smallText checkboxText">
							I subscribe to the super Candle Shop newsletter !
						</span>
					</div>
				</div>
				<div className="billingAddressWrapper">
					<h4>Billing Address</h4>{" "}
					<form className="formContainer">
						<div className="midWidthInputWrapper">
							<Input
								type="text"
								name="firstname"
								value={firstName}
								onChange={setFirstName}
								isMidWidth={true}
								placeHolder="First name"
							/>
							<Input
								type="text"
								name="lastname"
								value={lastName}
								onChange={setLastName}
								isMidWidth={true}
								placeHolder="Last name"
							/>
						</div>
						<Input
							type="text"
							name="address"
							value={address}
							onChange={setAddress}
							isMidWidth={false}
							placeHolder="Address"
						/>
						<div className="midWidthInputWrapper">
							<Input
								type="text"
								name="addressComplement"
								value={addressComplement}
								onChange={setAddressComplement}
								isMidWidth={true}
								placeHolder="Additional address"
							/>
							<Input
								type="text"
								name="zipCode"
								value={zipCode}
								onChange={setZipCode}
								isMidWidth={true}
								placeHolder="ZIP Code"
							/>
						</div>
						<div className="midWidthInputWrapper">
							<Input
								type="text"
								name="city"
								value={city}
								onChange={setCity}
								isMidWidth={true}
								placeHolder="City"
							/>
							<Input
								type="text"
								name="phoneNumber"
								value={phoneNumber}
								onChange={setPhoneNumber}
								isMidWidth={true}
								placeHolder="Phone number"
							/>
						</div>
					</form>
				</div>
			</div>
			<div className="cartSum">
				<h4>Cart summary</h4>

				{cart.products.map((candle, i) => {
					return <ShoppingCartItem product={candle} isCheckout={true} />;
				})}
			</div>
		</section>
	);
};

export default CheckoutInfos;
