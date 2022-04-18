const { MessageEmbed, Permissions } = require('discord.js');
const { guildData, logger } = require('../shared.js');
const { getLocale } = require('../functions.js');
const { defaultLocale, defaultColor } = require('../settings.json');

module.exports = class MusicHandler {
	constructor(player) {
		this.player = player;
	}

	async disconnect() {
		const { bot } = require('../main.js');
		clearTimeout(this.player.timeout);
		clearTimeout(this.player.pauseTimeout);
		this.player.disconnect();
		bot.music.destroyPlayer(this.player.guildId);
		const voiceChannel = bot.guilds.cache.get(this.player.guildId).channels.cache.get(this.player.channelId);
		if (voiceChannel?.type === 'GUILD_STAGE_VOICE') {
			const permissions = bot.guilds.cache.get(this.player.guildId).channels.cache.get(this.player.channelId).permissionsFor(bot.user.id);
			if (!permissions.has(['VIEW_CHANNEL', 'CONNECT', 'SPEAK'])) return;
			if (!permissions.has(Permissions.STAGE_MODERATOR)) return;
			if (voiceChannel.stageInstance?.topic === getLocale(guildData.get(`${this.player.guildId}.locale`) ?? defaultLocale, 'MUSIC_STAGE_TOPIC')) {
				try {
					await voiceChannel.stageInstance.delete();
				}
				catch (err) {
					logger.error({ message: `${err.message}\n${err.stack}`, label: 'Quaver' });
				}
			}
		}
	}

	sendDataConstructor(data, embedExtras, error) {
		const sendData = {
			embeds: [
				new MessageEmbed()
					.setTitle(embedExtras?.title ?? '')
					.setDescription(data)
					.setFooter({ text: embedExtras?.footer ?? '' })
					.setThumbnail(embedExtras?.thumbnail ?? '')
					.setColor(error ? 'DARK_RED' : defaultColor),
				...embedExtras?.additionalEmbeds ?? [],
			],
		};
		if (embedExtras?.components) sendData.components = embedExtras.components;
		return sendData;
	}

	async send(data, embedExtras, error) {
		const { bot } = require('../main.js');
		const sendData = this.sendDataConstructor(data, embedExtras, error);
		const channel = this.player.queue.channel;
		if (!channel.permissionsFor(bot.user.id).has(['VIEW_CHANNEL', 'SEND_MESSAGES'])) {
			return false;
		}
		try {
			return await channel.send(sendData);
		}
		catch (err) {
			logger.error({ message: `${err.message}\n${err.stack}`, label: 'Quaver' });
			return false;
		}
	}

	locale(code, embedExtras, error, ...args) {
		const localizedString = getLocale(guildData.get(`${this.player.guildId}.locale`) ?? defaultLocale, code, ...args);
		return this.send(localizedString, embedExtras, error);
	}
};
