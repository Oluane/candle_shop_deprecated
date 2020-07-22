import React from "react";
import "./App.scss";
import { Provider } from "react-redux";
import store from "../../redux/store";

function App() {
	return (
		<div className="App">
			<Provider store={store}>hello</Provider>
		</div>
	);
}

export default App;
