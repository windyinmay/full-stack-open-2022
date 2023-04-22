import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Entry, Patient } from '../types';

import patientService from '../services/patients';

import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import TransgenderIcon from '@mui/icons-material/Transgender';

import Entries from '../components/EntryDetails';

interface Props {
	singlePatient: Patient | null;
	setSinglePatient: React.Dispatch<React.SetStateAction<Patient | null>>;
}
const SinglePatientPage = ({ singlePatient, setSinglePatient }: Props) => {
	const { id } = useParams<{ id: string }>();

	useEffect(() => {
		const fetchPatient = async () => {
			const patient = await patientService.getSingle(id);

			setSinglePatient(patient);
		};
		void fetchPatient();
	}, [id, setSinglePatient]);

	if (!singlePatient) {
		return <div>Loading...</div>;
	}

	const GenderIcon = () => {
		switch (singlePatient.gender) {
			case 'male':
				return <MaleIcon />;
			//break is unreachable code this case
			// break;
			case 'female':
				return <FemaleIcon />;
			// break;
			case 'other':
				return <TransgenderIcon />;
			default:
				return null;
		}
	};

	return (
		<div>
			<div>
				<h2>
					<b>{singlePatient.name}</b> <GenderIcon />
				</h2>

				<p>ssn: {singlePatient.ssn}</p>
				<p>ocupation: {singlePatient.occupation}</p>
			</div>

			<div>
				<h2>Entries</h2>
				{/* <Entries singlePatient={singlePatient} /> */}

				{singlePatient.entries.map((entry: Entry) => (
					<Entries key={entry.id} entry={entry} />
				))}
			</div>
		</div>
	);
};

export default SinglePatientPage;
