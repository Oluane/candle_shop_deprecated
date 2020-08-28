import "./App.scss";
import "../../style/primary.scss";

import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import React from "react";
import Router from "../../Components/Router/Router";
import ScrollToTop from "../../services/ScrollToTop";
import store from "../../redux/store";

function App() {
	return (
		<div className="App">
			<Provider store={store}>
				<BrowserRouter>
					<ScrollToTop />
					<Router></Router>
				</BrowserRouter>
			</Provider>
		</div>
	);
}

export default App;
