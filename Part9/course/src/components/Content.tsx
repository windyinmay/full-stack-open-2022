import { ContentProps } from '../App';

const Content = (props: ContentProps) => {
	return (
		<p>
			{props.name} {props.exerciseCount}
		</p>
	);
};

export default Content;
