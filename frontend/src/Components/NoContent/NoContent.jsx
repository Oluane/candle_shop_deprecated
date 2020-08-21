import React from "react";
import { Link } from "react-router-dom";
import "./NoContent.scss";
import IconSvg from "../../Components/IconSvg/IconSvg";

const NoContent = ({ iconName, text, linkText, linkPath }) => {
	return (
		<div className="noContentContainer">
			<div className="noContentIcon">
				<IconSvg iconName={iconName} />{" "}
			</div>
			<p className="usualText">{text} </p>

			<Link className="buttonLink mediumText mediumBold " to={linkPath}>
				{linkText}
			</Link>
		</div>
	);
};

export default NoContent;
