import Header from './components/Header';
import Content from './components/Content';
import Total from './components/Total';

export interface ContentProps {
	name: string;
	exerciseCount: number;
}

export interface TotalProps {
	total: number;
}
const App = () => {
	const courseName = 'Half Stack application development';
	const courseParts = [
		{
			name: 'Fundamentals',
			exerciseCount: 10,
		},
		{
			name: 'Using props to pass data',
			exerciseCount: 7,
		},
		{
			name: 'Deeper type usage',
			exerciseCount: 14,
		},
	];

	return (
		<div>
			<Header name={courseName} />
			{courseParts.map((c, index) => (
				<Content key={index} name={c.name} exerciseCount={c.exerciseCount} />
			))}

			<Total
				total={courseParts.reduce((prev, curr) => prev + curr.exerciseCount, 0)}
			/>
		</div>
	);
};

export default App;
