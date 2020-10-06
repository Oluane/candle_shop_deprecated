import "./AddressForm.scss";

import React, { useState } from "react";

import IconSvg from "../IconSvg/IconSvg";
import Input from "../Input/Input";

const AddressForm = ({ addressObj }) => {
	const [address, setAddress] = useState(addressObj.address);
	const [addressComplement, setAddressComplement] = useState(addressObj.addressComplement);
	const [city, setCity] = useState(addressObj.city);
	const [zipCode, setZipCode] = useState(addressObj.zipCode);
	const [name, setName] = useState(addressObj.name);
	const [isFavorite, setIsFavorite] = useState(addressObj.isFavorite);

	const editAddress = (e) => {
		e.preventDefault();
	};

	return (
		<>
			{addressObj !== undefined && (
				<form className="addressFormContainer" onSubmit={(e) => editAddress(e)}>
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

					<Input
						type="text"
						name="city"
						value={city}
						onChange={setCity}
						isMidWidth={false}
						placeHolder="City"
					/>

					<Input
						type="text"
						name="name"
						value={name}
						onChange={setName}
						isMidWidth={false}
						placeHolder="Addresse Name (optional)"
					/>

					<div className="inputLabel checkboxInput">
						<input
							type="checkbox"
							name="isFavAddress"
							checked={isFavorite && true}
							onChange={() => setIsFavorite(!isFavorite)}
							className="customCheckbox"
						/>
						<span className="checkIcon">
							<IconSvg iconName="checkArrow" />
						</span>
						<span className="smallText checkboxText">This is my main address</span>
					</div>

					<button type="submit" className="mediumText mediumBold">
						SAVE MY ADDRESS
					</button>
				</form>
			)}
		</>
	);
};

export default AddressForm;
