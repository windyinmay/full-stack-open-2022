export const isNotGreaterThanZero = (arg: number): boolean =>
	// if (!isNaN(Number(arg)) && arg >= 0) return false;
	// if (!isNaN(Number(arg)) && arg < 0) return true;
	arg <= 0;
