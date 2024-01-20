import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../database/prisma.service';
import { CreateUrlShortenerDto } from '../../dto/create-url-shortener.dto';
import { UrlShortenerRepository } from '../url-shortener.repository';

@Injectable()
export class PrismaUrlShortenerRepository implements UrlShortenerRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(data: CreateUrlShortenerDto) {
    return await this.prismaService.shortUrl.create({
      data: {
        url: data.url,
        shortUrl: data.shortUrl,
      },
    });
  }

  async findOne(url: string) {
    const rows = await this.prismaService.shortUrl.findUnique({
      where: {
        url,
      },
    });

    if (rows) {
      await this.update(url);
    }

    return rows;
  }

  async findOneByShortUrl(shortUrl: string) {
    const row = await this.prismaService.shortUrl.findUnique({
      where: {
        shortUrl,
      },
    });

    if (row) {
      await this.update(row.url);
    }

    return row;
  }

  async update(url: string) {
    return await this.prismaService.shortUrl.update({
      where: {
        url,
      },
      data: {
        hits: {
          increment: 1,
        },
      },
    });
  }

  async findTop100() {
    return await this.prismaService.shortUrl.findMany({
      take: 100,
      orderBy: {
        hits: 'desc',
      },
    });
  }
}
