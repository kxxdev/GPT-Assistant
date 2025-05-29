import { Composer } from 'grammy';
import { CustomContext } from '../types/CustomContext';
import { getGPTRole } from '../database/userService';
import { clearHistory } from '../database/messagesService';

const clearHistoryComposer = new Composer<CustomContext>();

clearHistoryComposer.command('clearhistory', async (ctx) => {
  const tg_id = String(ctx.from?.id);
  const gptRole = getGPTRole(tg_id);
  clearHistory(tg_id, gptRole);

  await ctx.reply('История диалога в текущей роли удалена!');
});

export { clearHistoryComposer };
