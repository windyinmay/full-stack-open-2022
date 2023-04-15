/* eslint-disable @typescript-eslint/no-unsafe-member-access */
// const express = require('express');
//If import does not work, try a combined method: import ... = require('...')
import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { exerciseCalculator } from './exerciseCalculator';

const app = express();
//need to send info for new exercise in the reques body in json format
//help of express json-parser below
app.use(express.json());

app.get('/hello', (_req, res) => {
	res.send('Hello Full Stack!');
});

app.get('/bmi', (_req, res) => {
	const { height, weight } = _req.query;

	if (
		!Number(height) ||
		!Number(weight) ||
		isNaN(Number(height)) ||
		isNaN(Number(weight))
	) {
		res.status(400).json({ error: 'malformatted parameters' });
	}

	res.json({
		weight,
		height,
		bmi: calculateBmi(Number(height), Number(weight)),
	});
});
app.post('/exercises', (_req, res) => {
	// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
	const { dailyHours, target } = _req.body;

	if (!dailyHours || dailyHours.length === 0 || !target) {
		res.status(400).json({ error: 'parameters missing' });
	}
	//Parameter 'hourPerDay' implicitly has an 'any' type.
	if (
		// eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-explicit-any
		dailyHours.some((hourPerDay: any) => isNaN(Number(hourPerDay))) ||
		isNaN(Number(target))
	) {
		res.status(400).json({ error: 'malformatted parameters' });
	}

	// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
	const result = exerciseCalculator(dailyHours, target);
	res.status(200).json({ result });
});

const PORT = 3002;

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
