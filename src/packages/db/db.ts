import { PrismaClient } from '@prisma/client';
import { Users } from './models/users.js';
import { Guilds } from './models/guilds.js';
const prismaC = new PrismaClient();

export class Db {
    $prisma = prismaC;
    guilds = new Guilds(this);
    users = new Users(this);

    static async connect() {
        return prismaC.$connect();
    }
}

export const prisma = new Db();
