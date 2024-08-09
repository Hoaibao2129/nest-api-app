import { Injectable, Logger, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleDestroy {
    private readonly logger = new Logger(PrismaService.name);

    constructor() {
        super();
    }

    async onModuleInit() {
        this.logger.log('Prisma service init');
        await this.$connect();
        this.logger.log('Prisma service init success');
    }

    async onModuleDestroy() {
        await this.$disconnect();
        this.logger.log('Prisma service destroyed');
    }
}
