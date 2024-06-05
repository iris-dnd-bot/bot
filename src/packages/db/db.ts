import { PrismaClient } from '@prisma/client';
import { Users } from './models/users.js';
import { Guilds } from './models/guilds.js';
const prisma = new PrismaClient();

export class Db {
    $prisma = prisma;
    guilds = new Guilds(this);
    users = new Users(this);

    async connect() {
        return prisma.$connect();
    }
}
