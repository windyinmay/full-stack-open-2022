"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
const patientsEntries_1 = __importDefault(require("../../data/patientsEntries"));
// const patients: PatientEntry[] = patientsEntries as PatientEntry[];
// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const getPatients = () => {
    return patientsEntries_1.default;
};
const getNonSensitivePatients = () => {
    return patientsEntries_1.default.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation,
    }));
};
const findById = (id) => {
    const entry = patientsEntries_1.default.find((p) => p.id === id);
    return entry;
};
const addPatient = (entry) => {
    const newPatientEntry = Object.assign({ 
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
        id: (0, uuid_1.v4)() }, entry);
    patientsEntries_1.default.push(newPatientEntry);
    return newPatientEntry;
};
exports.default = {
    getPatients,
    addPatient,
    getNonSensitivePatients,
    findById,
};
