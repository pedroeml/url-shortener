import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UrlShortenerModule } from './url-shortener/url-shortener.module';
import { PrismaService } from './database/prisma.service';

@Module({
  imports: [UrlShortenerModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
