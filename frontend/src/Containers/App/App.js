import React from "react";
import "./App.scss";
import "../../style/primary.scss";
import { BrowserRouter } from "react-router-dom";
import Router from "../../Components/Router/Router";
import { Provider } from "react-redux";
import store from "../../redux/store";

function App() {
	return (
		<div className="App">
			<Provider store={store}>
				<BrowserRouter>
					<Router></Router>
				</BrowserRouter>
			</Provider>
		</div>
	);
}

export default App;
