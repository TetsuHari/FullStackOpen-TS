import express, { type Response } from 'express';

import diagService from '../services/diagnosisService.ts';
import type { Diagnosis } from '../types.ts';

const router = express.Router();

router.get('/', (_req, res: Response<Diagnosis[]>) => {
    const data = diagService.getDiagnoses();
    res.send(data);
});

export default router;