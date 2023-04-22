import { Box, Typography } from '@mui/material';
import { OccupationalHealthcareEntry } from '../types';
import WorkIcon from '@mui/icons-material/Work';
const Occupational = ({ entry }: { entry: OccupationalHealthcareEntry }) => {
	return (
		<Box
			sx={{
				border: '1px solid black',
				borderRadius: '5px',
				margin: '10px 0',
				padding: '0 5px',
			}}
		>
			<Typography>
				{entry.date}
				<WorkIcon sx={{ marginLeft: '3px' }} />
			</Typography>
			<p>
				<i>{entry.description}</i>
			</p>
			<p>diagnose by {entry.specialist}</p>
		</Box>
	);
};

export default Occupational;
