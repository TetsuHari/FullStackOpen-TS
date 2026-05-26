import { z } from 'zod';

export const Gender = {
    Male: 'male',
    Female: 'female',
    Other: 'other',
};

export type Gender = typeof Gender[keyof typeof Gender];

export const NewPatientSchema = z.object({
    name: z.string(),
    dateOfBirth: z.iso.date(),
    ssn: z.string(),
    gender: z.enum(Gender),
    occupation: z.string()
});

export interface Diagnosis {
    code: string,
    name: string,
    latin?: string,
};

export interface Patient extends NewPatient {
    id: string,
};


export type PublicPatient = Omit<Patient, 'ssn'>;
export type NewPatient = z.infer<typeof NewPatientSchema>;