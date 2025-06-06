// ---------------------------
// FILE: client/src/App.tsx
// ---------------------------
import React, { useState } from 'react';
import {
  Container, Tabs, Tab, List, ListItem, ListItemIcon, ListItemText,
  Checkbox, Button, CircularProgress, Typography, Box, Paper
} from '@mui/material';
import songs from './data/songs.json';
import series from './data/series.json';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

function App() {
  const [tab, setTab] = useState(0);
  const [selected, setSelected] = useState<any[]>([]);
  const [loading, setLoading] = useState<string | null>(null);

  const list = tab === 0 ? songs : series;

  const toggle = (item: any) => {
    setSelected(prev =>
      prev.find(i => i.title === item.title)
        ? prev.filter(i => i.title !== item.title)
        : [...prev, item]
    );
  };

  const post = async (path: string, expectFile = false) => {
    setLoading(path);
    try {
      const res = await fetch(`${API_BASE}/${path}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(selected),
      });
      if (expectFile) {
        const blob = await res.blob();
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = path === 'generate-pdf' ? 'blindtest.pdf' : 'blindtest_audio.zip';
        a.click();
      }
    } finally {
      setLoading(null);
    }
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4">🎧 Blind Test Années 80</Typography>
      <Tabs value={tab} onChange={(_, val) => setTab(val)} centered>
        <Tab label="🎵 Chansons" /><Tab label="📺 Séries" />
      </Tabs>
      <Paper sx={{ mt: 2, maxHeight: 400, overflow: 'auto' }}>
        <List>
          {list.map((item: any) => (
            <ListItem key={item.title} onClick={() => toggle(item)} button>
              <ListItemIcon><Checkbox checked={selected.includes(item)} /></ListItemIcon>
              <ListItemText primary={item.title + (item.artist ? ' - ' + item.artist : '')} secondary={item.anecdote} />
            </ListItem>
          ))}
        </List>
      </Paper>
      <Box mt={2} display="flex" gap={2} alignItems="center">
        <Button onClick={() => post('generate-clips')}>🎬 Générer</Button>
        <Button onClick={() => post('generate-pdf', true)}>📄 PDF</Button>
        <Button onClick={() => post('download-zip', true)}>🗜️ ZIP</Button>
        {loading && (<CircularProgress size={24} />)}
      </Box>
    </Container>
  );
}

export default App;
