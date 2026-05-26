import express, { type NextFunction, type Response, type Request } from 'express';

import patientService from '../services/patientService.ts';
import { NewPatientSchema, type NewPatient, type PublicPatient } from '../types.ts';

import { z } from 'zod';

const newPatientParser = (req: Request, _res: Response, next: NextFunction) => {
    try {
        NewPatientSchema.parse(req.body);
        next();
    } catch (error: unknown) {
        next(error);
    }
};

const errorMiddleware = (error: unknown, _req: Request, res: Response, next: NextFunction) => {
    if (error instanceof z.ZodError) {
        res.status(400).send({ error: error.issues });
    } else {
        next(error);
    }
};

const router = express.Router();

router.get('/', (_req, res: Response<PublicPatient[]>) => {
    const data = patientService.getAllPublic();
    res.send(data);
});

router.get('/:id', (req, res) => {
    const patient = patientService.findById(req.params.id);

    if (patient) {
        res.send(patient);
    } else {
        res.sendStatus(404);
    }
});

router.post('/', newPatientParser, (req: Request<unknown, unknown, NewPatient>, res: Response<PublicPatient>) => {
    const newPatient: NewPatient = NewPatientSchema.parse(req.body);
    const addedPatient = patientService.addPatient(newPatient);
    res.json(addedPatient);
});

router.use(errorMiddleware);

export default router;