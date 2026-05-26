import data from '../../data/diagnoses.ts';
import type { Diagnosis } from '../types.ts';

const diagnosisData: Diagnosis[] = data;

const getDiagnoses = (): Diagnosis[] => {
    return diagnosisData;
};

export default {
    getDiagnoses,
};