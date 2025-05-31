import { Roles } from '../types/types';
import db from './init';

interface UserData {
  tg_id: string;
  total_tokens: number;
  gpt_role: Roles;
  created_at: string;
  updated_at: string;
}

export function getUser(tg_id: string): UserData | null {
  const row = db.prepare('SELECT * FROM users WHERE tg_id = ?').get(tg_id);
  if (!row) return null;
  return row as UserData;
}

export function createUser(tg_id: string): void {
  db.prepare(
    `
		INSERT OR IGNORE INTO users (tg_id)
		VALUES (?)	
	`
  ).run(tg_id);
}

export function updateTokens(tg_id: string, tokens: number) {
  db.prepare(
    `
		UPDATE users SET total_tokens = total_tokens + ?, updated_at = CURRENT_TIMESTAMP
		WHERE tg_id = ?	
	`
  ).run(tokens, tg_id);
}

export function setUserRole(tg_id: string, role: string) {
  db.prepare(
    `
		UPDATE users SET gpt_role = ? 
		WHERE tg_id = ?
		`
  ).run(role, tg_id);
}

export function getGPTRole(tg_id: string): Roles {
  const row = db
    .prepare(
      `
    SELECT gpt_role FROM users
    WHERE tg_id = ?
  `
    )
    .get(tg_id) as { gpt_role?: string } | undefined;

  return (row?.gpt_role ?? Roles.Default) as Roles;
}

export function giveUserAccess(tg_id: string): void {
  db.prepare(
    `
    UPDATE users SET is_approved = 1
    WHERE tg_id = ?
    `
  ).run(tg_id);
}

export function checkApproved(tg_id: string): boolean {
  const row = db
    .prepare(
      `SELECT is_approved FROM users
    WHERE tg_id = ?`
    )
    .get(tg_id) as { is_approved: boolean };

  return row.is_approved;
}
