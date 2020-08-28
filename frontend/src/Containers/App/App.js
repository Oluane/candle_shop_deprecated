import "./App.scss";
import "../../style/primary.scss";

import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import React from "react";
import Router from "../../Components/Router/Router";
import ScrollToTop from "../../services/ScrollToTop";
import { ViewportProvider } from "../../Components/ViewportProvider/ViewportProvider";
import store from "../../redux/store";

function App() {
	return (
		<ViewportProvider>
			<div className="App">
				<Provider store={store}>
					<BrowserRouter>
						<ScrollToTop />
						<Router></Router>
					</BrowserRouter>
				</Provider>
			</div>
		</ViewportProvider>
	);
}

export default App;
