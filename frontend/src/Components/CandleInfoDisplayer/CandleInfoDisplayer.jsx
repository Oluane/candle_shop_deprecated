import "./CandleInfoDisplayer.scss";

import React, { useState } from "react";

const sectionToDisplay = [
	{ id: "candle", title: "The candle" },
	{ id: "scent", title: "The scent" },
	{ id: "technical", title: "Technical Infos" },
];

const CandleInfoDisplayer = ({ typeSize, scent }) => {
	const [displayedSection, setDisplayedSection] = useState("candle");

	return (
		<div className="candleInfoDisplayerWrapper">
			<header className="candleInfoNav">
				{sectionToDisplay.map((section, i) => {
					return (
						<h4
							className={
								"navItem mediumBold" +
								(displayedSection === section.id ? " active" : "")
							}
							id={section.id}
							onClick={() => setDisplayedSection(section.id)}
						>
							{section.title}
						</h4>
					);
				})}
			</header>
			<div className="candleInfoContent">
				{displayedSection === "candle" && (
					<div className="textDesc mediumText">{typeSize.typeEnDesc}</div>
				)}
				{displayedSection === "scent" && (
					<div className="textDesc mediumText">
						{scent !== undefined
							? scent.enDesc
							: "Chose a scent to learn more about it"}
					</div>
				)}
				{displayedSection === "technical" && (
					<div className="technicalTab mediumText">
						<div className="rows">
							<p className="columns">Wax type</p>
							<p className="columns">100% plants wax (soy) </p>
						</div>
						<div className="rows">
							<p className="columns">Wick</p>
							<p className="columns">Lead-free cotton wick</p>
						</div>
						<div className="rows">
							<p className="columns">Burning time</p>
							<p className="columns">+/- {typeSize.durationInHours} hours</p>
						</div>
						<div className="rows">
							<p className="columns">Dimensions</p>
							<p className="columns">
								{typeSize.widthInCm} cm x {typeSize.heightInCm} cm
							</p>
						</div>
						<div className="rows">
							<p className="columns">Weight</p>
							<p className="columns">{typeSize.weightInGr} gr</p>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default CandleInfoDisplayer;
