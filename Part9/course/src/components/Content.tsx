import { CoursePart } from '../App';
import Part from './Part';

const Content = ({ courseParts }: { courseParts: CoursePart[] }) => {
	return (
		<p>
			{courseParts.map((coursePart: CoursePart) => (
				<Part key={coursePart.name} coursePart={coursePart} />
			))}
		</p>
	);
};

export default Content;
