interface Result {
	periodLength: number;
	trainingDays: number;
	success: boolean;
	rating: number;
	ratingDescription: string;
	target: number;
	average: number;
}

const exerciseCalculator = (dailyHours: number[], target: number): Result => {
	const trainingDays = dailyHours.filter((hPerDay) => hPerDay !== 0);
	const averageHours =
		dailyHours.reduce((prev, curr) => prev + curr) / dailyHours.length;
	let rating: number;
	let ratingDescription: string;

	if ((averageHours / target) * 100 < 60) {
		rating = 1;
		ratingDescription = 'need to contribute more time';
	} else if (
		(averageHours / target) * 100 >= 60 &&
		(averageHours / target) * 100 < 97
	) {
		rating = 2;
		ratingDescription = 'not too bad but could be better';
	} else {
		rating = 3;
		ratingDescription = 'good track records, keep improving';
	}

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
console.log(exerciseCalculator([3, 0, 2, 4.5, 0, 3, 1], 2));
