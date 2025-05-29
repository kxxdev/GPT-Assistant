import { Composer } from 'grammy';
import { createUser } from '../database/userService';
import { CustomContext } from '../types/CustomContext';

const startComposer = new Composer<CustomContext>();

startComposer.command('start', async (ctx) => {
  createUser(String(ctx.from?.id));
  await ctx.reply('Добро пожаловать, я буду твоим личным ассистентом!');
});

export { startComposer };
