import Header from './components/Header';
import Content from './components/Content';
import Total from './components/Total';

export interface HeaderProps {
	name: string;
}
export interface ContentProps {
	name: string;
	exerciseCount: number;
}

export interface TotalProps {
	total: number;
}

interface CoursePartBase {
	name: string;
	exerciseCount: number;
}

interface CoursePartBasic extends CoursePartBase {
	description: string;
	kind: 'basic';
}

interface CoursePartGroup extends CoursePartBase {
	groupProjectCount: number;
	kind: 'group';
}

interface CoursePartBackground extends CoursePartBase {
	description: string;
	backgroundMaterial: string;
	kind: 'background';
}

interface CoursePartSpecial extends CoursePartBase {
	description: string;
	requirements: Array<string>;
	kind: 'special';
}

export type CoursePart =
	| CoursePartBasic
	| CoursePartGroup
	| CoursePartBackground
	| CoursePartSpecial;

const App = () => {
	const courseName = 'Half Stack application development';
	const courseParts: CoursePart[] = [
		{
			name: 'Fundamentals',
			exerciseCount: 10,
			description: 'This is an awesome course part',
			kind: 'basic',
		},
		{
			name: 'Using props to pass data',
			exerciseCount: 7,
			groupProjectCount: 3,
			kind: 'group',
		},
		{
			name: 'Basics of type Narrowing',
			exerciseCount: 7,
			description: 'How to go from unknown to string',
			kind: 'basic',
		},
		{
			name: 'Deeper type usage',
			exerciseCount: 14,
			description: 'Confusing description',
			backgroundMaterial:
				'https://type-level-typescript.com/template-literal-types',
			kind: 'background',
		},
		{
			name: 'Backend development',
			exerciseCount: 21,
			description: 'Typing the backend',
			requirements: ['nodejs', 'jest'],
			kind: 'special',
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
