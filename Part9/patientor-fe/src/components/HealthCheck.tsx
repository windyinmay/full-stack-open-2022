import { Box, Typography } from '@mui/material';
import { HealthCheckEntry } from '../types';
import { Favorite } from '@mui/icons-material';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';

const HealthCheck = ({ entry }: { entry: HealthCheckEntry }) => {
	const HealthRating = ({ health }: { health: number }) => {
		switch (health) {
			case 0:
				return <Favorite color='success' />;
			case 1:
				return <Favorite color='info' />;
			case 2:
				return <Favorite color='warning' />;
			case 3:
				return <Favorite color='error' />;
			default:
				return <div></div>;
		}
	};
	return (
		// <div>
		// 	<p>
		// 		{entry.date} {entry.description}
		// 	</p>
		// 	{entry.diagnosisCodes?.map((code, index) => (
		// 		<ul key={index}>
		// 			<li>{code}</li>
		// 		</ul>
		// 	))}
		// </div>
		<Box
			sx={{
				border: '1px solid black',
				borderRadius: '5px',
				margin: '10px 0',
				padding: '0 5px',
			}}
		>
			<Typography>
				{entry.date} <MedicalServicesIcon />
			</Typography>
			<p>
				<i>{entry.description}</i>
			</p>
			<HealthRating health={entry.healthCheckRating} />
			<p>diagnosed by {entry.specialist}</p>
		</Box>
	);
};

export default HealthCheck;
