"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const patientService_1 = __importDefault(require("../services/patientService"));
const toNewPatientEntry_1 = __importDefault(require("../utils/toNewPatientEntry"));
// import { NewPatientEntry } from '../types';
const router = express_1.default.Router();
router.get('/', (_req, res) => {
    res.send(patientService_1.default.getNonSensitivePatients());
});
router.get('/:id', (req, res) => {
    const patient = patientService_1.default.findById(req.params.id);
    if (patient) {
        res.send(patient);
    }
    else {
        res.sendStatus(404);
    }
});
router.post('/', (_req, res) => {
    try {
        const NewPatientEntry = (0, toNewPatientEntry_1.default)(_req.body);
        // const { name, dateOfBirth, gender, ssn, occupation } = _req.body;
        const addedPatient = patientService_1.default.addPatient(NewPatientEntry);
        res.json(addedPatient);
    }
    catch (error) {
        let errorMessage = 'Something went wrong.';
        if (error instanceof Error) {
            errorMessage += ' Error: ' + error.message;
        }
        res.status(400).send(errorMessage);
    }
});
exports.default = router;
