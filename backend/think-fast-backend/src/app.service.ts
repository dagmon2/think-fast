import { Injectable, HttpStatus } from '@nestjs/common';

@Injectable()
export class AppService {
  healthCheck() {
    return { message: 'healthy', statusCode: HttpStatus.OK };
  }
}
