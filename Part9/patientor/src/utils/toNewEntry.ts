// import { EntryType, NewEntry } from '../types';
// import { isDate, isString } from './toNewPatientEntry';

// const toNewEntry = (object: unknown): NewEntry => {
// 	if (!object || typeof object !== 'object') {
// 		throw new Error('Incorrect or missing data');
// 	}
// 	if (
// 		'date' in object &&
// 		'specialist' in object &&
// 		'type' in object &&
// 		'description' in object &&
// 		// 'diagnoseCodes' in object
// 	) {
// 		console.log(object);
// 		const newEntry: NewEntry = {
// 			date: parseDate(object.date),
// 			specialist: parseSpecialist(object.specialist),
// 			type: parseType(object.type),
// 			description: parseDescription(object.description),
// 			// diagnoseCodes: object.diagnoseCodes,
// 		};
// 		return newEntry;
// 	}
// 	throw new Error('Incorrect data: some fields are missing');
// };

// const isType = (param: any): param is EntryType => {
// 	// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
// 	return Object.values(EntryType).includes(param);
// };

// const parseDate = (date: unknown): string => {
// 	if (!date || !isString(date) || !isDate(date)) {
// 		throw new Error('Incorrect or missing date' + date);
// 	}
// 	return date;
// };

// const parseSpecialist = (specialist: unknown): string => {
// 	if (!specialist || !isString(specialist)) {
// 		throw new Error('Incorrect or missing specialist: ' + specialist);
// 	}
// 	return specialist;
// };

// const parseType = (type: unknown): EntryType => {
// 	if (!type || !isType(type)) {
// 		throw new Error('Incorrect or missing type: ' + type);
// 	}
// 	return type;
// };

// const parseDescription = (desc: unknown): string => {
// 	if (!desc || !isString(desc)) {
// 		throw new Error('Incorrect or missing descripion: ' + desc);
// 	}
// 	return desc;
// };
