import { ChatCompletionMessageParam } from 'openai/resources/chat';
import { Roles } from '../types/types';
import db from './init';

export function addMessage({
  tg_id,
  role,
  gpt_role,
  content,
}: {
  tg_id: string;
  role: Roles;
  gpt_role: string;
  content: string;
}) {
  db.prepare(
    `
		INSERT INTO messages (tg_id, role, gpt_role, content)
		VALUES (?, ?, ?, ?)	
	`
  ).run(tg_id, role, gpt_role, content);
}

export function getHistory(
  tg_id: string,
  gpt_role: Roles
): ChatCompletionMessageParam[] {
  return db
    .prepare(
      `
		SELECT role, content FROM messages
		WHERE tg_id = ? AND gpt_role = ?
		ORDER BY timestamp ASC
	`
    )
    .all(tg_id, gpt_role) as ChatCompletionMessageParam[];
}

export function clearHistory(tg_id: string, gptRole: string) {
  db.prepare('DELETE FROM messages WHERE tg_id = ? AND gpt_role = ?').run(
    tg_id,
    gptRole
  );
}
