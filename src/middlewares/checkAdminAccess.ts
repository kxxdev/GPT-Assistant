import { Context, NextFunction } from 'grammy';

export default async function checkAdminAccess(
  ctx: Context,
  next: NextFunction
): Promise<void> {
  const tg_id = String(ctx.from?.id);

  if (!tg_id || tg_id != '600190229') {
    await ctx.reply('Отказано в доступе.');
    return;
  } else {
    await next();
  }
}
