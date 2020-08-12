import React from "react";
import { Link } from "react-router-dom";
import BannerHeader from "../../Components/BannerHeader/BannerHeader";
import ScentsFamilies from "../../Components/ScentsFamilies/ScentsFamilies";
import EngagementSection from "../../Components/EngagementSection/EngagementSection";

const Home = (props) => {
	return (
		<>
			{" "}
			<BannerHeader />
			<EngagementSection />
			<ScentsFamilies />
		</>
	);
};

export default Home;
