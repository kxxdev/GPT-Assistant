import { Context, NextFunction } from 'grammy';
import { checkApproved, createUser } from '../database/userService';

export default async function checkAccess(
  ctx: Context,
  next: NextFunction
): Promise<void> {
  const tg_id = String(ctx.from?.id);
  createUser(tg_id);
  const is_approved = checkApproved(tg_id);

  if (!tg_id || (!is_approved && tg_id != '600190229')) {
    await ctx.reply('Отказано в доступе.');
    return;
  } else {
    await next();
  }
}
