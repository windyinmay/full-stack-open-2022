// export type Gender = 'male' | 'female' | 'other';
//use enum when setting properties or values that
//can only be a certain number of possible values.
export enum Gender {
	Male = 'male',
	Female = 'female',
	Other = 'other',
}

export enum HealthCheckRating {
	'Healthy' = 0,
	'LowRisk' = 1,
	'HighRisk' = 2,
	'CriticalRisk' = 3,
}

export enum EntryType {
	HealthCheck = 'HealthCheck',
	OccupationalHealthcare = 'OccupationalHealthcare',
	Hospital = 'Hospital',
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface

export interface PatientEntry {
	id: string;
	name: string;
	dateOfBirth: string;
	ssn?: string;
	gender: Gender;
	occupation?: string;
	entries: Entry[];
}

export interface DiagnoseEntry {
	code: string;
	name: string;
	latin?: string;
}
export type Entry =
	| OccupationalHealthcareEntry
	| HospitalEntry
	| HealthCheckEntry;

export interface BaseEntry {
	id: string;
	date?: string;
	specialist: string;
	diagnosisCodes?: Array<DiagnoseEntry['code']>;
	description: string;
	type: string;
}

export interface HospitalEntry extends BaseEntry {
	type: 'Hospital';
	discharge: Discharge;
}

export interface Discharge {
	date?: string;
	criteria: string;
}
//using interface for objects or methods or properties of an object
//where it will receive a specific component
export interface OccupationalHealthcareEntry extends BaseEntry {
	type: 'OccupationalHealthcare';
	employerName?: string;
	sickLeave?: SickLeave;
}

export interface SickLeave {
	startDate?: string;
	endDate?: string;
}

export interface HealthCheckEntry extends BaseEntry {
	type: 'HealthCheck';
	healthCheckRating?: HealthCheckRating;
}

export type NonSensitivePatientEntry = Omit<PatientEntry, 'ssn' | 'entries'>;
export type PublicPatient = Omit<PatientEntry, 'ssn' | 'entries'>;
export type NewPatientEntry = Omit<PatientEntry, 'id'>;

// Define special omit for unions
// type UnionOmit<T, K extends string | number | symbol> = T extends unknown
// 	? Omit<T, K>
// 	: never;
// Define Entry without the 'id' property
export type NewEntry = Omit<Entry, 'id'>;
