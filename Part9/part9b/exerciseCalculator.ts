interface InputValues {
	inputTarget: number;
	inputDailyHours: Array<number>;
}

interface Result {
	periodLength: number;
	trainingDays: number;
	success: boolean;
	rating: number;
	ratingDescription: string;
	target: number;
	average: number;
}

const parseArguments = (args: Array<string>): InputValues => {
	if (args.length < 4) throw new Error('Not enough arguments');
	// if (args.length > 4) throw new Error('Too many arguments');
	// if (!isNaN(Number(args[2])) && !args[3].some((a) => isNaN(Number(a))))
	if (
		!isNaN(Number(args[2])) &&
		!args.slice(3).some((arg) => isNaN(Number(arg)))
	) {
		return {
			inputTarget: Number(args[2]),
			inputDailyHours: args.slice(3).map((arg) => Number(arg)),
		};
	} else {
		throw new Error('Provided values were not numbers!');
	}
};
//export to solve the parseArguments is defined the same variable in many files at a "block-scope"
export const exerciseCalculator = (
	dailyHours: Array<number>,
	target: number
): Result => {
	if (dailyHours.length <= 0)
		throw new Error('Cannot compare, need to have at least one day');
	if (target <= 0)
		throw new Error('Target hour needs to be equal or more than 1 hour');

	const trainingDays = dailyHours.filter((hPerDay) => hPerDay !== 0);
	const averageHours =
		dailyHours.reduce((prev, curr) => prev + curr) / dailyHours.length;
	let rating: number;
	let ratingDescription: string;

	if ((averageHours / target) * 100 < 65) {
		rating = 1;
		ratingDescription = 'need to contribute more time';
	} else if (
		(averageHours / target) * 100 >= 65 &&
		(averageHours / target) * 100 < 97
	) {
		rating = 2;
		ratingDescription = 'not too bad but could be better';
	} else {
		rating = 3;
		ratingDescription = 'good track records, keep improving';
	}
	// let result: Result;
	return {
		periodLength: dailyHours.length,
		trainingDays: trainingDays.length,
		success: averageHours > target,
		rating: rating,
		ratingDescription: ratingDescription,
		target: target,
		average: averageHours,
	};
};
// console.log(exerciseCalculator([3, 0, 2, 4.5, 0, 3, 1], 2));

try {
	const { inputTarget, inputDailyHours } = parseArguments(process.argv);
	exerciseCalculator(inputDailyHours, inputTarget);
} catch (error: unknown) {
	let errorMessage = 'Something bad happened.';
	if (error instanceof Error) {
		errorMessage += ' Error: ' + error.message;
	}
	console.log(errorMessage);
}
