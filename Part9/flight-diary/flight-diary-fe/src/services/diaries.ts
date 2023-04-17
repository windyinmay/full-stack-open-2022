import axios from 'axios';

import { apiBaseUrl } from '../constants';
import { DiaryEntry, DiaryFormValues } from '../types';

const getAll = async () => {
	const { data } = await axios.get<DiaryEntry[]>(`${apiBaseUrl}/diaries`);
	return data;
};

const create = async (object: DiaryFormValues) => {
	const { data } = await axios.post<DiaryEntry>(
		`${apiBaseUrl}/diaries`,
		object
	);

	return data;
};

export default {
	getAll,
	create,
};
