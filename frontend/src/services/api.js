import axios from "axios";
import { convertCamelToSnake, convertSnakeToCamel } from "../services/utils/stringUtils";

const apiInstance = axios.create({
	baseURL: "/api",
	timeout: 50000,
	proxy: {
		host: "127.0.0.1",
		port: 5000,
	},
});

apiInstance.interceptors.request.use((req) => {
	const token = localStorage.getItem("xsrfToken");
	if (token) {
		req.headers["x-xsrf-token"] = token;
	}

	//intercepting request data to convert its keys to snake case to fits with DB naming convention

	const reqData = req.data;

	if (typeof reqData === "object") {
		let data = {};
		Object.keys(reqData).map((e) => {
			return (data[convertCamelToSnake(e)] = reqData[e]);
		});
		req.data = data;
	}
	return req;
});

apiInstance.interceptors.response.use((res) => {
	//intercepting response data to convert its keys to camel case to fits with JS front naming convention

	if (res.data.length !== undefined) {
		const resData = res.data;

		resData.map((item, i) => {
			if (typeof item === "object") {
				let data = {};
				Object.keys(item).map((e) => {
					return (data[convertSnakeToCamel(e)] = item[e]);
				});
				res.data[i] = data;
			}
		});
	}

	return res;
});

export default apiInstance;
