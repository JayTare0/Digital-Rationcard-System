import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import dbPromise from './database.js';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '.env') });

console.log("GROQ KEY LOADED:", process.env.GROQ_API_KEY ? "YES ✅" : "NO ❌");
console.log("ADMIN EMAIL:", process.env.ADMIN_EMAIL ? "YES ✅" : "NO ❌");

const app = express();
const PORT = process.env.PORT || 3000;
const SALT_ROUNDS = 10;

app.use(cors({
    origin: [
        'https://digital-rationcard-system.vercel.app',
        'https://digital-ration-card.com',
        'http://localhost:5173',
        'http://localhost:3000'
    ]
}));
app.use(express.json());

// REGISTER
app.post('/api/users/register', async (req, res) => {
    const { username, email, password } = req.body;
    console.log('Register attempt:', { username, email, password: password ? 'PROVIDED' : 'MISSING' });
    const db = await dbPromise;

    if (!username || !email || !password) {
        return res.status(400).json({ error: 'Username, email and password are required' });
    }

    if (password.length < 6) {
        return res.status(400).json({ error: 'Password must be at least 6 characters' });
    }

    try {
        const existingUser = await db.get('SELECT * FROM users WHERE email = ?', [email]);
        if (existingUser) {
            return res.status(400).json({ error: 'User already exists with this email' });
        }

        const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

        const newUser = {
            id: Math.random().toString(36).substr(2, 9),
            username,
            email,
            password: hashedPassword,
            role: 'user',
            createdAt: new Date().toISOString()
        };

        await db.run(
            'INSERT INTO users (id, username, email, password, role, createdAt) VALUES (?, ?, ?, ?, ?, ?)',
            [newUser.id, newUser.username, newUser.email, newUser.password, newUser.role, newUser.createdAt]
        );

        const { password: _, ...safeUser } = newUser;
        res.json(safeUser);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// LOGIN
app.post('/api/users/login', async (req, res) => {
    const { email, password } = req.body;
    const db = await dbPromise;

    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
    }

    if (email === process.env.ADMIN_EMAIL) {
        const adminPasswordMatch = await bcrypt.compare(password, process.env.ADMIN_PASSWORD_HASH);
        if (!adminPasswordMatch) {
            return res.status(401).json({ error: 'Invalid admin credentials' });
        }
        return res.json({
            id: 'admin-1',
            username: 'SuperAdmin',
            email,
            role: 'admin',
            createdAt: new Date().toISOString()
        });
    }

    try {
        const user = await db.get('SELECT * FROM users WHERE email = ?', [email]);

        if (!user) {
            return res.status(404).json({ error: 'No account found with this email' });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ error: 'Incorrect password' });
        }

        const { password: _, ...safeUser } = user;
        res.json(safeUser);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// ADMIN CREATE USER
app.post('/api/users/create', async (req, res) => {
    const { username, email, role, password } = req.body;
    const db = await dbPromise;

    if (!username || !email || !password) {
        return res.status(400).json({ error: 'Username, email and password are required' });
    }

    try {
        const existingUser = await db.get('SELECT * FROM users WHERE email = ?', [email]);
        if (existingUser) {
            return res.status(400).json({ error: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

        const newUser = {
            id: Math.random().toString(36).substr(2, 9),
            username,
            email,
            password: hashedPassword,
            role: role || 'user',
            createdAt: new Date().toISOString()
        };

        await db.run(
            'INSERT INTO users (id, username, email, password, role, createdAt) VALUES (?, ?, ?, ?, ?, ?)',
            [newUser.id, newUser.username, newUser.email, newUser.password, newUser.role, newUser.createdAt]
        );

        const { password: _, ...safeUser } = newUser;
        res.json(safeUser);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// GET ALL USERS
app.get('/api/users', async (req, res) => {
    const db = await dbPromise;
    try {
        const users = await db.all('SELECT id, username, email, role, createdAt FROM users');
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// DELETE USER
app.delete('/api/users/:id', async (req, res) => {
    const { id } = req.params;
    const db = await dbPromise;
    try {
        await db.run('DELETE FROM users WHERE id = ?', [id]);
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// APPLICATIONS API
app.post('/api/applications', async (req, res) => {
    const data = req.body;
    const db = await dbPromise;

    const newCard = {
        ...data,
        id: Math.random().toString(36).substr(2, 9),
        cardNumber: 'RC' + Math.floor(10000000 + Math.random() * 90000000),
        status: 'Pending',
        appliedDate: new Date().toISOString()
    };

    try {
        await db.run(
            `INSERT INTO applications (
                id, userId, cardNumber, applicantName, fatherHusbandName, dob, gender,
                mobileNumber, email, aadharNumber, addressLine1, addressLine2, city,
                state, pincode, cardType, annualIncome, familyMembers, status, appliedDate
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                newCard.id, newCard.userId, newCard.cardNumber, newCard.applicantName,
                newCard.fatherHusbandName, newCard.dob, newCard.gender, newCard.mobileNumber,
                newCard.email, newCard.aadharNumber, newCard.addressLine1, newCard.addressLine2,
                newCard.city, newCard.state, newCard.pincode, newCard.cardType, newCard.annualIncome,
                JSON.stringify(newCard.familyMembers), newCard.status, newCard.appliedDate
            ]
        );
        res.json(newCard);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

app.get('/api/applications', async (req, res) => {
    const db = await dbPromise;
    try {
        const applications = await db.all('SELECT * FROM applications');
        const parsedApplications = applications.map(app => ({
            ...app,
            familyMembers: JSON.parse(app.familyMembers || '[]')
        }));
        res.json(parsedApplications);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/api/applications/user/:userId', async (req, res) => {
    const { userId } = req.params;
    const db = await dbPromise;
    try {
        const applications = await db.all('SELECT * FROM applications WHERE userId = ?', [userId]);
        const parsedApplications = applications.map(app => ({
            ...app,
            familyMembers: JSON.parse(app.familyMembers || '[]')
        }));
        res.json(parsedApplications);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/api/applications/aadhar/:aadhar', async (req, res) => {
    const { aadhar } = req.params;
    const db = await dbPromise;
    try {
        const application = await db.get(
            'SELECT * FROM applications WHERE aadharNumber = ? OR cardNumber = ?',
            [aadhar, aadhar]
        );
        if (application) {
            application.familyMembers = JSON.parse(application.familyMembers || '[]');
        }
        res.json(application || null);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.put('/api/applications/:id/status', async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    const db = await dbPromise;
    try {
        await db.run('UPDATE applications SET status = ?, approvedDate = ? WHERE id = ?', [
            status,
            status === 'Approved' ? new Date().toISOString() : null,
            id
        ]);
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// AI SERVICE — Groq ✅
app.post('/api/ai', async (req, res) => {
    const { query } = req.body;
    const API_KEY = process.env.GROQ_API_KEY;

    if (!API_KEY) {
        return res.status(500).json({ error: 'Groq API Key not configured on server' });
    }

    try {
        const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${API_KEY}`
            },
            body: JSON.stringify({
                model: 'llama-3.3-70b-versatile',
                messages: [{
                    role: 'user',
                    content: `You are a helpful assistant for the Digital Ration Card System.
                    Answer questions about ration cards, eligibility, and application status concisely.
                    Do not answer questions unrelated to the ration card system.
                    User Question: ${query}`
                }],
                max_tokens: 500
            })
        });

        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.error?.message || 'Groq API error');
        }
        res.json({ response: data.choices[0].message.content });
    } catch (error) {
        console.error('AI Error:', error);
        res.status(500).json({ error: 'Failed to generate response' });
    }
});

app.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
});