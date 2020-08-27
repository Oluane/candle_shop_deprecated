import "./CandleSheet.scss";

import React, { useEffect, useState } from "react";

import AddToWishlistBtn from "../AddToWishlistBtn/AddToWishlistBtn";
import CandleInfoDisplayer from "../CandleInfoDisplayer/CandleInfoDisplayer";
import IconSvg from "../IconSvg/IconSvg";
import Slider from "../Slider/Slider";
import apiInstance from "../../services/api";
import { useSelector } from "react-redux";

const CandleSheet = ({
	types,
	selectedType,
	setSelectedType,
	selectedScentId,
	setSelectedScentId,
}) => {
	const currentUser = useSelector((state) => state.user.data);

	/* fetch type & size relative to the type id props */
	const [typeSizes, setTypeSizes] = useState(null);

	useEffect(() => {
		apiInstance
			.get(`/candles/types/${selectedType}/details`)
			.then(({ data }) => {
				setTypeSizes(data);
			})
			.catch((err) => console.log(err));
	}, [selectedType]);

	/* Setting the size to display to the first item when type&size changes */

	const [selectedTypeSize, setSelectedTypeSize] = useState(null);

	useEffect(() => {
		if (typeSizes !== null) {
			setSelectedTypeSize(typeSizes[0]);
		}
	}, [typeSizes]);

	/* fetching all available scents from db */

	const [scents, setScents] = useState(null);

	useEffect(() => {
		apiInstance
			.get(`/scents`)
			.then(({ data }) => {
				setScents(data);
			})
			.catch((err) => console.log(err));
	}, []);

	/* retrieving the selected scent obj in all scents, with a scent id from props */

	const [selectedScent, setSelectedScent] = useState();

	useEffect(() => {
		if (scents !== null && selectedScentId !== null) {
			const retrievedScent = scents.filter((scent) => scent.id === selectedScentId);
			setSelectedScent(retrievedScent[0]);
		}
	}, [selectedScentId, scents]);

	//webpack dynamic require to retrieve specific img files

	const requiredSlideImg = require.context(
		"../../../public/images/candle_types",
		false,
		/\.(png|jpe?g|svg)$/
	);

	const [showDropdown, setShowDropdown] = useState(false);

	const addingCandleToWishlist = () => {};

	return (
		<section className="candleSheetWrapper">
			<div className="sliderWrapper">
				<Slider typeId={selectedType} requiredImg={requiredSlideImg} />
			</div>

			{typeSizes && selectedTypeSize && (
				<div className="candleSheetInfoWrapper">
					<h4 className="candleTitle mediumBold">{typeSizes[0].typeEnName} Candle</h4>
					<div className="candleInfoContainer mediumText">
						<p className="mediumBold">{selectedTypeSize.price}€</p>
						<p className="separatorBefore">{selectedTypeSize.weightInGr}gr</p>
						<p className="separatorBefore">{selectedTypeSize.durationInHours}h</p>
						{selectedScentId && selectedScent && (
							<p className="separatorBefore">{selectedScent.enName}</p>
						)}
					</div>
					<div className="candleVariantsWrapper">
						<div className="variantsOptionsContainer usualText">
							<div className="variantsOptions">
								<p className="optionTitle">Type : </p>
								<div className="variantsValues">
									{types.map((type, i) => {
										return (
											<div
												className={
													"typeIcon " +
													(type.id === selectedType ? "active" : null)
												}
												onClick={() => setSelectedType(type.id)}
												key={i}
											>
												<IconSvg iconName={"candleType" + type.id} />
											</div>
										);
									})}
								</div>
								<span className="stepIndex smallText mediumBold">1</span>
							</div>
							<div className="variantsOptions">
								<p className="optionTitle">Size : </p>
								<div className="variantsValues">
									{typeSizes.map((size, i) => {
										return (
											<div
												className={
													"sizeValue mediumBold alignCenter largeText " +
													(size.id === selectedTypeSize.id
														? "active"
														: null)
												}
												onClick={() => setSelectedTypeSize(size)}
												key={i}
											>
												{size.shortName}
											</div>
										);
									})}
								</div>
								<span className="stepIndex smallText mediumBold">2</span>
							</div>
							<div className="variantsOptions">
								<p className="optionTitle">Scent : </p>
								<div
									className="selectorCustom"
									onClick={() => setShowDropdown(true)}
								>
									<span className="selectorCustomValue">
										{selectedScentId !== null && selectedScent
											? selectedScent.enName
											: "Select"}
									</span>
									<div className="selectorArrow">
										<IconSvg iconName="rightArrow" />
									</div>
								</div>
								<div
									className={
										"selectorDropdown " + (showDropdown ? "visible" : "")
									}
								>
									<div className="dropdownScrollContainer">
										{scents !== null &&
											scents.map((scent, i) => {
												return (
													<p
														className="selectorValues"
														onClick={() => {
															setSelectedScentId(scent.id);
															setShowDropdown(false);
														}}
													>
														{scent.enName}
													</p>
												);
											})}
									</div>
								</div>

								<span className="stepIndex smallText mediumBold">3</span>
							</div>
						</div>
					</div>
					<div className="actionsBtnWrapper">
						<button className="addToCart smallText mediumBold">
							{" "}
							<span>ADD TO CART</span>{" "}
							<span className="separatorBefore">{selectedTypeSize.price}€</span>
						</button>
						<AddToWishlistBtn typeSize={selectedTypeSize} scent={selectedScent} />
					</div>
					<CandleInfoDisplayer typeSize={selectedTypeSize} scent={selectedScent} />
				</div>
			)}
			<div
				className={"dropdownOverlay " + (showDropdown ? "visible" : "")}
				onClick={() => setShowDropdown(false)}
			></div>
		</section>
	);
};

export default CandleSheet;
