import { Bot } from 'grammy';
import { CustomContext } from '../types/CustomContext';

export function setMyCommands(bot: Bot<CustomContext>) {
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
}
