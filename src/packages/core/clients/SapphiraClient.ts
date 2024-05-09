import { Client } from 'discord.js';
import { CLIENT_OPTIONS } from '../../utils/constants.js';

export class SapphiraClient extends Client {
  constructor() {
    super(CLIENT_OPTIONS);
  }
}
