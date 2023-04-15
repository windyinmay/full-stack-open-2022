import { isNotGreaterThanZero } from './utils/helper';

interface BMIValues {
	height: number;
	weight: number;
}

const parseArguments = (args: string[]): BMIValues => {
	if (args.length < 4) throw new Error('Not enough arguments');
	if (args.length > 4) throw new Error('Too many arguments');

	if (
		!isNaN(Number(args[2])) &&
		!(Number(args[2]) <= 0) &&
		!isNaN(Number(args[3]))
	) {
		return {
			height: Number(args[2]),
			weight: Number(args[3]),
		};
	} else {
		throw new Error(
			'Provided values were not numbers or height is not greater than 0!'
		);
	}
};
//export to solve the parseArguments is defined the same variable in many files at a "block-scope"
export const calculateBmi = (h: number, w: number) => {
	const bmi = (w / h / h) * 10000;
	let printText: string;

	if (bmi < 18.5) {
		printText = 'Thin (Underweight)';
	} else if (bmi >= 18.5 && bmi <= 24.9) {
		printText = 'Normal (healthy weight)';
	} else if (bmi >= 25 && bmi <= 29.9) {
		printText = 'Overweight';
	} else printText = 'Obesity';
	// return printText;
	console.log(printText);
};

try {
	const { height, weight } = parseArguments(process.argv);
	calculateBmi(height, weight);
} catch (error: unknown) {
	let errorMessage = 'Something bad happened.';
	if (error instanceof Error) {
		errorMessage += ' Error: ' + error.message;
	}
	console.log(errorMessage);
}
