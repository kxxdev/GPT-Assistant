import { Composer, Context } from 'grammy';
import { createUser, getGPTRole, updateTokens } from '../database/userService';
import { addMessage, getHistory } from '../database/messagesService';
import { ChatCompletionMessageParam } from 'openai/resources/chat';
import { formattingPrompt, RoleInfo, Roles } from '../types/types';
import { gptText } from '../openai/openai';

export const messageHandler = new Composer();

messageHandler.on('message', async (ctx: Context) => {
  const tg_id = String(ctx.from?.id);
  const userMessage = ctx.message?.text;

  if (!userMessage)
    return await ctx.reply(
      'Для обращения ко мне отправляйте запросы с текстом.'
    );

  createUser(tg_id);

  const gptRole = getGPTRole(tg_id);
  const history = getHistory(tg_id, gptRole);

  const messages: ChatCompletionMessageParam[] = [
    { role: Roles.System, content: formattingPrompt },
    { role: Roles.System, content: RoleInfo[gptRole].prompt },
    ...history,
    { role: Roles.User, content: userMessage },
  ];

  const response = await gptText(messages);

  try {
    await ctx.reply(response.text, { parse_mode: 'HTML' });

    addMessage({
      tg_id,
      gpt_role: gptRole,
      role: Roles.User,
      content: userMessage,
    });

    addMessage({
      tg_id,
      gpt_role: gptRole,
      role: Roles.Assistant,
      content: response.text,
    });

    const usedTokens = response.usageTokens;

    updateTokens(tg_id, usedTokens);
  } catch (error) {
    console.log(error);
    ctx.reply(
      'Ой-ой, кажется я сильно перестарался с ответом, попробуйте еще раз задать вопрос..'
    );
  }
});
