import { Button, Container, Grid, TextField } from "@mui/material";
import React, { useState } from "react";

function InputComponent({ onCityChange }) {
	const [city, setCity] = useState("");

	const handleSubmit = (e) => {
		e.preventDefault();
		onCityChange(city);
	};

	return (
    <Container maxWidth="sm" className="my-3">
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12}>
          <TextField
            label="Enter city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            variant="outlined"
            fullWidth
            className="mb-3"
          />
        </Grid>
        <Grid item xs={12}>
          <Button type="submit" variant="contained" size="large" fullWidth>
            Get Weather
          </Button>
        </Grid>
      </Grid>
    </form>
  </Container>
	);
}

export default InputComponent;
