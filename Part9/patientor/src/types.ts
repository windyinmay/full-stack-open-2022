// export type Gender = 'male' | 'female' | 'other';
export enum Gender {
	Male = 'male',
	Female = 'female',
	Other = 'other',
}
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Entry {
	entries: [];
}

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

export type NonSensitivePatientEntry = Omit<PatientEntry, 'ssn'>;

export type NewPatientEntry = Omit<PatientEntry, 'id'>;
