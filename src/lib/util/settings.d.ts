import type { ColorResolvable } from 'discord.js';

export type SettingsObject = {
	token?: string;
	applicationId?: string;
	clientSecret?: string;
	colors?: ColorsSettingsObject;
	defaultLocaleCode?: string;
	managers?: string[];
	database?: DatabaseSettingsObject;
	lavalink?: LavalinkSettingsObject;
	features?: FeaturesSettingsObject;
};

export type ColorsSettingsObject = {
    success?: ColorResolvable;
    neutral?: ColorResolvable;
    warning?: ColorResolvable;
    error?: ColorResolvable;
};

export type DatabaseSettingsObject = {
    protocol?: string;
    path?: string;
};

export type LavalinkSettingsObject = {
    host?: string;
    port?: number;
    password?: string;
    secure?: boolean;
    reconnect?: LavalinkReconnectSettingsObject;
};

export type LavalinkReconnectSettingsObject = {
    delay?: number;
    tries?: number;
};

export type FeaturesSettingsObject = {
    stay?: StayFeatureSettingsObject;
    spotify?: SpotifyFeatureSettingsObject;
    web?: WebFeatureSettingsObject;
};

export type StayFeatureSettingsObject = {
    enabled?: boolean;
    whitelist?: boolean;
};

export type SpotifyFeatureSettingsObject = {
    enabled?: boolean;
    client_id?: string;
    client_secret?: string;
};

export type WebFeatureSettingsObject = {
    enabled?: boolean;
    port?: number;
    allowedOrigins?: string[];
    encryptionKey?: string;
    https?: WebFeatureHttpsSettingsObject;
};

export type WebFeatureHttpsSettingsObject = {
    key?: string;
    cert?: string;
};
