interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

interface ExerciseArgs {
  target: number;
  excerStats: Array<number>;
}

const parseExerciseArguments = (args: string[]): ExerciseArgs => {
  if (args.length < 4) throw new Error("Not enough arguments");

  const excerStats: Array<number> = [];
  let target = 0;

  if (!isNaN(Number(args[2]))) {
    target = Number(args[2]);
  } else new Error("Target value is not a number!");

  const unparsedDays = args.slice(3 - args.length);
  for (const day of unparsedDays) {
    if (!isNaN(Number(day))) {
      excerStats.push(Number(day));
    } else {
      throw new Error("Provided values were not numbers!");
    }
  }

  return {
    target,
    excerStats,
  };
};

export const calculateExercise = (
  exerciseStats: Array<number>,
  target: number
): Result => {
  const avg = exerciseStats.reduce((a, b) => a + b, 0) / exerciseStats.length;
  const tDays = exerciseStats.filter((h) => h > 0).length;
  let rating = 1;

  if (avg >= target) {
    rating = 3;
  } else if (avg >= target * 0.7) {
    rating = 2;
  }

  const ratingDescription = (() => {
    switch (rating) {
      case 2: {
        return "You did ok";
      }
      case 3: {
        return "You did excellent";
      }
      default: {
        return "You did bad";
      }
    }
  })();

  return {
    periodLength: exerciseStats.length,
    trainingDays: tDays,
    success: avg >= target,
    rating: rating,
    ratingDescription: ratingDescription,
    target: target,
    average: avg,
  };
};

if (import.meta.main) {
    try {
    const { target, excerStats } = parseExerciseArguments(process.argv);
    console.log(calculateExercise(excerStats, target));
    } catch (error: unknown) {
    let errorMsg = "Something bad happened.";
    if (error instanceof Error) {
        errorMsg += ` Error: ${error.message}`;
    }
    console.log(errorMsg);
    }
}