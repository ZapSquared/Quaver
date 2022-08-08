import { logger } from '#lib/util/common.js';

export default {
	name: 'error',
	once: false,
	/** @param {Error} err */
	execute(err) {
		logger.error({ message: `${err.message}\n${err.stack}`, label: 'Quaver' });
	},
};
