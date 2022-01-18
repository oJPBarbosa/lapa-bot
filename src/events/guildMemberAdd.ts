import { GuildMember, Role } from 'discord.js';

export = {
  name: 'guildMemberAdd',
  execute(member: GuildMember): void {
    member.guild.roles.cache.find(
      (role: Role) => role.id === '774645863514374154'
    );

    member.roles.add('774645863514374154');
  }
};
