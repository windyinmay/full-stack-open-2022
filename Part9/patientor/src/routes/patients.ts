import express from 'express';
import patientService from '../services/patientService';
import toNewPatientEntry from '../utils/toNewPatientEntry';
import toNewEntry, { Fields } from '../utils/toNewEntry';
// import { NewPatientEntry } from '../types';

const router = express.Router();

router.get('/', (_req, res) => {
	res.send(patientService.getNonSensitivePatients());
});

router.get('/:id', (req, res) => {
	const patient = patientService.findById(req.params.id);

	if (patient) {
		res.send(patient);
	} else {
		res.sendStatus(404);
	}
});

router.post('/', (_req, res) => {
	try {
		const NewPatientEntry = toNewPatientEntry(_req.body);

		// const { name, dateOfBirth, gender, ssn, occupation } = _req.body;
		const addedPatient = patientService.addPatient(NewPatientEntry);
		res.json(addedPatient);
	} catch (error: unknown) {
		let errorMessage = 'Something went wrong.';
		if (error instanceof Error) {
			errorMessage += ' Error: ' + error.message;
		}
		res.status(400).send(errorMessage);
	}
});

router.get('/:id/entries', (req, res) => {
	const { id }: { id: string } = req.params;
	const patientEntries = patientService.getEntries(id);
	res.status(200).json(patientEntries);
});

router.post('/:id/entries', (req, res) => {
	const { id }: { id: string } = req.params;
	try {
		const addedEntry = toNewEntry(req.body as Fields);

		const newEntry = patientService.addEntry(id, addedEntry);
		res.status(200).json(newEntry);
	} catch (error: unknown) {
		let errorMessage = 'Something went wrong.';
		if (error instanceof Error) {
			errorMessage += ' Error: ' + error.message;
		}
		res.status(400).send(errorMessage);
	}
});

export default router;
