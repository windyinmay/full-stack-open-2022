import { useState } from 'react';
import { Diagnosis, Entry } from '../types';
import HealthCheckEntry from './HealthCheckEntry';
import HospitalEntry from './HealthCheckEntry';
import OccupationalEntry from './OccupationalEntry';

import diagnoseService from '../services/diagnosis';

const assertNever = (value: never): never => {
	throw new Error(
		`Unhandled discriminated union member: ${JSON.stringify(value)}`
	);
};

const Entries = ({ entry }: { entry: Entry }) => {
	const [diagnosis, setDiagnosis] = useState<Diagnosis[]>([]);
	if (!diagnosis) {
		const fetchDiagnoseList = async () => {
			const diagnosis = await diagnoseService.getAll();
			setDiagnosis(diagnosis);
		};
		void fetchDiagnoseList();
	}

	// const codes = entry.diagnosisCodes ?? [];

	// return (
	// 	<div>
	// 		<p>
	// 			{entry.date} {''} <i>{entry.description}</i>
	// 		</p>
	// 		<ul>
	// 			{codes.map((code, index) => (
	// 				<li key={code}>
	// 					{code}
	// 					{code} {diagnosis[code] ? diagnosis[code].name : null}
	// 				</li>
	// 			))}
	// 		</ul>
	// 	</div>
	// );

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
