import { useState, SyntheticEvent } from 'react';

import {
	TextField,
	InputLabel,
	MenuItem,
	Select,
	Grid,
	Button,
	SelectChangeEvent,
} from '@mui/material';

import { DiaryFormValues, Weather, Visibility } from '../../types';

interface Props {
	onCancel: () => void;
	onSubmit: (values: DiaryFormValues) => void;
}

interface WeatherOption {
	value: Weather;
	label: string;
}
interface VisibilityOption {
	value: Visibility;
	label: string;
}
const WeatherOptions: WeatherOption[] = Object.values(Weather).map((v) => ({
	value: v,
	label: v.toString(),
}));
const VisibilityOptions: VisibilityOption[] = Object.values(Visibility).map(
	(v) => ({
		value: v,
		label: v.toString(),
	})
);

const AddDiaryForm = ({ onCancel, onSubmit }: Props) => {
	const [date, setDate] = useState('');
	const [visibility, setVisibility] = useState(Visibility.Ok);
	const [weather, setWeather] = useState(Weather.Sunny);
	const [comment, setComment] = useState('');
	const [checked, setChecked] = useState(false);

	const onVisibilityChange = (event: SelectChangeEvent<string>) => {
		event.preventDefault();
		if (typeof event.target.value === 'string') {
			const value = event.target.value;
			const visibility = Object.values(Visibility).find(
				(vi) => vi.toString() === value
			);
			if (visibility) {
				setVisibility(visibility);
			}
		}
	};

	const onWeatherChange = (event: SelectChangeEvent<string>) => {
		event.preventDefault();
		if (typeof event.target.value === 'string') {
			const value = event.target.value;
			const weather = Object.values(Weather).find(
				(w) => w.toString() === value
			);
			if (weather) {
				setWeather(weather);
			}
		}
	};

	const addDiary = (event: SyntheticEvent) => {
		event.preventDefault();
		onSubmit({
			date,
			visibility,
			weather,
			comment,
		});
	};

	return (
		<div>
			<form onSubmit={addDiary}>
				<InputLabel style={{ marginTop: 20 }}>Date</InputLabel>
				<TextField
					type='date'
					fullWidth
					value={date}
					onChange={({ target }) => setDate(target.value)}
				/>
				<fieldset>
					<legend>Select a visibility:</legend>
					{VisibilityOptions.map((option) => (
						<div key={option.label}>
							<input
								type='radio'
								id={option.label}
								value={option.value}
								checked={checked}
								onChange={onVisibilityChange}
							/>
							<label>{option.label}</label>
						</div>
					))}
				</fieldset>

				<InputLabel style={{ marginTop: 20 }}>Visibility</InputLabel>
				<Select
					label='Visibility'
					fullWidth
					value={visibility}
					onChange={onVisibilityChange}
				>
					{VisibilityOptions.map((option) => (
						<MenuItem key={option.label} value={option.value}>
							{option.label}
						</MenuItem>
					))}
				</Select>

				<InputLabel style={{ marginTop: 20 }}>Weather</InputLabel>
				<Select
					label='Weather'
					fullWidth
					value={weather}
					onChange={onWeatherChange}
				>
					{WeatherOptions.map((option) => (
						<MenuItem key={option.label} value={option.value}>
							{option.label}
						</MenuItem>
					))}
				</Select>
				<InputLabel style={{ marginTop: 20 }}>Comment</InputLabel>
				<TextField
					label='Comment'
					fullWidth
					value={comment}
					onChange={({ target }) => setComment(target.value)}
				/>
				<Grid>
					<Grid item>
						<Button
							color='secondary'
							variant='contained'
							style={{ float: 'left' }}
							type='button'
							onClick={onCancel}
						>
							Cancel
						</Button>
					</Grid>
					<Grid item>
						<Button
							style={{
								float: 'right',
							}}
							type='submit'
							variant='contained'
						>
							Add
						</Button>
					</Grid>
				</Grid>
			</form>
		</div>
	);
};

export default AddDiaryForm;
