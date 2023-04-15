// interface BMIValues {
// 	value1: number;
// 	value2: number;
// }
const calculateBmi = (height: number, weight: number): string => {
	const bmi = (weight / height / height) * 10000;
	if (bmi < 18.5) {
		return 'Thin (Underweight)';
	} else if (bmi >= 18.5 && bmi <= 24.9) {
		return 'Normal (healthy weight)';
	} else if (bmi >= 25 && bmi <= 29.9) {
		return 'Obesity (class 1)';
	} else return 'Obesity';
};

console.log(calculateBmi(180, 74));
