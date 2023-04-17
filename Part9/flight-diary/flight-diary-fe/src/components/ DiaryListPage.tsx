// import { useState } from 'react';
import {
	Box,
	Table,
	TableHead,
	Typography,
	TableCell,
	TableRow,
	TableBody,
} from '@mui/material';
// import axios from 'axios';
import { DiaryEntry } from '../types';

interface Props {
	diaries: DiaryEntry[];
	setDiaries: React.Dispatch<React.SetStateAction<DiaryEntry[]>>;
}

const DiaryListPage = ({ diaries, setDiaries }: Props) => {
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
		</div>
	);
};

export default DiaryListPage;
