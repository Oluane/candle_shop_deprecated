import React, { createContext, useEffect, useState } from "react";

export const viewportContext = createContext({});

export const ViewportProvider = ({ children }) => {
	const [width, setWidth] = useState(window.innerWidth);
	const [height, setHeight] = useState(window.innerHeight);

	useEffect(() => {
		const handleWindowResize = () => {
			setWidth(window.innerWidth);
			setHeight(window.innerHeight);
		};

		window.addEventListener("resize", handleWindowResize);

		return () => window.removeEventListener("resize", handleWindowResize);
	}, []);
	return (
		<viewportContext.Provider value={{ width, height }}>{children}</viewportContext.Provider>
	);
};
