import "./MyAddresses.scss";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import AddressForm from "../AddressForm/AddressForm";

const MyAddresses = () => {
	const userAddresses = useSelector((state) => state.addresses);
	const dispatch = useDispatch();

	const [showEditingAddressId, setShowEditingAddressId] = useState(null);
	const [favAddressIdx, setFavAddressIdx] = useState(null);

	useEffect(() => {
		if (userAddresses[0] !== -1) {
			const favIdx = userAddresses.findIndex((address) => address.isFavorite === 1);

			if (favIdx !== -1) {
				setFavAddressIdx(favIdx);
			}
		}
	}, [userAddresses]);

	const deleteAddress = (addressId) => {};

	return (
		<div className="myAddresses">
			<h2 className="sectionTitle">MY ADDRESSES</h2>
			<div className="mainWrapper">
				{favAddressIdx !== null && (
					<div className="addressWrapper">
						<h4 className="mediumBold">
							My main address{" "}
							<span>
								{userAddresses[favAddressIdx].name &&
									userAddresses[favAddressIdx].name}
							</span>
						</h4>
						<div className="mainAddressDisplay usualText">
							<p>{userAddresses[favAddressIdx].address}</p>
							<p>
								{userAddresses[favAddressIdx].addressComplement &&
									userAddresses[favAddressIdx].addressComplement}
							</p>
							<p>
								{userAddresses[favAddressIdx].zipCode}{" "}
								{userAddresses[favAddressIdx].city}
							</p>
						</div>
						<div className="addressesActions">
							<button
								onClick={() => {
									setShowEditingAddressId(userAddresses[favAddressIdx].id);
								}}
							>
								Edit
							</button>
							<button>Delete</button>
						</div>
						{showEditingAddressId === userAddresses[favAddressIdx].id && (
							<div className="editingForm">
								<h4 className="alignCenter">EDIT MY ADDRESS</h4>
								<AddressForm addressObj={userAddresses[favAddressIdx]} />
							</div>
						)}
					</div>
				)}

				{userAddresses.map((address, i) => {
					if (i !== favAddressIdx) {
						return (
							<div className="addressWrapper">
								<h4 className="mediumBold">
									Other address
									<span>{address.name && address.name}</span>
								</h4>
								<div className="mainAddressDisplay usualText">
									<p>{address.address}</p>
									<p>{address.addressComplement && address.addressComplement}</p>
									<p>
										{address.zipCode} {address.city}
									</p>
								</div>
								<div className="addressesActions">
									<button
										onClick={() => {
											setShowEditingAddressId(address.id);
										}}
									>
										Edit
									</button>
									<button>Delete</button>
								</div>
								{showEditingAddressId === address.id && (
									<div className="editingForm">
										<h4 className="alignCenter">EDIT MY ADDRESS</h4>
										<AddressForm addressObj={address} />
									</div>
								)}
							</div>
						);
					}
				})}
			</div>
		</div>
	);
};

export default MyAddresses;
