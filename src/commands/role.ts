import { Composer } from 'grammy';
import { setUserRole } from '../database/userService';
import { CustomContext } from '../types/CustomContext';
import { RoleInfo, Roles } from '../types/types';

const roleComposer = new Composer<CustomContext>();

roleComposer.command(Object.values(Roles), async (ctx) => {
  const tg_id = String(ctx.from?.id);
  const role = (ctx.message?.text.slice(1) as Roles) || Roles.Default;

  setUserRole(tg_id, role);

  await ctx.reply(
    `Добро пожаловать, я буду твоим ${RoleInfo[role].description}!`
  );
});

export { roleComposer };
