import { useState } from 'react';
import { Diagnosis, Entry } from '../types';
import HealthCheck from './HealthCheck';
import Hospital from './Hospital';
import Occupational from './Occupational';

import diagnoseService from '../services/diagnosis';

const assertNever = (value: never): never => {
	throw new Error(
		`Unhandled discriminated union member: ${JSON.stringify(value)}`
	);
};

const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
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
				return <Hospital entry={entry} />;

			case 'HealthCheck':
				return <HealthCheck entry={entry} />;

			case 'OccupationalHealthcare':
				return <Occupational entry={entry} />;

			default:
				return assertNever(entry);
		}
	} catch (error: any) {
		console.log('error', error.message);
		return null;
	}
};

export default EntryDetails;
