import {
  Controller,
  Param,
  Post,
  Get,
  Delete,
  Body,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { Image } from './images.entity';
import { ImageService } from './images.service';
import { ConfigService } from '@nestjs/config';

@Controller('images')
export class ImageController {
  constructor(
    private readonly imagesService: ImageService,
    private readonly configService: ConfigService,
  ) { }

  // Create a new images
  // POST /images/create
  @Post('create')
  async create(@Body() images: Image): Promise<Image> {
    return this.imagesService.create(images);
  }

  // Generate a new images
  // POST /images/generate
  @Post('generate')
  async generateImage(@Body('keyword') keyword: string): Promise<Image[]> {
    return this.imagesService.generate(keyword, true, 3);
  }

  // Generate a new images
  // POST /images/prompt
  @Post('prompt')
  async generateByPrompt(@Body('keyword') keyword: string): Promise<Image[]> {
    return this.imagesService.generate(keyword, false, 1);
  }

  // Generate a new images for Roblox shirt
  // POST /images/text
  @Post('text')
  async generateRobloxClothes(@Body('prompt') prompt: string): Promise<any> {
    const type = await this.imagesService.extractParamsFromPrompt(prompt);
    const shirtImage = await this.imagesService.generateRobloxAssets(prompt, type, true);
    const pantsImage = await this.imagesService.generateRobloxAssets(prompt, type, false, shirtImage.randomIndex);

    return {
      shirtImage: shirtImage.newImage, pantsImage: pantsImage.newImage
    }
  }

  // Generate a new images for Roblox shirt
  // POST /images/variation
  @Post('variation')
  async generateByVariation(): Promise<string> {
    return this.imagesService.variation();
  }

  // Extract parameter from user prompt
  // POST /images/extract
  @Post('extract')
  async extractParamsFromPrompt(@Body('prompt') prompt: string): Promise<string> {
    return this.imagesService.extractParamsFromPrompt(prompt);
  }

  // Find and return all images
  // GET /images/all
  @Get('all')
  async findAll(): Promise<Image[]> {
    return this.imagesService.findAll();
  }

  // Find and return all images
  // GET /images/allow
  @Get('allow')
  async findAllowedAll(): Promise<Image[]> {
    return this.imagesService.findAllowedAll();
  }

  // Find and return a images by id
  // GET /images/:id
  @Get(':id')
  async findById(@Param('id') id: number): Promise<Image> {
    return this.imagesService.findOne(id);
  }

  // Delete a images by id
  // DELETE /images/delete/:id
  @Delete('delete/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id') id: string): Promise<void> {
    return this.imagesService.remove(id);
  }
}
