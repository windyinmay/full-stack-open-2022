/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { DiagnoseEntry, EntryType, NewEntry } from '../types';
import { isDate, isString } from './toNewPatientEntry';

export type Fields = {
	date: unknown;
	specialist: unknown;
	type: unknown;
	description: unknown;
	diagnosisCodes: unknown;
};

const toNewEntry = ({
	date,
	specialist,
	type,
	description,
	diagnosisCodes,
	...entry
}: Fields): NewEntry => {
	const newEntry: NewEntry = {
		date: parseDate(date),
		specialist: parseSpecialist(specialist),
		type: parseType(type),
		description: parseDescription(description),
		diagnosisCodes: parseDiagnosisCodes(diagnosisCodes),
		...entry,
	};
	return newEntry;
};

export const parseDate = (date: unknown): string => {
	if (!date || !isString(date) || !isDate(date)) {
		throw new Error('Incorrect or missing date' + date);
	}
	return date;
};

const parseSpecialist = (specialist: unknown): string => {
	if (!specialist || !isString(specialist)) {
		throw new Error('Incorrect or missing specialist: ' + specialist);
	}
	return specialist;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isType = (param: any): param is EntryType => {
	return Object.values(EntryType).includes(param);
};

const parseType = (type: unknown): EntryType => {
	if (!type || !isType(type)) {
		throw new Error('Incorrect or missing type: ' + type);
	}
	return type;
};

const parseDescription = (desc: unknown): string => {
	if (!desc || !isString(desc)) {
		throw new Error('Incorrect or missing descripion: ' + desc);
	}
	return desc;
};
const parseDiagnosisCodes = (object: unknown): Array<DiagnoseEntry['code']> => {
	if (!object || typeof object !== 'object' || !('diagnosisCodes' in object)) {
		// we will just trust the data to be in correct form
		return [] as Array<DiagnoseEntry['code']>;
	}

	return object.diagnosisCodes as Array<DiagnoseEntry['code']>;
};
export default toNewEntry;
