import { Injectable } from '@nestjs/common';
import { CreateUrlShortenerDto } from './dto/create-url-shortener.dto';
import { UrlShortenerRepository } from './repository/url-shortener.repository';
import { createHash } from 'crypto';
import * as http from 'http';

@Injectable()
export class UrlShortenerService {
  constructor(
    private readonly urlShortenerRepository: UrlShortenerRepository,
  ) {}

  create({ url }: CreateUrlShortenerDto) {
    const hash = createHash('sha256').update(url).digest('hex');
    this.pullTitleFromUrl(url);
    return this.urlShortenerRepository.create({
      url,
      shortUrl: `http://localhost:3000/${hash}`,
    });
  }

  findOne(url: string) {
    if (url.startsWith('http://localhost:3000/')) {
      return this.urlShortenerRepository.findOneByShortUrl(url);
    }

    return this.urlShortenerRepository.findOne(url);
  }

  findTop100() {
    return this.urlShortenerRepository.findTop100();
  }

  private pullTitleFromUrl(url: string) {
    const options = {
      host: url.replace('https://', '').replace('http://', ''),
      port: 443,
      path: '/',
    };

    let content = '';

    http.request(options, function (res) {
      console.log('REQUEST MADE', res);
      res.setEncoding('utf8');
      res.on('data', function (chunk) {
        content += chunk;
      });

      res.on('end', function () {
        console.log('RES', content);
        const re = new RegExp('<title>(.*?)</title>');
        const titleRe = re.exec(content);
        console.log('title=>', titleRe[1]);
      });
    });
  }
}
