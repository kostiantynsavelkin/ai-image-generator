import { Module, Logger } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import { Image } from './images.entity'
import { ImageService } from './images.service';
import { ImageController } from './images.controller';
@Module({
  imports: [TypeOrmModule.forFeature([Image]), ConfigModule.forRoot()],
  providers: [ImageService, Logger],
  controllers: [ImageController],
  exports: [ImageService, Logger],
})
export class ImageModule {}
