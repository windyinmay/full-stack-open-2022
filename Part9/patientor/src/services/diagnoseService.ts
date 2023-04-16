import diagnoses from '../../data/diagnosesEntries';

import { DiagnoseEntry } from '../types';

const getDiagnoses = (): DiagnoseEntry[] => {
	return diagnoses;
};

const addDiagnose = () => {
	return null;
};

export default {
	getDiagnoses,
	addDiagnose,
};
