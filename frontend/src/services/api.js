import axios from "axios";

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
	return req;
});

export default apiInstance;
