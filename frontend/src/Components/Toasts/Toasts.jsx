import "./Toasts.scss";

import React, { useContext, useEffect } from "react";

import IconSvg from "../IconSvg/IconSvg";
import { ToastContext } from "./ToastProvider";

const ToastBody = ({ toast, dispatch }) => {
	useEffect(() => {
		let timeOut = setTimeout(() => {
			dispatch({ type: "REMOVE_TOAST", payload: { id: toast.id } });
		}, 5000);
		return () => {
			clearTimeout(timeOut);
		};
	}, []);
	return (
		<div id={toast.id} className={"toastBody mediumText fadeIn" + toast.classes}>
			<p>{toast.content}</p>

			<div
				className="closeIcon"
				onClick={() => dispatch({ type: "REMOVE_TOAST", payload: { id: toast.id } })}
			>
				<IconSvg iconName="closeCross" />
			</div>
		</div>
	);
};

const Toasts = () => {
	const [toasts, dispatch] = useContext(ToastContext);

	return (
		<div className="toastsContainer">
			{toasts.map((toast, i) => (
				<ToastBody toast={toast} key={"toast" + toast.id} dispatch={dispatch} />
			))}
		</div>
	);
};

export default Toasts;
