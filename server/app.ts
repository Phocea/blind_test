// ---------------------------
// FILE: server/app.ts
// ---------------------------
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import clips from './routes/generate-clips';
import pdf from './routes/generate-pdf';
import zip from './routes/download-zip';

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/api/generate-clips', clips);
app.use('/api/generate-pdf', pdf);
app.use('/api/download-zip', zip);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
