import { useState } from 'react';
import { Entry } from '../../types';
import HealthCheckEntry from './HealthCheckEntry';
import HospitalEntry from './HealthCheckEntry';
import OccupationalEntry from './OccupationalEntry';

const assertNever = (value: never): never => {
	throw new Error(
		`Unhandled discriminated union member: ${JSON.stringify(value)}`
	);
};

const Entries = ({ entry }: { entry: Entry }) => {
	// const [error, setError] = useState<string>();

	try {
		switch (entry.type) {
			case 'Hospital':
				return <HospitalEntry entry={entry} />;

			case 'HealthCheck':
				return <HealthCheckEntry entry={entry} />;

			case 'OccupationalHealthcare':
				return <OccupationalEntry entry={entry} />;

			default:
				return assertNever(entry);
		}
	} catch (error: any) {
		console.log('error', error.message);
		return null;
	}
};

export default Entries;
