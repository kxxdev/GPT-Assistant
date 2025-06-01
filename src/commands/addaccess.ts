import { Composer } from 'grammy';
import { CustomContext } from '../types/CustomContext';
import { createUser, giveUserAccess } from '../database/userService';

const addAccess = new Composer<CustomContext>();

addAccess.command('addaccess', async (ctx) => {
  if (!ctx.match) {
    return await ctx.reply('Вы не указали айди пользователя в команде');
  }
  const tg_id = String(ctx.match);

  createUser(tg_id);
  giveUserAccess(tg_id);

  await ctx.reply(
    `Доступ пользователю с id <code>${tg_id}</code> предоставлен.`,
    { parse_mode: 'HTML' }
  );
});

export { addAccess };
