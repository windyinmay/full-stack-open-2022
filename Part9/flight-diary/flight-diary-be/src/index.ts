import express from 'express';
import cors from 'cors';

const app = express();
import diaryRouter from './routes/diaries';

// Add a list of allowed origins.
// If you have more origins you would like to add, you can add them to the array below.
// const allowedOrigins = ['http://localhost:3003'];

// const options: cors.CorsOptions = {
// 	origin: allowedOrigins,
// };

// Then pass these options to cors:
// app.use(cors(options));
app.use(cors());
app.use(express.json());

const PORT = 3003;

app.get('/api/ping', (_req, res) => {
	console.log('someone pinged here');
	res.send('pong');
});

app.use('/api/diaries', diaryRouter);

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
