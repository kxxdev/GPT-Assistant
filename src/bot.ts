import { Bot, GrammyError, HttpError } from 'grammy';
import 'dotenv/config';
import { CustomContext } from './types/CustomContext';
import { startComposer } from './commands/start';
import { roleComposer } from './commands/role';
import { messageHandler } from './handlers/message';
import { clearHistoryComposer } from './commands/clearhistory';
import { setMyCommands } from './commands/init';
import checkAccess from './middlewares/checkUserAccess';
import checkAdminAccess from './middlewares/checkAdminAccess';
import { addAccess } from './commands/addaccess';

if (!process.env.TELEGRAM_TOKEN) {
  throw new Error('TELEGRAM_TOKEN is not defined in environment variables');
}

const bot = new Bot<CustomContext>(process.env.TELEGRAM_TOKEN);

setMyCommands(bot);

bot.use(checkAccess);

bot.use(startComposer);
bot.use(roleComposer);
bot.use(clearHistoryComposer);
bot.use(messageHandler);

bot.use(checkAdminAccess, addAccess);

bot.catch((err) => {
  const ctx = err.ctx;
  console.error(`Error while handling update ${ctx.update.update_id}`);
  const e = err.error;

  if (e instanceof GrammyError) {
    console.error('Error in request:', e.description);
  } else if (e instanceof HttpError) {
    console.error('Could not contact Telegram:', e);
  } else {
    console.error('Unknown error:', e);
  }
});

bot.start();

console.log('BOT START!');
