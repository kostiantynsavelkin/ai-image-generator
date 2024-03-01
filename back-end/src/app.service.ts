import { Injectable, OnModuleInit } from '@nestjs/common';
@Injectable()
export class AppService implements OnModuleInit {
  constructor(
  ) {}

  onModuleInit() {
  }

  async getHello(): Promise<string> {
    return 'Hello World!';
  }
}
