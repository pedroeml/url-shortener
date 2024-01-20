import { Module } from '@nestjs/common';
import { UrlShortenerService } from './url-shortener.service';
import { UrlShortenerController } from './url-shortener.controller';
import { PrismaService } from '../database/prisma.service';
import { UrlShortenerRepository } from './repository/url-shortener.repository';
import { PrismaUrlShortenerRepository } from './repository/prisma/prisma-url-shortener.prisma';

@Module({
  controllers: [UrlShortenerController],
  providers: [
    UrlShortenerService,
    PrismaService,
    {
      provide: UrlShortenerRepository,
      useClass: PrismaUrlShortenerRepository,
    },
  ],
})
export class UrlShortenerModule {}
