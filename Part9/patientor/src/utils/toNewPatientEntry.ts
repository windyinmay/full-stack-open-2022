import {
	NewPatientEntry,
	Gender,
	// Entry,
	// BaseEntry,
	// HospitalEntry,
	// OccupationalHealthcareEntry,
	// HealthCheckEntry,
	// HealthCheckRating,
} from '../types';

const toNewPatientEntry = (object: unknown): NewPatientEntry => {
	if (!object || typeof object !== 'object') {
		throw new Error('Incorrect or missing data');
	}
	if (
		'name' in object &&
		'dateOfBirth' in object &&
		'ssn' in object &&
		'gender' in object &&
		'occupation' in object &&
		'entries' in object
	) {
		console.log(object);

		const newPatientEntry: NewPatientEntry = {
			name: parseName(object.name),
			dateOfBirth: parseDateOfBirth(object.dateOfBirth),
			ssn: parseSsn(object.ssn),
			gender: parseGender(object.gender),
			occupation: parseOccupation(object.occupation),
			// entries: Array.isArray(object.entries)
			// 	? object.entries.map(parseEntry)
			// 	: [],
			entries: [],
		};

		return newPatientEntry;
	}
	throw new Error('Incorrect data: some fields are missing');
};

export const isString = (text: unknown): text is string => {
	return typeof text === 'string' || text instanceof String;
};

export const isDate = (date: string): boolean => {
	return Boolean(Date.parse(date));
};
// const isGender = (str: string): str is Weather => {
// 	return ['male', 'female', 'other'].includes(str);
// };
const isGender = (param: string): param is Gender => {
	return Object.values(Gender)
		.map((v) => v.toString())
		.includes(param);
};
// const isEntry = (entry: unknown): entry is Entry => {
// 	if (!entry) {
// 		return false;
// 	}
// 	const baseEntry = entry as BaseEntry;
// 	if (
// 		!isString(baseEntry.id) ||
// 		!isString(baseEntry.specialist) ||
// 		!isString(baseEntry.description) ||
// 		!Array.isArray(baseEntry.diagnoseCodes) ||
// 		baseEntry.diagnoseCodes.some((code) => !isString(code))
// 	) {
// 		return false;
// 	}
// 	switch (baseEntry.type) {
// 		case 'Hospital':
// 			const hospitalEntry = baseEntry as HospitalEntry;
// 			return (
// 				hospitalEntry.discharge &&
// 				isString(hospitalEntry.discharge.criteria) &&
// 				(!hospitalEntry.discharge.date || isDate(hospitalEntry.discharge.date))
// 			);
// 		case 'OccupationalHealthcare':
// 			const occupationalHealthcareEntry =
// 				baseEntry as OccupationalHealthcareEntry;
// 			return (
// 				isString(occupationalHealthcareEntry.employerName) &&
// 				(!occupationalHealthcareEntry.sickLeave ||
// 					(isString(occupationalHealthcareEntry.sickLeave.startDate) &&
// 						isString(occupationalHealthcareEntry.sickLeave.endDate)))
// 			);
// 		case 'HealthCheck':
// 			const healthCheckEntry = baseEntry as HealthCheckEntry;
// 			return Object.values(HealthCheckRating).includes(
// 				healthCheckEntry.healthCheckRating
// 			);
// 		default:
// 			return false;
// 	}
// };

const parseName = (name: unknown): string => {
	if (!name || !isString(name)) {
		throw new Error('Incorrect or missing name' + name);
	}
	return name;
};

const parseDateOfBirth = (dateOfBirth: unknown): string => {
	if (!dateOfBirth || !isString(dateOfBirth) || !isDate(dateOfBirth)) {
		throw new Error('Incorrect or missing date: ' + dateOfBirth);
	}
	return dateOfBirth;
};

const parseSsn = (ssn: unknown): string => {
	if (!ssn || !isString(ssn)) {
		throw new Error('Incorrect or missing ssn' + ssn);
	}
	return ssn;
};

const parseGender = (gender: unknown): Gender => {
	if (!gender || !isString(gender) || !isGender(gender)) {
		throw new Error('Incorrect or missing gender: ' + gender);
	}
	return gender;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
// const parseEntry = (entry: unknown): Entry => {
// 	if (!entry || !isEntry(entry)) {
// 		throw new Error('Incorrect or missing entry: ' + entry);
// 	}
// 	return entry;
// };

const parseOccupation = (occupation: unknown): string => {
	if (!occupation || !isString(occupation)) {
		throw new Error('Incorrect or missing name' + occupation);
	}
	return occupation;
};

export default toNewPatientEntry;
