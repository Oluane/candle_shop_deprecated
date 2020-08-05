import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import "./MyProfile.scss";
import IconSvg from "../../Components/IconSvg/IconSvg";
import userActions from "../../redux/actions/userActions";
import Input from "../Input/Input";
import apiInstance from "../../services/api";

const MyProfile = () => {
	const currentUser = useSelector((state) => state.user.data);
	const dispatch = useDispatch();

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
			})
			.catch((err) => console.log(err));
	};

	return (
		<div className="myProfile alignCenter">
			<h2 className="sectionTitle">MY PROFILE</h2>

			{/* <div className="profileSummary">
				<div className="leftProfile">
					<p>
						<span>Name</span>
						{currentUser.firstName} {currentUser.lastName}
					</p>
                    <p>
						<span>Idend</span>
						{currentUser.firstName} {currentUser.lastName}
					</p>
					<p>Member since {}</p>
				</div>
				<div className="rightProfile"></div>
			</div> */}

			<form className="formContainer" onSubmit={(e) => editCustomer(e)}>
				<h4>EDIT MY INFOS</h4>
				<Input
					type="email"
					name="email"
					initValue={mailAddress}
					onChange={setMailAddress}
					isMidWidth={false}
					placeHolder="Email"
				/>
				<div className="midWidthInputWrapper">
					<Input
						type="text"
						name="firstname"
						initValue={firstName}
						onChange={setFirstName}
						isMidWidth={true}
						placeHolder="First name"
					/>
					<Input
						type="text"
						name="lastname"
						initValue={lastName}
						onChange={setLastName}
						isMidWidth={true}
						placeHolder="Last name"
					/>
				</div>

				<Input
					type="date"
					name="birthdate"
					initValue={birthdate}
					onChange={setBirthdate}
					isMidWidth={false}
					placeHolder="Birthdate"
				/>

				<Input
					type="text"
					name="address"
					initValue={address}
					onChange={setAddress}
					isMidWidth={false}
					placeHolder="Address"
				/>

				<div className="midWidthInputWrapper">
					<Input
						type="text"
						name="addressComplement"
						initValue={addressComplement}
						onChange={setAddressComplement}
						isMidWidth={true}
						placeHolder="Additional address"
					/>
					<Input
						type="text"
						name="zipCode"
						initValue={zipCode}
						onChange={setZipCode}
						isMidWidth={true}
						placeHolder="ZIP Code"
					/>
				</div>
				<div className="midWidthInputWrapper">
					<Input
						type="text"
						name="city"
						initValue={city}
						onChange={setCity}
						isMidWidth={true}
						placeHolder="City"
					/>
					<Input
						type="text"
						name="phoneNumber"
						initValue={phoneNumber}
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
