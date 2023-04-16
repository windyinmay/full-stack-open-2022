import patients from '../../data/patientsEntries';

import { NonSensitivePatientEntry, PatientEntry } from '../types';

// const patients: PatientEntry[] = patientsEntries as PatientEntry[];

const getPatients = (): PatientEntry[] => {
	return patients;
};

const getNonSensitivePatients = (): NonSensitivePatientEntry[] => {
	return patients.map(({ id, name, dateOfBirth, ssn, occupation }) => ({
		id,
		name,
		dateOfBirth,
		ssn,
		occupation,
	}));
};
const addPatient = () => {
	return null;
};

export default {
	getPatients,
	addPatient,
	getNonSensitivePatients,
};
