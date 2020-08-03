import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ScentsFamilies.scss";
import { Link } from "react-router-dom";

const ScentsFamilies = () => {
	const [scentsFamilies, setScentsFamilies] = useState([]);

	useEffect(() => {
		axios
			.get("/api/scents_families")
			.then(({ data }) => {
				setScentsFamilies(data);
			})
			.catch((err) => console.log(err));
	}, []);

	return (
		<section className="scentsSection">
			<h3 className="sectionTitle">OUR SCENTS UNIVERSES</h3>
			<p className="usualText alignCenter">
				Discover our differents scents universes and find the one that fits you best{" "}
			</p>
			<div className="categoriesItemsWrapper">
				{scentsFamilies.length > 0 &&
					scentsFamilies.map((cat, key) => {
						return (
							<Link
								to={`/scents_families/${cat.id}`}
								className="scentsItems"
								style={{
									backgroundImage: `url("/images/scents_categories/normal_${cat.id}.jpg")`,
								}}
								key={key}
							>
								<div className="scentsNameWrapper">
									<h4 className="alignCenter scentsName">
										{cat.en_name.toUpperCase()}
									</h4>
								</div>
							</Link>
						);
					})}
			</div>
		</section>
	);
};

export default ScentsFamilies;
