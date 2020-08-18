import React, { useState } from "react";
import "./Slider.scss";
import { useEffect } from "react";

const Slider = ({ typeId, requiredImg }) => {
	const constructSliderImgPathArray = (typeId, requiredImg) => {
		const reg = new RegExp(`_${typeId}_`, "");
		const importAll = (require) =>
			require
				.keys()
				.filter((key) => {
					return reg.test(key);
				})
				.reduce((acc, next) => {
					acc.push(require(next));
					return acc;
				}, []);

		const images = importAll(requiredImg);

		return images;
	};

	const [sliderItems, setSliderItems] = useState([]);

	useEffect(() => {
		setSliderItems(constructSliderImgPathArray(typeId, requiredImg));
	}, [typeId, requiredImg]);

	const [active, setActive] = useState(null);

	useEffect(() => {
		setActive(0);
	}, [sliderItems]);
	return (
		<div className="slider">
			<div className="sliderContent">
				{sliderItems.map((item, i) => {
					return (
						active === i && (
							<div className="sliderItems">
								<img src={item} alt="" key={i} />
							</div>
						)
					);
				})}
			</div>
			<div className="sliderIndicators">
				{sliderItems.map((item, i) => {
					return (
						<div key={i} className="imgThumbnails" onClick={() => setActive(i)}>
							<img src={item} />
							<span className={"imgBorder" + (active === i ? " active" : "")}></span>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default Slider;
