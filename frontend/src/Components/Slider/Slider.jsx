import React, { useState } from "react";
import "./Slider.scss";
import { useEffect } from "react";

const Slider = ({ sliderItems }) => {
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
						<div
							key={i}
							className={"imgThumbnails" + (active === i ? " active" : "")}
							onClick={() => setActive(i)}
						>
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
