import BannerHeader from "../../Components/BannerHeader/BannerHeader";
import EngagementSection from "../../Components/EngagementSection/EngagementSection";
import { Link } from "react-router-dom";
import React from "react";
import ScentsFamilies from "../../Components/ScentsFamilies/ScentsFamilies";

const Home = (props) => {
	return (
		<>
			<BannerHeader />
			<EngagementSection />
			<ScentsFamilies />
		</>
	);
};

export default Home;
