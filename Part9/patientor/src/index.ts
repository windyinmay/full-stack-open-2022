import express from 'express';
import cors from 'cors';
import patientRouter from './routes/patients';

const app = express();
app.use(express.json());
app.use(cors());

app.get('/ping', (_req, res) => {
	console.log('someone pinged here');
	res.send('pong');
});
app.use('/api/patients', patientRouter);
const PORT = 3001;
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
