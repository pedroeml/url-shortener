import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { UrlShortenerService } from './url-shortener.service';
import { CreateUrlShortenerDto } from './dto/create-url-shortener.dto';

@Controller('url-shortener')
export class UrlShortenerController {
  constructor(private readonly urlShortenerService: UrlShortenerService) {}

  @Post()
  create(@Body() createUrlShortenerDto: CreateUrlShortenerDto) {
    return this.urlShortenerService.create(createUrlShortenerDto);
  }

  @Get()
  findOne(@Query() query) {
    console.log('query', query);
    return this.urlShortenerService.findOne(query.url);
  }

  @Get('/top-100')
  findTop100() {
    return this.urlShortenerService.findTop100();
  }
}
