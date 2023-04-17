import { v4 as uuidv4 } from 'uuid';
import patients from '../../data/patientsEntries';

import {
	// Gender,
	NonSensitivePatientEntry,
	PatientEntry,
	NewPatientEntry,
} from '../types';

// const patients: PatientEntry[] = patientsEntries as PatientEntry[];
// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const getPatients = (): PatientEntry[] => {
	return patients;
};

const getNonSensitivePatients = (): NonSensitivePatientEntry[] => {
	return patients.map(
		({ id, name, dateOfBirth, gender, occupation, entries }) => ({
			id,
			name,
			dateOfBirth,
			gender,
			occupation,
			entries,
		})
	);
};

const findById = (id: string): PatientEntry | undefined => {
	const entry = patients.find((p) => p.id === id);
	return entry;
};
const addPatient = (entry: NewPatientEntry): PatientEntry => {
	const newPatientEntry = {
		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
		id: uuidv4(),
		...entry,
	};

	patients.push(newPatientEntry);
	return newPatientEntry;
};

export default {
	getPatients,
	addPatient,
	getNonSensitivePatients,
	findById,
};
