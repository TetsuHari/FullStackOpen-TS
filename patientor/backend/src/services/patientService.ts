import data from '../../data/patients.ts';
import type { Patient, PublicPatient, NewPatient } from '../types.ts';
import { v1 as uuid } from 'uuid';

const patientData: Patient[] = data;

const publicizePatient = (p: Patient): PublicPatient => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { ssn, ...rest } = p;
    return rest;
};

const getAllPublic = (): PublicPatient[] => {
    return patientData.map(publicizePatient);
};

const findById = (id: string): PublicPatient | undefined => {
    const mPatient = patientData.find(p => p.id === id);
    const mPubPatient = mPatient ? publicizePatient(mPatient) : undefined;
    return mPubPatient;
};

const addPatient = (newP: NewPatient): Patient => {
    const id: string = uuid();
    const patient = { ...newP,  id};
    patientData.push(patient);
    console.log(patientData);
    return patient;
};

export default {
    getAllPublic,
    findById,
    addPatient,
};