import { CoursePart } from '../App';

const Total = ({ courseParts }: { courseParts: CoursePart[] }) => {
	const total = courseParts.reduce(
		(prev, curr) => prev + curr.exerciseCount,
		0
	);
	return (
		<p>
			Number of exercises {''} {total}
		</p>
	);
};

export default Total;
