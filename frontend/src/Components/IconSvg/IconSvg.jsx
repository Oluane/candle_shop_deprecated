import React from "react";
import iconInfos from "../../style/icons/iconsLib";

//const defaultStyles = { display: "inline-block", verticalAlign: "middle" };

const IconSvg = ({ iconName, className }) => {
	return (
		<svg
			className={className}
			viewBox={iconInfos[iconName].viewBox}
			width="100%"
			height="100%"
			xmlns="http://www.w3.org/2000/svg"
			xmlnsXlink="http://www.w3.org/1999/xlink"
		>
			<path fill="currentColor" d={iconInfos[iconName].path} />
		</svg>
	);
};

export default IconSvg;
