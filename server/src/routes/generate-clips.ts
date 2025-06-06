// ---------------------------
// FILE: server/routes/generate-clips.ts
// ---------------------------
import express from 'express';
import { generateAudioClips } from '../utils/audioProcessor';
const router = express.Router();

router.post('/', async (req, res) => {
  try {
    await generateAudioClips(req.body);
    res.sendStatus(200);
  } catch (err) {
    res.status(500).send('Error generating clips');
  }
});

export default router;
