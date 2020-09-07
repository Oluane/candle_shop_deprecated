import "./Toasts.scss";

import React, { useContext } from "react";

import IconSvg from "../IconSvg/IconSvg";
import { ToastContext } from "./ToastProvider";

const Toasts = () => {
	const [toasts, dispatch] = useContext(ToastContext);

	return (
		<div className="toastsContainer">
			{toasts.map((toast, i) => (
				<div
					key={"toast" + i}
					id={toast.id}
					className={"toastBody mediumText fadeIn" + toast.classes}
				>
					<p>{toast.content}</p>

					<div
						className="closeIcon"
						onClick={() =>
							dispatch({ type: "REMOVE_TOAST", payload: { id: toast.id } })
						}
					>
						<IconSvg iconName="closeCross" />
					</div>
				</div>
			))}
		</div>
	);
};

export default Toasts;
