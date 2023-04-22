import { Box } from '@mui/material';
import { Entry } from '../types';
const OccupationalEntry = ({ entry }: { entry: Entry }) => {
	return (
		<div>
			<p>
				{entry.date} {entry.description}
			</p>
			{entry.diagnosisCodes?.map((code, index) => (
				<ul key={index}>
					<li>{code}</li>
				</ul>
			))}
		</div>
	);
};

export default OccupationalEntry;
