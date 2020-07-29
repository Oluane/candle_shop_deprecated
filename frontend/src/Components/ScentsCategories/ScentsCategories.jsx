import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ScentsCategories.scss";
import { Link } from "react-router-dom";

const ScentsCategories = () => {
	const [scentsCategories, setScentsCategories] = useState([]);

	useEffect(() => {
		axios
			.get("/api/scents/categories")
			.then(({ data }) => {
				setScentsCategories(data);
			})
			.catch((err) => console.log(err));
	}, []);

	return (
		<section className="scentsSection">
			<h3 className="sectionTitle">OUR SCENTS UNIVERSES</h3>
			<p className="usualText alignCenter">
				Discover our differents scents universes and find the one that fits you{" "}
			</p>
			<div className="categoriesItemsWrapper">
				{scentsCategories.length > 0 &&
					scentsCategories.map((cat, key) => {
						return (
							<Link
								to={`/scent_category/${cat.id}`}
								className="scentsItems"
								style={{ backgroundImage: `url("/images${cat.image_path}")` }}
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

export default ScentsCategories;
