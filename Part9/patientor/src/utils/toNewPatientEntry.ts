import { NewPatientEntry, Gender } from '../types';

const toNewPatientEntry = (object: unknown): NewPatientEntry => {
	if (!object || typeof object !== 'object') {
		throw new Error('Incorrect or missing data');
	}
	if (
		'name' in object &&
		'dateOfBirth' in object &&
		'ssn' in object &&
		'gender' in object &&
		'occupation' in object
	) {
		console.log(object);

		const newEntry: NewPatientEntry = {
			name: parseName(object.name),
			dateOfBirth: parseDateOfBirth(object.dateOfBirth),
			ssn: parseSsn(object.ssn),
			gender: parseGender(object.gender),
			occupation: parseOccupation(object.occupation),
			entries: [],
		};

		return newEntry;
	}
	throw new Error('Incorrect data: some fields are missing');
};

const isString = (text: unknown): text is string => {
	return typeof text === 'string' || text instanceof String;
};

const isDate = (date: string): boolean => {
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

const parseOccupation = (occupation: unknown): string => {
	if (!occupation || !isString(occupation)) {
		throw new Error('Incorrect or missing name' + occupation);
	}
	return occupation;
};

export default toNewPatientEntry;
