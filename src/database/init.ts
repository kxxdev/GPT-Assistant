import Database from 'better-sqlite3';
import path from 'path';
import { Roles } from '../types/types';

const db = new Database(path.resolve(__dirname, 'database.db'));

try {
  db.exec(`ALTER TABLE users ADD COLUMN is_approved INTEGER DEFAULT 0`);
} catch (e) {}

db.exec(`
	CREATE TABLE IF NOT EXISTS users (
		tg_id TEXT PRIMARY KEY,
		is_approved BOOLEAN DEFAULT 0,
		total_tokens INTEGER DEFAULT 0,
		gpt_role TEXT DEFAULT '${Roles.Default}',
		created_at TEXT DEFAULT CURRENT_TIMESTAMP,
		updated_at TEXT DEFAULT CURRENT_TIMESTAMP
	)
`);

db.exec(`
	CREATE TABLE IF NOT EXISTS messages (
		id INTEGER PRIMARY KEY AUTOINCREMENT,
		tg_id TEXT,
		role TEXT,
		gpt_role TEXT DEFAULT '${Roles.Default}',
		content TEXT,
		timestamp TEXT DEFAULT CURRENT_TIMESTAMP,
		FOREIGN KEY(tg_id) REFERENCES users(tg_id)
	)	
`);

export default db;
