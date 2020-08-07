import React, { useEffect, useState } from "react";
import IconSvg from "../IconSvg/IconSvg";
import "./CandleTypes.scss";
import apiInstance from "../../services/api";

const CandleTypes = ({ scent }) => {
	const [types, setTypes] = useState([]);
	const [selectedType, setSelectedType] = useState(0);

	useEffect(() => {
		apiInstance
			.get("/candles/types")
			.then(({ data }) => {
				setTypes(data);
			})
			.catch((err) => console.log(err));
	}, []);

	const [selectedTypeSize, setSelectedTypeSize] = useState(null);

	useEffect(() => {
		if (selectedType !== 0) {
			apiInstance
				.get(`/candles/types/${selectedType}/details`)
				.then(({ data }) => {
					setSelectedTypeSize(data);
					//const divHeight = document.querySelector(".typeDisplay").scrollHeight;
					// document.scrollingElement.scrollTop =
					// 	document.scrollingElement.scrollTop + (divHeight + 50);
					document.querySelector(".typeDisplay").scrollIntoView();
				})
				.catch((err) => console.log(err));
		}
	}, [selectedType]);

	return (
		<div className="typesWrapper">
			<h4 className="alignCenter title">Choose your candle type</h4>
			<div className="typesContainer">
				{types.map((type, i) => {
					return (
						<div
							className={"typeCard" + (selectedType === type.id ? " selected" : "")}
							key={i}
							onClick={() => {
								setSelectedType(selectedType === type.id ? 0 : type.id);
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
			{selectedType !== 0 && selectedTypeSize !== null && (
				<div className="typeDisplay">
					<div className="borderContainer">
						<h4>{selectedTypeSize[0].typeEnName} Candles</h4>
						<p>{selectedTypeSize[0].typeEnDesc}</p>
						<p>scent : {scent.en_name}</p>
					</div>
				</div>
			)}
		</div>
	);
};

export default CandleTypes;
