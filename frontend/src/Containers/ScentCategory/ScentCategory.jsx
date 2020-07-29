import React, { useEffect, useState } from "react";
import IconSvg from "../../Components/IconSvg/IconSvg";
import "./ScentCategory.scss";
import axios from "axios";

const ScentCategory = (props) => {
	const [currentCategory, setCurrentCategory] = useState(null);

	useEffect(() => {
		const catId = props.match.params.catId;
		console.log(currentCategory);
		axios
			.get("/api/scents/category/" + catId)
			.then(({ data }) => {
				setCurrentCategory(data);
			})
			.catch((err) => console.log(err));
	}, []);

	const [scrollIndex, setScrollIndex] = useState(0);

	const scrollToNextElements = (direction) => {
		let elementW = 150 + 0,
			index = scrollIndex,
			ratio = 5;

		if (direction === "right") index++;
		else if (direction === "left") index--;
		setScrollIndex(index);
		console.log(elementW * index * ratio);
		document
			.getElementById("scrollContainer")
			.scrollTo({ top: 0, left: elementW * index * ratio, behavior: "smooth" });
	};

	return (
		<div className="scentCategoryContainer">
			{/* <img className="bgImg" src="/images/scents_categories/banner_wood_3_lr.jpg" /> */}
			{currentCategory !== null && (
				<>
					<header
						className="categoryHeader"
						style={{
							backgroundImage: `url("/images/scents_categories/banner_${currentCategory[0].id}.jpg")`,
						}}
					>
						<div className="categoryTitle">
							<h1>{currentCategory[0].en_name} scents</h1>
							<p className="titleDesc usualText">{currentCategory[0].en_desc}</p>
						</div>
					</header>

					<section className="scentWrapper">
						<div id="scrollContainer">
							<div className="scentItem">1</div>
							<div className="separation"></div>
							<div className="scentItem">2</div>
							<div className="separation"></div>
							<div className="scentItem">3</div>
							<div className="separation"></div>
							<div className="scentItem">4</div>
							<div className="separation"></div>
							<div className="scentItem">5</div>
							<div className="separation"></div>
							<div className="scentItem">6</div>
							<div className="separation"></div>
							<div className="scentItem">7</div>
							<div className="separation"></div>
							<div className="scentItem">7</div>
							<div className="separation"></div>
							<div className="scentItem">7</div>
							<div className="separation"></div>
							<div className="scentItem">7</div>
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

						<div
							className="rightArrowContainer"
							onClick={() => scrollToNextElements("right")}
						>
							<div className="directionArrow">
								<IconSvg iconName="rightArrow" />
							</div>
						</div>
					</section>
				</>
			)}
		</div>
	);
};

export default ScentCategory;
