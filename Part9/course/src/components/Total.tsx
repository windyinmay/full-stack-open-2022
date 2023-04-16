import { TotalProps } from '../App';
const Total = (props: TotalProps) => {
	return (
		<p>
			Number of exercises {''} {props.total}{' '}
		</p>
	);
};

export default Total;
