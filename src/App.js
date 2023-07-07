import React, { useState } from "react";
import InputComponent from "./components/InputComponent";
import WeatherComponent from "./components/WeatherComponent";
import ForecastComponent from "./components/ForecastComponent";
import { Container } from "@mui/material";
import "./App.css";

function App() {
	const [city, setCity] = useState("");

	const handleCityChange = (city) => {
		setCity(city);
	};

	return (
		<Container maxWidth="sm" className="mt-5">
			<div className="d-flex align-items-center mb-3">
				<h1>Rise And Shine</h1>
        <div className="spacer" />
				<InputComponent onCityChange={handleCityChange} />
				{city && (
					<>
						<WeatherComponent city={city} />
            <div className="spacer" />
						<ForecastComponent city={city} />
					</>
				)}
			</div>
		</Container>
	);
}

export default App;
