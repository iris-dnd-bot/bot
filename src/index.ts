import '@sapphire/plugin-editable-commands';
import * as SFramework from '@sapphire/framework';
import * as constants from '@iris/utils/constants.js';
import { getEnv } from '@iris/utils/env.js';

const client = new SFramework.SapphireClient(constants.CLIENT_OPTIONS);

await client.login(getEnv().DISCORD_TOKEN);
