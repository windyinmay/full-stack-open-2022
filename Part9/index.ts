// const express = require('express');
//If import does not work, try a combined method: import ... = require('...')
import express from 'express';
import { calculateBmi } from './bmiCalculator';
const app = express();

app.get('/hello', (_req, res) => {
	res.send('Hello Full Stack!');
});

app.get('/bmi', (_req, res) => {
	const { height, weight } = _req.query;

	if (!Number(height) || !Number(weight)) {
		res.status(400).json({ error: 'malformatted parameters' });
	}

	res.json({
		weight,
		height,
		bmi: calculateBmi(Number(height), Number(weight)),
	});
});

const PORT = 3003;

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
