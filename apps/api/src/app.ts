import express from 'express';
import * as path from 'path';
import { db } from './db/db';
import { userProfiles } from './db/schema';
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
      const existingUser = await db.query.userProfiles.findFirst({
        where: eq(userProfiles.email, email),
      });

      if (!existingUser) {
        return res.status(200).json({ exists: false, user: null });
      }
      return res.status(200).json({ exists: true, user: existingUser });
    }

    // If no email provided or invalid, return all users
    const allUsers = await db.query.userProfiles.findMany();
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
  console.log("RECEIVING BODY", req.body)
  try {
    const { stackUserId, firstName, lastName, email, age, summary, headline, location, industry } = req.body;

    const newUser = {
      stackUserId,
      email,
      firstName,
      lastName,
      age,
      summary,
      headline,
      location,
      industry,
    };

    await db.insert(userProfiles).values(newUser);

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

app.get('/api/profile/:stackUserId', async (req, res) => {
  try {
    console.log(req.params.stackUserId);
    const profile = await db.query.userProfiles.findFirst({
      where: eq(userProfiles.stackUserId, req.params.stackUserId)
    });
    res.json(profile);

  } catch (error) {
    console.error(error) ;
  }
});


export default app;
