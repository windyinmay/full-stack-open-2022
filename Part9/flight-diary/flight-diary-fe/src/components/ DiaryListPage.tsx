import { useState } from 'react';
import {
	Box,
	Button,
	Table,
	TableHead,
	Typography,
	TableCell,
	TableRow,
	TableBody,
} from '@mui/material';
import axios from 'axios';
import { DiaryEntry, DiaryFormValues } from '../types';
import AddNewDiary from './AddNewDiary';
import diaryService from '../services/diaries';

interface Props {
	diaries: DiaryEntry[];
	setDiaries: React.Dispatch<React.SetStateAction<DiaryEntry[]>>;
}

const DiaryListPage = ({ diaries, setDiaries }: Props) => {
	const [modalOpen, setModalOpen] = useState<boolean>(false);
	const [error, setError] = useState<string>();

	const openModal = (): void => setModalOpen(true);

	const closeModal = (): void => {
		setModalOpen(false);
		setError(undefined);
	};

	const submitNewDiary = async (values: DiaryFormValues) => {
		try {
			const diary = await diaryService.create(values);
			setDiaries(diaries.concat(diary));
			setModalOpen(false);
		} catch (e: unknown) {
			if (axios.isAxiosError(e)) {
				if (e?.response?.data && typeof e?.response?.data === 'string') {
					const message = e.response.data.replace(
						'Something went wrong. Error: ',
						''
					);
					console.error(message);
					setError(message);
				} else {
					setError('Unrecognized axios error');
				}
			} else {
				console.error('Unknown error', e);
				setError('Unknown error');
			}
		}
	};
	return (
		<div className='App'>
			<Box>
				<Typography align='center' variant='h6'>
					Diary List
				</Typography>
			</Box>
			<Table style={{ marginBottom: '1em' }}>
				<TableHead>
					<TableRow>
						<TableCell>Date</TableCell>
						<TableCell>Weather</TableCell>
						<TableCell>Visibility</TableCell>
						<TableCell>Comment</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{Object.values(diaries).map((diary: DiaryEntry) => (
						<TableRow key={diary.id}>
							<TableCell>{diary.date}</TableCell>
							<TableCell>{diary.weather}</TableCell>
							<TableCell>{diary.visibility}</TableCell>
							<TableCell>{diary.comment}</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>

			<AddNewDiary
				modalOpen={modalOpen}
				onSubmit={submitNewDiary}
				error={error}
				onClose={closeModal}
			/>
			<Button variant='contained' onClick={() => openModal()}>
				Add New Diary Entry
			</Button>
		</div>
	);
};

export default DiaryListPage;
