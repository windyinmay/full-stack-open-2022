"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const patientsEntries_1 = __importDefault(require("../../data/patientsEntries"));
// const patients: PatientEntry[] = patientsEntries as PatientEntry[];
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
const addPatient = () => {
    return null;
};
exports.default = {
    getPatients,
    addPatient,
    getNonSensitivePatients,
};
