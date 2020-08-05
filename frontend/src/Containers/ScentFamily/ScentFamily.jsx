import React, { useEffect, useState } from "react";
import IconSvg from "../../Components/IconSvg/IconSvg";
import "./ScentFamily.scss";
import axios from "axios";
import { useParams } from "react-router-dom";

const ScentFamily = (props) => {
	const [currentFamily, setCurrentFamily] = useState(null);
	const [scents, setScents] = useState(null);
	const { catId } = useParams();

	useEffect(() => {
		axios
			.get("/api/scents_families/" + catId)
			.then(({ data }) => {
				setCurrentFamily(data);
				return axios.get("/api/scents_families/" + catId + "/scents").then(({ data }) => {
					setScents(data);
					setSelectedScent(data[0]);
				});
			})
			.catch((err) => console.log(err));
	}, [catId]);

	const [scrollIndex, setScrollIndex] = useState(0);
	const [isScrollMax, setIsScrollMax] = useState(false);

	useEffect(() => {
		if (scents !== null && scents.length <= getRatio()) {
			setIsScrollMax(true);
		}
	}, [scents]);

	const getRatio = () => {
		const elementW = 300 + 41;
		const ratio = (window.innerWidth * 75) / 100 / elementW;
		return ratio;
	};

	const scrollToNextElements = (direction) => {
		let index = scrollIndex,
			ratio = getRatio();

		const elementW = 300 + 41;

		if (direction === "right") index += 1;
		else if (direction === "left") index -= 1;
		setScrollIndex(index);

		document.getElementById("scrollContainer").scrollTo({
			top: 0,
			left: elementW * Math.floor(ratio) * index,
			behavior: "smooth",
		});

		if (index * ratio + ratio >= scents.length + 1) {
			setIsScrollMax(true);
		} else {
			setIsScrollMax(false);
		}
	};

	const [selectedScent, setSelectedScent] = useState(null);

	return (
		<div className="scentCategoryContainer">
			{currentFamily !== null && scents !== null && selectedScent !== null && (
				<>
					<header
						className="categoryHeader"
						style={{
							backgroundImage: `url("/images/scents_categories/banner_${currentFamily[0].id}.jpg")`,
						}}
					>
						<div className="categoryTitle">
							<h1>{currentFamily[0].en_name} scents</h1>
							<p className="titleDesc usualText">{currentFamily[0].en_desc}</p>
						</div>
					</header>

					<section className="scentWrapper">
						<div id="scrollContainer">
							{scents !== null &&
								scents.map((scent, i) => {
									return (
										<React.Fragment key={i}>
											<div
												className={
													"scentItem " +
													(selectedScent.id === scent.id ? "active" : "")
												}
												onClick={() => setSelectedScent(scent)}
											>
												<img
													src={`/images/scents/thumbnail_${scent.id}.jpg`}
													alt={`${scent.en_name} perfume`}
													className="scentThumbnail"
												/>
												<h4>{scent.en_name}</h4>
											</div>
											{i < scents.length - 1 && (
												<div className="separation"></div>
											)}
										</React.Fragment>
									);
								})}
						</div>
						{scrollIndex > 0 && (
							<div
								className="leftArrowContainer"
								onClick={() => scrollToNextElements("left")}
							>
								<div className="directionArrow">
									<IconSvg iconName="leftArrow" />
								</div>
							</div>
						)}
						{!isScrollMax && (
							<div
								className="rightArrowContainer"
								onClick={() => scrollToNextElements("right")}
							>
								<div className="directionArrow">
									<IconSvg iconName="rightArrow" />
								</div>
							</div>
						)}
					</section>
					<section className="scentInfoWrapper">
						{selectedScent.id}

						<h3>{selectedScent.en_name}</h3>
						<p>{selectedScent.en_desc}</p>
					</section>
				</>
			)}
		</div>
	);
};

export default ScentFamily;
