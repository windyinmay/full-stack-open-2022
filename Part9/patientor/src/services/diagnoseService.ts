import diagnoses from '../../data/diagnosesEntries';

import { DiagnoseEntry } from '../types';

const diagnosis: Array<DiagnoseEntry> = diagnoses;

const getDiagnoses = (): DiagnoseEntry[] => {
	return diagnosis;
};

const addDiagnose = () => {
	return null;
};

export default {
	getDiagnoses,
	addDiagnose,
};
