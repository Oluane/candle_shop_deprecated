import React, { useState } from "react";
import { useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import "./Candles.scss";
import CandleTypes from "../../Components/CandleTypes/CandleTypes";
import CandleSheet from "../../Components/CandleSheet/CandleSheet";
import apiInstance from "../../services/api";

const Candles = () => {
	const location = useLocation();

	const [types, setTypes] = useState([]);

	useEffect(() => {
		apiInstance
			.get("/candles/types")
			.then(({ data }) => {
				setTypes(data);
			})
			.catch((err) => console.log(err));
	}, []);

	const [isPreSelected, setIsPreSelected] = useState(false);
	const [selectedType, setSelectedType] = useState(null);
	const [selectedScentId, setSelectedScentId] = useState(null);

	useEffect(() => {
		if (location.state !== undefined) {
			const typeId = location.state.preSelectedTypeId;
			const scentId = location.state.preSelectedScentId;
			if (typeId && scentId) {
				setIsPreSelected(true);
				setSelectedType(typeId);
				setSelectedScentId(scentId);
			}
		}
	}, [location.state]);

	return (
		<>
			<header className="candlesHeader">
				<h1 className="sectionTitle">
					<span className="titleSpan">Customize</span> your candles{" "}
				</h1>
				<div className="pageDesc alignCenter usualText">
					Here at Candle Shop, we propose 3 differents types of candles, in several sizes
					to fit all your needs.{" "}
				</div>
			</header>
			{!isPreSelected && !selectedType ? (
				<CandleTypes types={types} setSelectedType={setSelectedType} />
			) : (
				<CandleSheet
					types={types}
					selectedType={selectedType}
					setSelectedType={setSelectedType}
					selectedScentId={selectedScentId}
					setSelectedScentId={setSelectedScentId}
				/>
			)}
		</>
	);
};

export default Candles;
