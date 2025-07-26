import express from 'express';
import * as path from 'path';
import { db } from './db/db';
import { users } from './db/schema';
import cors from 'cors';
import { eq } from 'drizzle-orm';

const app = express();

app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.use(cors());

app.use(express.json());

app.get('/api', (req, res) => {
  console.log(req);
  res.send({ message: 'Welcome to api!' });
});

app.get('/api/health', (req, res) => {
  try {
    console.log(req);
    res.status(200).json({ status: 'OK' });
  } catch (error: unknown) {
    let message = 'Unknown error';
    if (error instanceof Error) {
      message = error.message;
    }

    res.status(500).json({ status: 'error', db: 'disconnected', error: message })
  }
});

app.get('/api/users/exists', async (req, res) => {
  try {
    const { email } = req.query;
    console.log(email);

    // Type guard for email parameter
    if (typeof email === 'string' && email.trim()) {
      const existingUser = await db.query.users.findFirst({
        where: eq(users.email, email),
      });

      if (!existingUser) {
        return res.status(200).json({ exists: false, message: 'User not found' });
      }
      return res.status(200).json({ exists: true, user: existingUser });
    }

    // If no email provided or invalid, return all users
    const allUsers = await db.query.users.findMany();
    return res.status(200).json(allUsers);
  } catch (error: unknown) {
    let message = 'Unknown error';
    if (error instanceof Error) {
      message = error.message;
    }
    return res.status(500).json({ error: 'Failed to fetch users', details: message });
  }
});

app.post('/api/users', async (req, res) => {
  try {
    console.log("RECEIVING BODY", req.body)
    const { name, email, age } = req.body;

    const newUser = {
      name,
      email,
      age,
    };

    await db.insert(users).values(newUser);

    res.status(201).json({ success: true, user: newUser });
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
