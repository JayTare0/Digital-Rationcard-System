import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbPromise = open({
  filename: path.join(__dirname, 'database.sqlite'),
  driver: sqlite3.Database
});

async function initDB() {
  const db = await dbPromise;
  await db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      username TEXT,
      email TEXT UNIQUE,
      password TEXT,
      role TEXT,
      createdAt TEXT
    );

    CREATE TABLE IF NOT EXISTS applications (
      id TEXT PRIMARY KEY,
      userId TEXT,
      cardNumber TEXT,
      applicantName TEXT,
      fatherHusbandName TEXT,
      dob TEXT,
      gender TEXT,
      mobileNumber TEXT,
      email TEXT,
      aadharNumber TEXT,
      addressLine1 TEXT,
      addressLine2 TEXT,
      city TEXT,
      state TEXT,
      pincode TEXT,
      cardType TEXT,
      annualIncome REAL,
      familyMembers TEXT,
      status TEXT,
      appliedDate TEXT,
      approvedDate TEXT,
      FOREIGN KEY(userId) REFERENCES users(id)
    );
  `);

  // ✅ Add password column if it doesn't exist (for existing databases)
  try {
    await db.exec(`ALTER TABLE users ADD COLUMN password TEXT`);
    console.log('✅ Password column added to users table');
  } catch (e) {
    // Column already exists, ignore error
  }

  console.log('Database initialized');
}

initDB();

export default dbPromise;