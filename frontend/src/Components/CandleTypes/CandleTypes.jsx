import React, { useEffect, useState } from "react";
import IconSvg from "../IconSvg/IconSvg";
import "./CandleTypes.scss";

import Slider from "../Slider/Slider";

const CandleTypes = ({ types, setSelectedType }) => {
	// useEffect(() => {
	// 	if (selectedType !== 0) {
	// 		apiInstance
	// 			.get(`/candles/types/${selectedType}/details`)
	// 			.then(({ data }) => {
	// 				setSelectedTypeSize(data);
	// 				document.querySelector(".typeDisplay").scrollIntoView();
	// 			})
	// 			.catch((err) => console.log(err));
	// 	}
	// }, [selectedType]);

	// const [selectedSize, setSelectedSize] = useState(null);

	return (
		<div className="typesWrapper">
			<h4 className="alignCenter title">Choose a candle type</h4>
			<div className="typesContainer">
				{types.map((type, i) => {
					return (
						<div
							className={
								"typeCard" /*+ (selectedType === type.id ? " selected" : "")*/
							}
							key={i}
							onClick={() => {
								setSelectedType(type.id);
							}}
						>
							<div className="borderContainer">
								<div className="typeSvg">
									<IconSvg iconName={"candleType" + type.id} />
								</div>
								<p className="alignCenter usualText">{type.enName}</p>
							</div>
						</div>
					);
				})}
			</div>
			{/* {selectedType !== 0 && selectedTypeSize !== null && (
				<div className="typeDisplay">
					<div className="borderContainer">
						<div className="typePresentation">
							<h4 className="alignCenter">
								About {selectedTypeSize[0].typeEnName} Candles
							</h4>
							<p className="alignCenter">{selectedTypeSize[0].typeEnDesc}</p>
						</div>

						<div className="quickShop">
							<div className="sliderWrapper">
								<Slider sliderItems={constructSliderImgPathArray(selectedType)} />
							</div>

							<div className="productSpecs">
								<h6 className="usualText alignCenter">Specifications</h6>
								<div className="sizeDisplay alignCenter">
									{selectedTypeSize.map((size, i) => {
										return (
											<p
												className={
													"mediumText" +
													(selectedSize === size.sizeId ? " active" : "")
												}
												id={size.sizeId}
												key={i}
												onClick={() => setSelectedSize(size.sizeId)}
											>
												{size.sizeEnName}
											</p>
										);
									})}
								</div>

								{selectedTypeSize.map((size, i) => {
									return (
										selectedSize === size.sizeId && (
											<div className="specDetailsArr mediumText">
												<div className="specDetailsArrRows">
													<p className="columns">Burning time</p>
													<p className="columns">
														{size.durationInHours} hours
													</p>
												</div>
												<div className="specDetailsArrRows">
													<p className="columns">Weight</p>
													<p className="columns">
														{size.weightInGr} grams
													</p>
												</div>
												<div className="specDetailsArrRows">
													<p className="columns">Width</p>
													<p className="columns">{size.widthInCm} cm</p>
												</div>
												<div className="specDetailsArrRows">
													<p className="columns">Height</p>
													<p className="columns">{size.heightInCm} cm</p>
												</div>
												<div className="specDetailsArrRows">
													<p className="columns">Scent</p>
													<p className="columns">{scent.enName}</p>
												</div>
											</div>
										)
									);
								})}
							</div>
						</div>
					</div>
				</div>
			)} */}
		</div>
	);
};

export default CandleTypes;
