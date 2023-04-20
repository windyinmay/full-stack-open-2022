import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Patient, Gender } from '../../types';
import { apiBaseUrl } from '../../constants';
import axios from 'axios';

import patientService from '../../services/patients';

import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import TransgenderIcon from '@mui/icons-material/Transgender';

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
				break;
			case 'female':
				return <FemaleIcon />;
				break;
			case 'other':
				return <TransgenderIcon />;
				break;
			default:
				return null;
		}
	};

	return (
		<div>
			<h2>
				<b>{singlePatient.name}</b> <GenderIcon />
			</h2>
			<br />

			<p>ssn: {singlePatient.ssn}</p>
			<p>ocupation: {singlePatient.occupation}</p>
		</div>
	);
};

export default SinglePatientPage;
