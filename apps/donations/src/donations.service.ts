import { Injectable } from '@nestjs/common';

@Injectable()
export class DonationsService {
  getHello(): string {
    return 'Hello World!';
  }
}
