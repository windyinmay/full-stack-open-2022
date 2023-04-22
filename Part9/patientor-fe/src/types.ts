export interface Diagnosis {
	code: string;
	name: string;
	latin?: string;
}

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

// export enum EntryType {
// 	HealthCheck = 'HealthCheck',
// 	OccupationalHealthcare = 'OccupationalHealthcare',
// 	Hospital = 'Hospital',
// }

export interface Patient {
	id: string;
	name: string;
	occupation: string;
	gender: Gender;
	ssn?: string;
	dateOfBirth?: string;
	entries: Entry[];
}

// export interface DiagnoseEntry {
// 	code: string;
// 	name: string;
// 	latin?: string;
// }
export type Entry =
	| OccupationalHealthcareEntry
	| HospitalEntry
	| HealthCheckEntry;

export interface BaseEntry {
	id: string;
	date?: string;
	specialist: string;
	diagnosisCodes?: Array<Diagnosis['code']>;
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
	employerName: string;
	sickLeave?: SickLeave;
}

export interface SickLeave {
	startDate?: string;
	endDate?: string;
}

export interface HealthCheckEntry extends BaseEntry {
	type: 'HealthCheck';
	healthCheckRating: HealthCheckRating;
}

export type PatientFormValues = Omit<Patient, 'id' | 'entries'>;

type UnionOmit<T, K extends string | number | symbol> = T extends unknown
	? Omit<T, K>
	: never;
// Define Entry without the 'id' property
export type NewEntry = UnionOmit<Entry, 'id'>;
