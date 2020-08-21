import React, { useState } from "react";
import { useEffect } from "react";

import "./CandleSheet.scss";
import apiInstance from "../../services/api";
import Slider from "../Slider/Slider";
import IconSvg from "../IconSvg/IconSvg";

const CandleSheet = ({
	types,
	selectedType,
	setSelectedType,
	selectedScentId,
	setSelectedScentId,
}) => {
	/* fetch type & size relative to the type id props */
	const [selectedTypeSize, setSelectedTypeSize] = useState(null);

	useEffect(() => {
		apiInstance
			.get(`/candles/types/${selectedType}/details`)
			.then(({ data }) => {
				setSelectedTypeSize(data);
			})
			.catch((err) => console.log(err));
	}, [selectedType]);

	/* Setting the size to display to the first item when type&size changes */

	const [selectedSize, setSelectedSize] = useState(null);

	useEffect(() => {
		if (selectedTypeSize !== null) {
			setSelectedSize(selectedTypeSize[0]);
		}
	}, [selectedTypeSize]);

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

	return (
		<section className="candleSheetWrapper">
			<div className="sliderWrapper">
				<Slider typeId={selectedType} requiredImg={requiredSlideImg} />
			</div>

			{selectedTypeSize && selectedSize && (
				<div className="candleSheetInfoWrapper">
					<h4 className="candleTitle mediumBold">
						{selectedTypeSize[0].typeEnName} Candle
					</h4>
					<div className="candleInfoContainer mediumText">
						<p className="mediumBold">{selectedSize.price}€</p>
						<p className="separatorBefore">{selectedSize.weightInGr}gr</p>
						<p className="separatorBefore">{selectedSize.durationInHours}h</p>
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
												{/* <span
													className={
														"activeBorder " +
														(type.id === selectedType ? "active" : null)
													}
												></span> */}
											</div>
										);
									})}
								</div>
								<span className="stepIndex smallText mediumBold">1</span>
							</div>
							<div className="variantsOptions">
								<p className="optionTitle">Size : </p>
								<div className="variantsValues">
									{selectedTypeSize.map((size, i) => {
										return (
											<div
												className={
													"sizeValue mediumBold alignCenter largeText " +
													(size.id === selectedSize.id ? "active" : null)
												}
												onClick={() => setSelectedSize(size)}
												key={i}
											>
												{size.shortName}
												{/* <span
													className={
														"activeBorder " +
														(size.id === selectedSize.id
															? "active"
															: null)
													}
												></span> */}
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
							<span className="separatorBefore">{selectedSize.price}€</span>
						</button>
						<button className="addToWishlist" onClick={() => console.log("toto")}>
							<div className="addToWishlistIcon">
								<IconSvg iconName="heart" />
							</div>
						</button>
					</div>
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
