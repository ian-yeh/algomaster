import express from 'express';
import * as path from 'path';
import { db } from './db/db';
import { users } from './db/schema';

const app = express();

app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.get('/api', (req, res) => {
  res.send({ message: 'Welcome to api!' });
});

app.post('/api/users', async (req, res) => {
  try {
    const { name, email, age }: { name?: string; email?: string; age?: number } = req.body;
    
    // Basic validation
    if (!name || !email) {
      return res.status(400).json({ 
        error: 'Name and email are required' 
      });
    }

    const newUser = await db.insert(users).values({
      name,
      email,
      age: age || null,
    }).returning();

    res.status(201).json({
      success: true,
      message: 'User created successfully',
      user: newUser[0]
    });

    return;
  } catch (error: any) {
    console.error('Error creating user:', error);
    
    // Handle duplicate email error
    if (error.message?.includes('duplicate key') || error.code === '23505') {
      return res.status(409).json({
        error: 'Email already exists'
      });
    }
    
    res.status(500).json({
      error: 'Internal server error'
    });

    return;
  }
});

const port = process.env.PORT || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});

server.on('error', console.error);