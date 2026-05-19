
export interface BmiValues {
  weight: number;
  height: number;
}

export const parseArguments = (mNumbers: [string, string]): BmiValues => {
  if (!isNaN(Number(mNumbers[0])) && !isNaN(Number(mNumbers[1]))) {
    return {
      height: Number(mNumbers[0]),
      weight: Number(mNumbers[1]),
    };
  } else {
    throw new Error("Provided values were not numbers!");
  }
};

const parseCommandline = (args: string[]): BmiValues => {
  if (args.length < 4) throw new Error("Not enough arguments");
  if (args.length > 4) throw new Error("Too many arguments");

  return parseArguments([args[3], args[4]]);
};

export type BmiCategories =
  | "Underweight (Severe thinness)"
  | "Underweight (Moderate thinness)"
  | "Underweight (Mild thinness)"
  | "Normal range"
  | "Overweight (Pre-Obese)"
  | "Overweight (Class I)"
  | "Overweight (Class II)"
  | "Overweight (Class III)";

export const calculateBmi = (values: BmiValues): BmiCategories => {
  const bmi = values.weight / (values.height / 100) ** 2;

  if (bmi < 16.0) {
    return "Underweight (Severe thinness)";
  } else if (bmi < 17.0) {
    return "Underweight (Moderate thinness)";
  } else if (bmi < 18.5) {
    return "Underweight (Mild thinness)";
  } else if (bmi < 25.0) {
    return "Normal range";
  } else if (bmi < 30.0) {
    return "Overweight (Pre-Obese)";
  } else if (bmi < 35.0) {
    return "Overweight (Class I)";
  } else if (bmi < 40.0) {
    return "Overweight (Class II)";
  } else {
    return "Overweight (Class III)";
  }
};

if (import.meta.main) {
  try {
    const bmiValues = parseCommandline(process.argv);
    console.log(calculateBmi(bmiValues));
  } catch (error: unknown) {
    let errorMsg = "Something bad happened: ";
    if (error instanceof Error) {
      errorMsg += `Error: ${error.message}`;
    }
    console.log(errorMsg);
  }
}
