import { CoursePart } from '../App';
/**
 * Helper function for exhaustive type checking
 */
const assertNever = (value: never): never => {
	throw new Error(
		`Unhandled discriminated union member: ${JSON.stringify(value)}`
	);
};

const Part = ({ coursePart }: { coursePart: CoursePart }) => {
	switch (coursePart.kind) {
		case 'basic':
			return (
				<div>
					<h3>
						<b>
							{coursePart.name} {coursePart.exerciseCount}
						</b>
					</h3>
					<i>{coursePart.description}</i>
				</div>
			);
			break;
		case 'group':
			return (
				<div>
					<h3>
						<b>
							{coursePart.name} {coursePart.exerciseCount}
						</b>
					</h3>
					<i>Group project count: {coursePart.groupProjectCount}</i>
				</div>
			);
			break;
		case 'background':
			return (
				<div>
					<h3>
						<b>
							{coursePart.name} {coursePart.exerciseCount}
						</b>
					</h3>
					<i>{coursePart.description}</i>
					<p>Back ground material: {coursePart.backgroundMaterial}</p>
				</div>
			);
			break;
		case 'special':
			return (
				<div>
					<h3>
						<b>
							{coursePart.name} {coursePart.exerciseCount}
						</b>
					</h3>
					<i>{coursePart.description}</i>
					<p>
						Requirements:{' '}
						{coursePart.requirements.map((r, index) => (
							<span key={index}>
								{r}
								{',  '}
							</span>
						))}
					</p>
				</div>
			);
			break;
		default:
			return assertNever(coursePart);
			break;
	}
};

export default Part;
