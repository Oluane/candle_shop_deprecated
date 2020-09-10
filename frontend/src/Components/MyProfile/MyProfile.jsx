import "./MyProfile.scss";

import React, { useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Input from "../Input/Input";
import { ToastContext } from "../Toasts/ToastProvider";
import apiInstance from "../../services/api/api";
import userActions from "../../redux/actions/userActions";

//import { format } from "date-fns";

const MyProfile = () => {
	const currentUser = useSelector((state) => state.user.data);
	const dispatch = useDispatch();
	const [, dispatchToast] = useContext(ToastContext);

	const [mailAddress, setMailAddress] = useState(currentUser.mailAddress);
	const [firstName, setFirstName] = useState(currentUser.firstName);
	const [lastName, setLastName] = useState(currentUser.lastName);
	const [birthdate, setBirthdate] = useState(currentUser.birthdate);
	const [address, setAddress] = useState(currentUser.address);
	const [addressComplement, setAddressComplement] = useState(currentUser.addressComplement);
	const [city, setCity] = useState(currentUser.city);
	const [zipCode, setZipCode] = useState(currentUser.zipCode);
	const [phoneNumber, setPhoneNumber] = useState(currentUser.phoneNumber);

	const editCustomer = (e) => {
		e.preventDefault();

		const customerData = {
			mailAddress,
			firstName,
			lastName,
			birthdate,
			address,
			addressComplement,
			city,
			zipCode,
			phoneNumber,
		};

		apiInstance
			.put("/user", customerData)
			.then(() => {
				dispatch({ ...userActions.USER_EDIT, payload: customerData });
				dispatchToast({
					type: "ADD_TOAST",
					payload: {
						id: "toast " + Date.now(),
						status: "success",
						text: "Your infos have been edited",
						classes: "success",
					},
				});
			})
			.catch((err) =>
				dispatchToast({
					type: "ADD_TOAST",
					payload: {
						id: "toast " + Date.now(),
						status: "failed",
						text: "Profile infos editing failed, try again later",
						classes: "error",
					},
				})
			);
	};

	// const dateFormat = (str) => {
	// 	const dateArr = str.split("-");
	// 	return format(new Date(dateArr[0], dateArr[1], dateArr[2]), "MMMM do yyyy");
	// };

	return (
		<div className="myProfile alignCenter">
			<h2 className="sectionTitle">MY PROFILE</h2>

			{/* <div className="profileSummary usualText">
				<div className="leftProfile">
					<span>Name</span>
					<p>
						{currentUser.firstName} {currentUser.lastName}
					</p>

					<p>Member since {dateFormat(currentUser.signUpDate)}</p>
				</div>
				<div className="rightProfile">
					<span>Last order : </span>
					<p>no order yet !</p>
				</div>
			</div> */}

			<form className="formContainer" onSubmit={(e) => editCustomer(e)}>
				<h4>EDIT MY INFOS</h4>
				<Input
					type="email"
					name="email"
					value={mailAddress}
					onChange={setMailAddress}
					isMidWidth={false}
					placeHolder="Email"
				/>
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
					type="date"
					name="birthdate"
					value={birthdate}
					onChange={setBirthdate}
					isMidWidth={false}
					placeHolder="Birthdate"
				/>

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
				<button type="submit" value="Register" className="submitButton">
					<span className="mediumText bold">Edit</span>
				</button>
			</form>
		</div>
	);
};

export default MyProfile;
