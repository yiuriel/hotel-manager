import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): object {
    console.log('Hello World! mf');

    return { message: 'Hello World!' };
  }
}
