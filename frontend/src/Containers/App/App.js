import React from "react";
import "./App.scss";
import { BrowserRouter } from "react-router-dom";
import Router from "../../Components/Router/Router";

function App() {
	return (
		<div className="App">
			<BrowserRouter>
				<Router></Router>
			</BrowserRouter>
		</div>
	);
}

export default App;
