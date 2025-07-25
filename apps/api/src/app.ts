import express from 'express';
import * as path from 'path';
import { db } from './db/db';
import { users } from './db/schema';
import cors from 'cors';

const app = express();

app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.use(cors());

app.use(express.json());

app.get('/api', (req, res) => {
  res.send({ message: 'Welcome to api!' });
});

app.get('/api/health', (req, res) => {
  try {
    res.status(200).json({ status: 'OK' });
  } catch (error: unknown) {
    let message = 'Unknown error';
    if (error instanceof Error) {
      message = error.message;
    }

    res.status(500).json({ status: 'error', db: 'disconnected', error: message })
  }
});

app.get('/api/users', async (req, res) => {
  try {
    const allUsers = await db.select().from(users);
    console.log(allUsers)

    res.status(200).json(allUsers);
  } catch (error: unknown) {
    let message = 'Unknown error';
    if (error instanceof Error) {
      message = error.message
    }

    res.status(500).json({ error: 'Failed to fetch all users', details: message })
  }
});

app.post('/api/users', async (req, res) => {
  try {
    console.log("RECEIVING BODY", req.body)
    const { name, email }= req.body;
    
    const newUser = {
      name,
      email,
    };

    await db.insert(users).values(newUser);

    res.status(201).json(newUser); 
  } catch (error: unknown) {
    console.error('Full error object:', error);
    let message = 'Unknkown error';
    if (error instanceof Error) {
      message = error.message
    }

    res.status(500).json({ error: message })
  }
});

export default app;