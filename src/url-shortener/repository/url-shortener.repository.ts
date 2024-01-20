import { CreateUrlShortenerDto } from '../dto/create-url-shortener.dto';

export abstract class UrlShortenerRepository {
  abstract create(data: CreateUrlShortenerDto);
  abstract findOne(url: string);
  abstract findOneByShortUrl(shortUrl: string);
  abstract update(url: string);
  abstract findTop100();
}
