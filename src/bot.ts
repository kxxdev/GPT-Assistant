import { Bot, GrammyError, HttpError } from 'grammy';
import 'dotenv/config';
import { CustomContext } from './types/CustomContext';
import { startComposer } from './commands/start';
import { roleComposer } from './commands/role';
import { messageHandler } from './handlers/message';
import { clearHistoryComposer } from './commands/clearhistory';
import checkAccess from './middlewares/checkAccess';

if (!process.env.TELEGRAM_TOKEN) {
  throw new Error('TELEGRAM_TOKEN is not defined in environment variables');
}

const bot = new Bot<CustomContext>(process.env.TELEGRAM_TOKEN);

bot.api.setMyCommands([
  {
    command: 'start',
    description: 'Перезапуск бота',
  },
  {
    command: 'clearhistory',
    description: 'Очистить историю сообщений текущей роли',
  },
  {
    command: 'assistant',
    description: 'Роль ассистента',
  },
  {
    command: 'therapist',
    description: 'Роль психотерапевта',
  },
  {
    command: 'coach',
    description: 'Роль наставника',
  },
  {
    command: 'planner',
    description: 'Роль планировщика',
  },
]);

bot.use(checkAccess, startComposer);
bot.use(checkAccess, roleComposer);
bot.use(checkAccess, clearHistoryComposer);
bot.use(checkAccess, messageHandler);

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
