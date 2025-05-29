import { Bot } from 'grammy';
import 'dotenv/config';
import { CustomContext } from './types/CustomContext';
import { startComposer } from './commands/start';
import { roleComposer } from './commands/role';
import { clearHistoryComposer } from './commands/clearhistory';
import { messageHandler } from './handlers/message';

const bot = new Bot<CustomContext>(process.env.TELEGRAM_TOKEN || '');

bot.use(startComposer);
bot.use(roleComposer);
bot.use(clearHistoryComposer);
bot.use(messageHandler);

bot.start();

console.log('BOT START!');
