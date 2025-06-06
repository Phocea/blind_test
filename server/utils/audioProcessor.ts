// ---------------------------
// FILE: server/utils/audioProcessor.ts
// ---------------------------
import fs from 'fs';
import path from 'path';
import { exec } from 'child_process';

export async function generateAudioClips(tracks: any[]) {
  const outDir = path.join(__dirname, '../output');
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir);

  for (let track of tracks) {
    const outFile = path.join(outDir, `${track.title.replace(/\s+/g, '_')}.mp3`);
    const command = `ffmpeg -y -ss 00:00:10 -i "$(yt-dlp -f bestaudio -g '${track.url}')" -t 45 -acodec libmp3lame "${outFile}"`;
    await new Promise((resolve, reject) => exec(command, err => err ? reject(err) : resolve(null)));
  }

  const zipCmd = `zip -j ${path.join(outDir, 'audio_clips.zip')} ${outDir}/*.mp3`;
  await new Promise((resolve, reject) => exec(zipCmd, err => err ? reject(err) : resolve(null)));
}
