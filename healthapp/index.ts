import express from "express";
import { calculateBmi, parseArguments } from "./bmiCalculator.ts";
import { calculateExercise } from "./exerciseCalculator.ts";

const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const { weight, height } = req.query;

  if (typeof weight !== 'string' || typeof height !== 'string') {
    return res.status(400).json({
      error: "malformatted parameters"
    });
  }

  const values: [string, string] = [height, weight];

  try {
    const bmiValues = parseArguments(values);
    const result = {...bmiValues, bmi: calculateBmi(bmiValues)};
    return res.send(result);
  } catch (_error: unknown) {
   return res.status(400).json({
    error: "malformatted parameters"
   });
  };
 });

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = req.body;

  // Check for missing paraments
  if (daily_exercises === undefined || target === undefined) {
    return res.status(400).json({ error: "parameters missing" });
  };

  // Check for malformatted parameters
  if (typeof target !== 'number' || !Array.isArray(daily_exercises)) {
    return res.status(400).json({ error: "malformatted parameters"});
  }

  const allNumbers = daily_exercises.every((item) => typeof item === 'number');

  if (!allNumbers) {
    return res.status(400).json({ error: "malformatted parameters" });
  }


  const result = calculateExercise(daily_exercises, target);

  return res.send(result);
  




});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});