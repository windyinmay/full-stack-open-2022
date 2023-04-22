import { Box, Typography } from '@mui/material';
import { HospitalEntry } from '../types';
import { Favorite } from '@mui/icons-material';
import BloodtypeIcon from '@mui/icons-material/Bloodtype';

const Hospital = ({ entry }: { entry: HospitalEntry }) => {
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
				<BloodtypeIcon />
			</Typography>
			<p>
				<i>{entry.description}</i>
			</p>
			<p>diagnosed by {entry.specialist}</p>
		</Box>
	);
};

export default Hospital;
